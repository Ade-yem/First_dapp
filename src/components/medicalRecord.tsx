import React, { useState } from "react";
import { MedicalRecord } from "../types/healthchain_types";
import { createRecord, updateRecord } from "../dapp/api";

type Props = { who: "doctor" | "hospital" }
const MedicalRecordForm: React.FC<Props> = ({who}) => {
  const [formData, setFormData] = useState<Partial<MedicalRecord>>({
    patientName: "",
    diagnosis: "",
    medications: [],
    doctor: "",
    date: "",
    walletAddress: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleMedicationChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const medications = prevData.medications ? [...prevData.medications] : [];
      medications[index] = {
        ...medications[index],
        [name]: value,
      };
      return {
        ...prevData,
        medications,
      };
    });
  };

  const handleAddMedication = () => {
    setFormData((prevData) => ({
      ...prevData,
      medications: prevData.medications ? [...prevData.medications, { name: "", dosage: "" }] : [{ name: "", dosage: "" }],
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission
    if (formData.walletAddress || formData.diagnosis) {
      try {
        if (who === "doctor" && formData.walletAddress) {
          const response = await updateRecord(formData.walletAddress, formData)
          console.log(response)
        } else if (who === "hospital" && formData.walletAddress)  {
          const response = await createRecord(formData.walletAddress, formData)
          console.log(response)
        }
      } catch (e: any) {
        console.error(e)
      }
    }  
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
      <input
        type="text"
        name="patientName"
        placeholder="Name of patient"
        className="input input-bordered input-primary w-full max-w-xs"
        value={formData.patientName}
        onChange={handleInputChange}
      />
      <input
        type="text"
        required
        name="walletAddress"
        placeholder="Wallet address of patient"
        className="input input-bordered input-primary w-full max-w-xs"
        value={formData.walletAddress}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="diagnosis"
        placeholder="Diagnosis"
        className="input input-bordered input-primary w-full max-w-xs"
        value={formData.diagnosis}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="doctor"
        placeholder="Doctor"
        className="input input-bordered input-primary w-full max-w-xs"
        value={formData.doctor}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="date"
        placeholder="Date"
        className="input input-bordered input-primary w-full max-w-xs"
        value={formData.date}
        onChange={handleInputChange}
      />
      {formData.medications?.map((medication, index) => (
        <div key={index} className="flex gap-2">
          <input
            type="text"
            name="name"
            placeholder="Medication name"
            className="input input-bordered input-primary w-full max-w-xs"
            value={medication.name}
            onChange={(e) => handleMedicationChange(index, e)}
          />
          <input
            type="text"
            name="dosage"
            placeholder="Dosage"
            className="input input-bordered input-primary w-full max-w-xs"
            value={medication.dosage}
            onChange={(e) => handleMedicationChange(index, e)}
          />
        </div>
      ))}
      <button type="button" onClick={handleAddMedication} className="btn btn-primary">
        Add Medication
      </button>
      <button type="submit" className="btn btn-success">
        {who === "doctor" ? "Update Record": "Create Record"}
      </button>
    </form>
  );
};

export default MedicalRecordForm;
