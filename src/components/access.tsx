import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { useState } from "react";

// Types
export type Doctor = {
  id: string;
  name: string;
  walletAddress: string;
  image: string;
  specialization: string;
  hospitalAffiliation: string;
  whitelisted: boolean;
};

export type Hospital = {
  id: string;
  name: string;
  image: string;
  walletAddress: string;
  whitelisted: boolean;
  whitelist: string[];
};

export type Patient = {
  id: string;
  name: string;
  walletAddress: string;
  image: string;
  whitelist: string[];
};

// Sample data
export const sampleDoctor: Doctor = {
  id: "1",
  name: "Dr. John Doe",
  walletAddress: "0x123...",
  image: "doctor.jpg",
  specialization: "Cardiology",
  hospitalAffiliation: "ABC Hospital",
  whitelisted: false,
};

export const sampleHospital: Hospital = {
  id: "1",
  name: "ABC Hospital",
  image: "hospital_logo.jpg",
  walletAddress: "0x456...",
  whitelisted: true,
  whitelist: []
};

export const samplePatient: Patient = {
  id: "1",
  name: "Jane Smith",
  walletAddress: "0x789...",
  image: "patient.jpg",
  whitelist: []
};

export const DoctorCard = ({ doc }: { doc: Doctor }) => {
  const [doctor, setDoctor] = useState<Doctor | null>(doc)
  function handleWhiteList(value: boolean): void {
    setDoctor((prev: Doctor | null) => {
      if (!prev) return null; // Handle the case where prev is null
      return { ...prev, whitelisted: value };
      });
  }
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">

      {doctor && <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img className="h-48 w-full object-cover md:w-48" src={doctor.image} alt="Doctor" />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{doctor.specialization}</div>
          <h2 className="block mt-1 text-lg leading-tight font-medium text-black">{doctor.name}</h2>
          <p className="mt-2 text-gray-500">{doctor.hospitalAffiliation}</p>
          <div className="mt-4">
            {doctor.whitelisted ? (
              <button onClick={() => handleWhiteList(false) } className="btn btn-primary">Revoke Access</button>
            ) : (
              <button onClick={() => handleWhiteList(true)} className="btn btn-primary">Whitelist</button>
            )}
          </div>
        </div>
      </div>}
    </div>
  );
};

export const HospitalCard = ({ hosp }: { hosp: Hospital}) => {
  const [hospital, setDoctor] = useState<Hospital | null>(hosp)
  function handleWhiteList(value: boolean): void {
    setDoctor((prev: Hospital | null) => {
      if (!prev) return null; // Handle the case where prev is null
      return { ...prev, whitelisted: value };
      });
  }
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      {hospital &&<div className="md:flex">
        <div className="md:flex-shrink-0">
          <img className="h-48 w-full object-cover md:w-48" src={hospital.image} alt="Hospital" />
        </div>
        <div className="p-8">
          <h2 className="block mt-1 text-lg leading-tight font-medium text-black">{hospital.name}</h2>
          <div className="mt-4">
            {hospital.whitelisted ? (
              <button onClick={() => handleWhiteList(false)} className="btn btn-primary">Revoke Access</button>
            ) : (
              <button onClick={() => handleWhiteList(true)} className="btn btn-primary">Whitelist</button>
            )}
          </div>
        </div>
      </div>}
    </div>
  );
};

export const PatientCard = ({ patient, setRecord }: { patient: Patient; setRecord: any }) => {
  const context = useWeb3React<Web3Provider>();
  const address = context.account as string;
  const requestAccess = () => {
    patient.whitelist.push(address);
  };

  function viewRecords(): void {
    setRecord(patient)
  }

  function updateRecords(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img className="h-48 w-full object-cover md:w-48" src={patient.image} alt="Patient" />
        </div>
        <div className="p-8">
          <h2 className="block mt-1 text-lg leading-tight font-medium text-black">{patient.name}</h2>
        </div>
      </div>
      <div className="mt-4">
            {!patient.whitelist.includes(address) ? (
              <button onClick={requestAccess} className="btn btn-primary">Request Access</button>
            ) : (
              <div>
                <button onClick={viewRecords} className="btn btn-primary">View records</button>
                <button onClick={updateRecords} className="btn btn-primary">Update records</button>
              </div>
            )}
          </div>
    </div>
  );
};
