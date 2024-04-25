import React, { useState, useContext, useEffect } from "react";
import { DonationContext, actionTypes } from "../../context/DonationContext";

const AddDonation = () => {
  const { state, dispatch } = useContext(DonationContext);
  const { donationData } = state;
  const [newDonation, setNewDonation] = useState({
    id: "",
    DonorName: "",
    DonorType: "",
    RecipientName: "",
    DonationPurpose: "",
    DonationDate: "",
    BarcodeData: [],
    MedicationDetails: [],
  });
  const [error, setError] = useState("");
  const [donorOptions, setDonorOptions] = useState([]);
  const [recipientOptions, setRecipientOptions] = useState([]);
  const [donorTypesOptions, setDonorTypesOptions] = useState([]);

  useEffect(() => {
    const fetchDonorAndRecipientData = async () => {
      try {
        const donors = [
          ...new Set(donationData.map((donation) => donation.DonorName)),
        ];
        const recipients = [
          ...new Set(donationData.map((donation) => donation.RecipientName)),
        ];
        const donorTypes = [
          ...new Set(donationData.map((donation) => donation.DonorType)),
        ];
        setDonorOptions(donors);
        setRecipientOptions(recipients);
        setDonorTypesOptions(donorTypes);
      } catch (error) {
        setError("Failed to fetch donor and recipient data.");
      }
    };

    fetchDonorAndRecipientData();
  }, [donationData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewDonation({
      ...newDonation,
      [name]: value,
    });
  };

  const validateInputs = () => {
    if (
      !newDonation.DonorName ||
      !newDonation.DonorType ||
      !newDonation.RecipientName ||
      !newDonation.DonationPurpose ||
      !newDonation.DonationDate
    ) {
      setError("All fields are required.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateInputs()) {
      dispatch({ type: actionTypes.ADD_DONATION, payload: newDonation });
      setNewDonation({
        id: "",
        DonorName: "",
        DonorType: "",
        RecipientName: "",
        DonationPurpose: "",
        DonationDate: "",
        BarcodeData: [],
        MedicationDetails: [],
      });
    }
  };

  return (
    <div className="form-container">
      <h1 className="mb-6">Add New Donation</h1>

      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <select
            name="DonorName"
            value={newDonation.DonorName}
            onChange={handleChange}
          >
            <option value="">Select Donor</option>
            {donorOptions.map((donor, index) => (
              <option key={index} value={donor}>
                {donor}
              </option>
            ))}
          </select>
        </div>
        <div className="input-container">
          <select
            name="DonorType"
            value={newDonation.DonorType}
            onChange={handleChange}
          >
            <option value="">Select type</option>
            {donorTypesOptions.map((donorTypes, index) => (
              <option key={index} value={donorTypes}>
                {donorTypes}
              </option>
            ))}
          </select>
        </div>

        <div className="input-container">
          <select
            name="RecipientName"
            value={newDonation.RecipientName}
            onChange={handleChange}
          >
            <option value="">Select Recipient</option>
            {recipientOptions.map((recipient, index) => (
              <option key={index} value={recipient}>
                {recipient}
              </option>
            ))}
          </select>
        </div>
        <div className="input-container">
          <input
            type="text"
            name="DonationPurpose"
            placeholder="Donation Purpose"
            value={newDonation.DonationPurpose}
            onChange={handleChange}
          />
        </div>
        <div className="input-container">
          <input
            type="date"
            name="DonationDate"
            placeholder="Donation Date"
            value={newDonation.DonationDate}
            onChange={handleChange}
          />
        </div>
        <button className="btn-sec" type="submit">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddDonation;
