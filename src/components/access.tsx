import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { useState } from "react";
import { Doctor, Hospital, Patient } from "../types/healthchain_types";
import { addDoctorToHospital, addHospitalToWhitelist, getRecord, removeHospitalFromWhitelist } from "../dapp/api";

// Sample data
export const sampleDoctor = {
  id: "1",
  name: "Dr. John Doe",
  walletAddress: "0x123...",
  specialization: "Cardiology",
  hospitalAffiliation: "ABC Hospital",
  whitelisted: false,
};

export const sampleHospital: Hospital = {
  id: "1",
  name: "ABC Hospital",
  walletAddress: "0x456...",
  whitelisted: true,
  whitelist: []
};

export const samplePatient: Patient = {
  id: "1",
  name: "Jane Smith",
  walletAddress: "0x789...",
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
        <div className="avatar placeholder">
          <div className="shadow-md text-neutral-content rounded-md w-24">
            <span className="text-3xl">{doctor.name.charAt(0).toUpperCase()}</span>
          </div>
        </div>
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{doctor.specialization}</div>
          <h2 className="block mt-1 text-lg leading-tight font-medium text-black">{doctor.name}</h2>
          <p className="mt-2 text-gray-500">{doctor.hospitalAffiliation}</p>
          <div className="mt-4">
            {doctor.whitelisted ? (
              <button onClick={() => handleWhiteList(false) } className="btn btn-secondary">Revoke Access</button>
            ) : (
              <button onClick={() => handleWhiteList(true)} className="btn btn-success">Whitelist</button>
            )}
          </div>
        </div>
      </div>}
    </div>
  );
};

export const HospitalCard = ({ hosp }: { hosp: Hospital}) => {
  const [hospital, setHospital] = useState<Hospital | null>(hosp)
  async function handleWhiteList(value: boolean) {
    try {
      if (hosp.whitelisted === false || value === true) {
      const response = await addHospitalToWhitelist(hosp.walletAddress)
      console.log(response)
      } else {
        const response = await removeHospitalFromWhitelist(hosp.walletAddress)
        console.log(response)
      }
      setHospital((prev: Hospital | null) => {
        if (!prev) return null; // Handle the case where prev is null
        return { ...prev, whitelisted: value };
        });
    } catch (error) {
      
    }
    
  }
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      {hospital &&<div className="md:flex">
        <div className="md:flex-shrink-0">
        <div className="avatar placeholder">
          <div className="shadow-md text-neutral-content rounded-md w-24">
            <span className="text-3xl">{hospital.name.charAt(0).toUpperCase()}</span>
          </div>
        </div>
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
    // patient.whitelist.push(address);
  };

  async function viewRecords(): Promise<void> {
    try {
      const record = await getRecord(patient.walletAddress)
      setRecord(record)
    } catch (error) {
      console.error(error)
    }
  }


  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
        <div className="avatar placeholder">
          <div className="shadow-md text-neutral-content rounded-md w-24">
            <span className="text-3xl">{patient.name.charAt(0).toUpperCase()}</span>
          </div>
        </div>
        </div>
        <div className="p-8">
          <h2 className="block mt-1 text-lg leading-tight font-medium text-black">{patient.name}</h2>
        </div>
      </div>
      <div className="mt-4">
            {!patient.whitelist.includes(address) ? (
              <button onClick={requestAccess} className="btn btn-success">Request Access</button>
            ) : (
              <div>
                <button onClick={viewRecords} className="btn btn-info">View records</button>
              </div>
            )}
          </div>
    </div>
  );
};
