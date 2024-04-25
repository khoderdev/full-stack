import React, { useContext, useState } from "react";
import { DonationContext, actionTypes } from "../../context/DonationContext";

const DonationList = () => {
  const { state, dispatch, updateDonation } = useContext(DonationContext);
  const [editMode, setEditMode] = useState(false);
  const [editableDonation, setEditableDonation] = useState(null);

  const handleDelete = (id) => {
    dispatch({ type: actionTypes.DELETE_DONATION, payload: id });
  };

  const handleUpdate = () => {
    updateDonation(editableDonation);
    setEditMode(false);
    setEditableDonation(null);
  };

  const handleEdit = (donation) => {
    setEditMode(true);
    setEditableDonation(donation);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableDonation({
      ...editableDonation,
      [name]: value,
    });
  };

  return (
    <div className="donation-list-container">
      <h2 className="donation-list-title">Donation List</h2>
      <div className="donation-cards-container">
        {state.donationData.map((donation) => (
          <div className="donation-card" key={donation.id}>
            <div>
              {editMode &&
              editableDonation &&
              editableDonation.id === donation.id ? (
                <div>
                  <div className="input-container">
                    <input
                      type="text"
                      name="DonorName"
                      value={editableDonation.DonorName}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="input-container">
                    <input
                      type="text"
                      name="DonorType"
                      value={editableDonation.DonorType}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="input-container">
                    <input
                      type="text"
                      name="RecipientName"
                      value={editableDonation.RecipientName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="input-container">
                    <input
                      type="text"
                      name="DonationPurpose"
                      value={editableDonation.DonationPurpose}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="input-container">
                    <input
                      type="text"
                      name="DonationDate"
                      value={editableDonation.DonationDate}
                      onChange={handleChange}
                    />
                  </div>
                  {/* Render Barcode Data inputs */}
                  {editableDonation.BarcodeData.map((barcode, index) => (
                    <div key={index}>
                      <div className="input-container">
                        <input
                          type="text"
                          name={`BarcodeData[${index}].GTIN`}
                          value={barcode.GTIN}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="input-container">
                        <input
                          type="text"
                          name={`BarcodeData[${index}].LOT`}
                          value={barcode.LOT}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="input-container">
                        <input
                          type="text"
                          name={`BarcodeData[${index}].ExpiryDate`}
                          value={barcode.ExpiryDate}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  ))}
                  {/* Render Medication Details inputs */}
                  {editableDonation.MedicationDetails.map(
                    (medication, index) => (
                      <div key={index}>
                        <div className="input-container">
                          <input
                            type="text"
                            name={`MedicationDetails[${index}].DrugName`}
                            value={medication.DrugName}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="input-container">
                          <input
                            type="text"
                            name={`MedicationDetails[${index}].Presentation`}
                            value={medication.Presentation}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="input-container">
                          <input
                            type="text"
                            name={`MedicationDetails[${index}].Form`}
                            value={medication.Form}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    )
                  )}
                  <div className="buttons-container">
                    <button className="save-button" onClick={handleUpdate}>
                      Save
                    </button>
                    <button
                      className="cancel-button"
                      onClick={() => setEditableDonation(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <p>
                    <strong>Donor Name:</strong> {donation.DonorName}
                  </p>
                  <p>
                    <strong>Donor Type:</strong> {donation.DonorType}
                  </p>
                  <p>
                    <strong>Recipient Name:</strong> {donation.RecipientName}
                  </p>
                  <p>
                    <strong>Donation Purpose:</strong>{" "}
                    {donation.DonationPurpose}
                  </p>
                  <p>
                    <strong>Donation Date:</strong> {donation.DonationDate}
                  </p>
                  <p>
                    <strong>Barcode Data:</strong>
                  </p>
                  {/* Display Barcode Data */}
                  {donation.BarcodeData.map((barcode, index) => (
                    <p key={index}>
                      GTIN: {barcode.GTIN}, LOT: {barcode.LOT}, Expiry Date:{" "}
                      {barcode.ExpiryDate}
                    </p>
                  ))}
                  <p>
                    <strong>Medication Details:</strong>
                  </p>
                  {/* Display Medication Details */}
                  {donation.MedicationDetails.map((medication, index) => (
                    <p key={index}>
                      Drug Name: {medication.DrugName}, Presentation:{" "}
                      {medication.Presentation}, Form: {medication.Form}
                    </p>
                  ))}
                </div>
              )}
            </div>
            <div className="buttons-container">
              <button onClick={() => handleEdit(donation)}>Edit</button>
              <button onClick={() => handleDelete(donation.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonationList;
