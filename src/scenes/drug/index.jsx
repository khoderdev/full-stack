import React, { useState, useContext } from "react";
import { DrugContext, addDrug, updateDrug } from "../../context/DrugContext";

const DrugForm = ({ drug }) => {
  const { state, addDrug, updateDrug } = useContext(DrugContext);
  const [formData, setFormData] = useState(drug || {});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (drug) {
        await updateDrug(formData);
      } else {
        await addDrug(formData);
      }
      setFormData({});
    } catch (error) {
      console.error("Error:", error);
      // Handle error gracefully, maybe display a message to the user
    }
  };

  return (
    <>
      <h1 className="mb-6">Add New Drug</h1>
      <div className="grid grid-cols-3 gap-4">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <div className="input-container">
              <input
                type="text"
                name="DrugName"
                value={formData.DrugName || ""}
                onChange={handleChange}
                placeholder="Drug Name"
              />
            </div>

            <div className="input-container">
              <input
                type="text"
                name="Manufacturer"
                value={formData.Manufacturer || ""}
                onChange={handleChange}
                placeholder="Manufacturer"
              />
            </div>

            <div className="input-container">
              <input
                type="text"
                name="RegistrationNumber"
                value={formData.RegistrationNumber || ""}
                onChange={handleChange}
                placeholder="Registration Number"
              />
            </div>

            <div className="input-container">
              <input
                type="text"
                name="GTIN"
                value={formData.GTIN || ""}
                onChange={handleChange}
                placeholder="GTIN"
              />
            </div>

            <textarea
              name="Notes"
              value={formData.Notes || ""}
              onChange={handleChange}
              placeholder="Notes"
            />
            <div className="input-container">
              <input
                type="text"
                name="Description"
                value={formData.Description || ""}
                onChange={handleChange}
                placeholder="Description"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <div className="input-container">
              <input
                type="text"
                name="IngredientAndStrength"
                value={formData.IngredientAndStrength || ""}
                onChange={handleChange}
                placeholder="Ingredient And Strength"
              />
            </div>

            <div className="input-container">
              <input
                type="text"
                name="Indication"
                value={formData.Indication || ""}
                onChange={handleChange}
                placeholder="Indication"
              />
            </div>

            <div className="input-container">
              <input
                type="text"
                name="Posology"
                value={formData.Posology || ""}
                onChange={handleChange}
                placeholder="Posology"
              />
            </div>

            <div className="input-container">
              <input
                type="text"
                name="MethodOfAdministration"
                value={formData.MethodOfAdministration || ""}
                onChange={handleChange}
                placeholder="Method Of Administration"
              />
            </div>

            <div className="input-container">
              <input
                type="text"
                name="Contraindications"
                value={formData.Contraindications || ""}
                onChange={handleChange}
                placeholder="Contraindications"
              />
            </div>

            <div className="input-container">
              <input
                type="text"
                name="PrecautionForUse"
                value={formData.PrecautionForUse || ""}
                onChange={handleChange}
                placeholder="Precaution For Use"
              />
            </div>

            <div className="input-container">
              <input
                type="text"
                name="EffectOnFGN"
                value={formData.EffectOnFGN || ""}
                onChange={handleChange}
                placeholder="Effect On FGN"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <div className="input-container">
              <input
                type="text"
                name="SideEffect"
                value={formData.SideEffect || ""}
                onChange={handleChange}
                placeholder="Side Effect"
              />
            </div>

            <div className="input-container">
              <input
                type="text"
                name="Toxicity"
                value={formData.Toxicity || ""}
                onChange={handleChange}
                placeholder="Toxicity"
              />
            </div>

            <div className="input-container">
              <input
                type="text"
                name="StorageCondition"
                value={formData.StorageCondition || ""}
                onChange={handleChange}
                placeholder="Storage Condition"
              />
            </div>

            <div className="input-container">
              <input
                type="text"
                name="ShelfLife"
                value={formData.ShelfLife || ""}
                onChange={handleChange}
                placeholder="Shelf Life"
              />
            </div>

            <div className="input-container">
              <input
                type="text"
                name="IngredientLabel"
                value={formData.IngredientLabel || ""}
                onChange={handleChange}
                placeholder="Ingredient Label"
              />
            </div>

            <div className="input-container">
              <input
                type="number"
                name="Price"
                value={formData.Price || ""}
                onChange={handleChange}
                placeholder="Price"
              />
            </div>

            <div className="input-container">
              <input
                type="number"
                name="PriceForeign"
                value={formData.PriceForeign || ""}
                onChange={handleChange}
                placeholder="Price Foreign"
              />
            </div>

            <div className="input-container">
              <input
                type="text"
                name="CurrencyForeign"
                value={formData.CurrencyForeign || ""}
                onChange={handleChange}
                placeholder="Currency Foreign"
              />
            </div>

            <textarea
              name="ImagesPath"
              value={formData.ImagesPath || ""}
              onChange={handleChange}
              placeholder="Images Path"
            />
            <div className="input-container">
              <input
                type="checkbox"
                name="ImageDefault"
                checked={formData.ImageDefault || false}
                onChange={handleChange}
              />
              <div className="input-container"></div>

              <input
                type="text"
                name="InteractionIngredientName"
                value={formData.InteractionIngredientName || ""}
                onChange={handleChange}
                placeholder="Interaction Ingredient Name"
              />
            </div>

            <div className="input-container">
              <input
                type="checkbox"
                name="IsDouanes"
                checked={formData.IsDouanes || false}
                onChange={handleChange}
              />
            </div>
          </div>

          <button className="btn-sec" type="submit">
            {drug ? "Update" : "Add"} Drug
          </button>
        </form>
      </div>
    </>
  );
};

export default DrugForm;
