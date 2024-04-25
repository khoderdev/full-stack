import React, { createContext, useReducer, useEffect } from "react";
import axios from "axios";

const initialState = {
  donationData: [],
  error: null,
};

export const DonationContext = createContext(initialState);

export const actionTypes = {
  ADD_DONATION: "ADD_DONATION",
  DELETE_DONATION: "DELETE_DONATION",
  UPDATE_DONATION: "UPDATE_DONATION",
  SET_ERROR: "SET_ERROR",
  CLEAR_ERROR: "CLEAR_ERROR",
  SET_DONATION_DATA: "SET_DONATION_DATA",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.ADD_DONATION:
      return {
        ...state,
        donationData: [...state.donationData, action.payload],
        error: null, // Clear error after successful operation
      };
    case actionTypes.DELETE_DONATION:
      return {
        ...state,
        donationData: state.donationData.filter(
          (donation) => donation.id !== action.payload
        ),
        error: null, // Clear error after successful operation
      };
    case actionTypes.UPDATE_DONATION:
      return {
        ...state,
        donationData: state.donationData.map((donation) =>
          donation.id === action.payload.id ? action.payload : donation
        ),
        error: null, // Clear error after successful operation
      };
    case actionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case actionTypes.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    case actionTypes.SET_DONATION_DATA:
      return {
        ...state,
        donationData: action.payload,
        error: null, // Clear error after successful operation
      };
    default:
      return state;
  }
};

export const DonationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchDonationData = async () => {
      try {
        const donationsResponse = await axios.get(
          "http://localhost:5000/donations/all"
        );
        dispatch({
          type: actionTypes.SET_DONATION_DATA,
          payload: donationsResponse.data,
        });
      } catch (error) {
        handleApiError(error); // Handle API errors gracefully
      }
    };

    fetchDonationData();
  }, []);

  const handleApiError = (error) => {
    let errorMessage = "An error occurred";
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      errorMessage = `HTTP Error: ${error.response.status} - ${error.response.statusText}`;
    } else if (error.request) {
      // The request was made but no response was received
      errorMessage = "No response from server";
    } else {
      // Something happened in setting up the request that triggered an error
      errorMessage = `Request Error: ${error.message}`;
    }
    dispatch({ type: actionTypes.SET_ERROR, payload: errorMessage });
  };

  const addDonation = async (newDonation) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/donations/add",
        newDonation
      );
      dispatch({ type: actionTypes.ADD_DONATION, payload: response.data });
    } catch (error) {
      handleApiError(error);
    }
  };

  const deleteDonation = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/donations/${id}`);
      dispatch({ type: actionTypes.DELETE_DONATION, payload: id });
    } catch (error) {
      handleApiError(error);
    }
  };

  const updateDonation = async (updatedDonation) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/donations/${updatedDonation.id}`,
        updatedDonation
      );
      dispatch({
        type: actionTypes.UPDATE_DONATION,
        payload: response.data,
      });
    } catch (error) {
      handleApiError(error);
    }
  };

  return (
    <DonationContext.Provider
    value={{ state, dispatch, addDonation, deleteDonation, updateDonation }}
    >
      {children}
    </DonationContext.Provider>
  );
};

export const setError = (dispatch, errorMessage) => {
  dispatch({ type: actionTypes.SET_ERROR, payload: errorMessage });
};

export const clearError = (dispatch) => {
  dispatch({ type: actionTypes.CLEAR_ERROR });
};
