import React, { createContext, useReducer, useEffect } from "react";
import axios from "axios";

const initialState = {
  drugData: [],
  error: null,
};

export const DrugContext = createContext(initialState);

export const actionTypes = {
  ADD_DRUG: "ADD_DRUG",
  DELETE_DRUG: "DELETE_DRUG",
  UPDATE_DRUG: "UPDATE_DRUG",
  SET_ERROR: "SET_ERROR",
  CLEAR_ERROR: "CLEAR_ERROR",
  SET_DRUG_DATA: "SET_DRUG_DATA",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.ADD_DRUG:
      return {
        ...state,
        drugData: [...state.drugData, action.payload],
        error: null,
      };
    case actionTypes.DELETE_DRUG:
      return {
        ...state,
        drugData: state.drugData.filter(
          (drug) => drug.DrugId !== action.payload
        ),
        error: null,
      };
    case actionTypes.UPDATE_DRUG:
      return {
        ...state,
        drugData: state.drugData.map((drug) =>
          drug.DrugId === action.payload.DrugId ? action.payload : drug
        ),
        error: null,
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
    case actionTypes.SET_DRUG_DATA:
      return {
        ...state,
        drugData: action.payload,
        error: null,
      };
    default:
      return state;
  }
};

export const DrugProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchDrugData = async () => {
      try {
        const drugsResponse = await axios.get(
          "http://localhost:5000/drugs/all"
        );
        dispatch({
          type: actionTypes.SET_DRUG_DATA,
          payload: drugsResponse.data,
        });
      } catch (error) {
        handleApiError(error);
      }
    };

    fetchDrugData();
  }, []);

  const handleApiError = (error) => {
    let errorMessage = "An error occurred";
    if (error.response) {
      errorMessage = `HTTP Error: ${error.response.status} - ${error.response.statusText}`;
    } else if (error.request) {
      errorMessage = "No response from server";
    } else {
      errorMessage = `Request Error: ${error.message}`;
    }
    dispatch({ type: actionTypes.SET_ERROR, payload: errorMessage });
  };

  const addDrug = async (newDrug) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/drugs/add",
        newDrug
      );
      dispatch({ type: actionTypes.ADD_DRUG, payload: response.data });
    } catch (error) {
      handleApiError(error);
    }
  };

  const deleteDrug = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/drugs/${id}`);
      dispatch({ type: actionTypes.DELETE_DRUG, payload: id });
    } catch (error) {
      handleApiError(error);
    }
  };

  const updateDrug = async (updatedDrug) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/drugs/${updatedDrug.DrugId}`,
        updatedDrug
      );
      dispatch({ type: actionTypes.UPDATE_DRUG, payload: response.data });
    } catch (error) {
      handleApiError(error);
    }
  };

  return (
    <DrugContext.Provider value={{ state, addDrug, deleteDrug, updateDrug }}>
      {children}
    </DrugContext.Provider>
  );
};

export const setError = (dispatch, errorMessage) => {
  dispatch({ type: actionTypes.SET_ERROR, payload: errorMessage });
};

export const clearError = (dispatch) => {
  dispatch({ type: actionTypes.CLEAR_ERROR });
};
