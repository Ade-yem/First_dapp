import React, { useState } from "react";
import { MedicalRecord } from "../types/healthchain_types";
import useContract from "../dapp/contract";
import { Contract } from "ethers";
import {v4 as uuidv4} from "uuid"
import { encodePatientData } from "../dapp/encoder";
import toast from "react-hot-toast";

type Props = { who: "doctor" | "hospital" }
const MedicalRecordForm: React.FC<Props> = ({who}) => {
  const contract = useContract() as Contract
  const init = {
    id: "",
    name: "",
    diagnosis: "",
    medications: [],
    doctor: "",
    date: "",
    walletAddress: ""
  }
  const [formData, setFormData] = useState<MedicalRecord>(init);

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
      const id = uuidv4()
      formData.id = id;
      const dataHash = encodePatientData(formData)
      try {
        if (who === "doctor" && formData.walletAddress) {
          toast.loading("Updating patient record", {id: "who"})
          const response = await contract.updatePatientRecord(formData.walletAddress, dataHash)
          toast.success("Patient record updated", {id: "who"})
          setFormData(init)
          console.log(response)
        } else if (who === "hospital" && formData.walletAddress)  {
          toast.loading("Creating patient record", {id: "who"})
          const response = await contract.createRecord(formData.walletAddress, dataHash)
          console.log(response)
          toast.success("Patient record created", {id: "who"})
        }
      } catch (e: any) {
        toast.error(e.reason, {id: "who"})
        console.error(e.reason)
      }
    }  
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
      <input
        type="text"
        name="name"
        placeholder="Name of patient"
        className="input input-bordered input-primary w-full max-w-xs"
        value={formData.name}
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
