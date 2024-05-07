import React, { useState } from "react";
import { MedicalRecord } from "../types/healthchain_types";


const MedicalRecordForm: React.FC = () => {
  const [formData, setFormData] = useState<Partial<MedicalRecord>>({
    id: 0,
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form data:", formData);
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
        Update Record
      </button>
    </form>
  );
};

export default MedicalRecordForm;
