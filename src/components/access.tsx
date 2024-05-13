import { useState } from "react";
import { Doctor, Hospital, Patient } from "../types/healthchain_types";
import useContract from "../dapp/contract";
import toast from "react-hot-toast";
import { Contract } from "ethers";
import { decodePatientData } from "../dapp/encoder";

// Sample data
export const sampleDoctor = {
  id: "1",
  name: "Dr. John Doe",
  walletAddress: "0xDed3186b703c0AcADDB42B44f14D83C7Ee092Aa1",
  specialization: "Cardiology",
  hospitalAffiliation: "ABC Hospital",
  whitelisted: false,
};

export const sampleHospital: Hospital = {
  id: "1",
  name: "ABC Hospital",
  walletAddress: "0xDed3186b703c0AcADDB42B44f14D83C7Ee092Aa1",
  whitelisted: true,
  whitelist: []
};

export const samplePatient: Patient = {
  id: "1",
  name: "Jane Smith",
  walletAddress: "0x789...",
  whitelist: []
};

export const DoctorCard = ({ doc, who }: { doc: any; who: "hospital" | "patient" }) => {
  const contract = useContract() as Contract
  const [doctor, setDoctor] = useState<any>(doc)
  async function handleWhiteList(value: boolean): Promise<void> {
    try {
    if (value) {
      if (who === "patient") {
        toast.loading("Granting doctor access", {id: "who"})
        const res = await contract.grantDoctorAccess(doctor.address)
        console.log(res)
        toast.success("Granted doctor access", {id: "who"})
      } else {
        toast.loading("Adding doctor to hospital", {id: "who"})
        const res = await contract.addDoctorTohospital(doctor.address)
        console.log(res)
        toast.success("Doctor added to hospital", {id: "who"})
      }
    } else {
      if (who === "patient") {
        toast.loading("Revoking doctor access", {id: "who"})
        const res = await contract.revokeDoctorAccess(doctor.address)
        console.log(res)
        toast.success("Revoked doctor access")
      } else {
        toast.loading("Removing doctor from hospital", {id: "who"})
        const res = await contract.removeDoctorFromhospital(doctor.address)
        console.log(res)
        toast.success("Doctor removed from hospital", {id: "who"})
      }
    }
  } catch (error) {
    toast.error(error.reason ? error.reason : "Connection error", {id: "who"})
    console.error("Error: " + error.reason)
  }
  }
  return (
    <div className="card mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">

      {doctor && <div className="md:flex">
        <div className="md:flex-shrink-0">
        <div className="avatar placeholder">
          <div className="shadow-md text-neutral-content rounded-md w-24">
            <span className="text-3xl">D</span>
            {/* <span className="text-3xl">{doctor.name.charAt(0).toUpperCase()}</span> */}
          </div>
        </div>
        </div>
        <div className="p-8">
          {/* <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{doctor.specialization}</div> */}
          <p className="block mt-1 text-lg leading-tight font-medium text-black">{doctor.address}</p>
          {/* <p className="mt-2 text-gray-500">{doctor.hospitalAffiliation}</p> */}
          <div className="mt-4 card-actions">
            <button onClick={() => handleWhiteList(false) } className="btn btn-secondary">{who === "patient"?"Revoke Access": "Remove Doctor"}</button>
            <button onClick={() => handleWhiteList(true)} className="btn btn-success">{who === "patient"?"Grant Access": "Add Doctor"}</button>
          </div>
        </div>
      </div>}
    </div>
  );
};

export const PatientCard = ({ patient, setRecord }: { patient: any; setRecord: any }) => {
  const contract = useContract()

  async function viewRecords(): Promise<void> {
    try {
      if (contract === null) return;
      toast.loading("Getting patient records", {id: "doctor"})
      const recordHash = await contract.getPatientRecord(patient.address)
      const record = decodePatientData(recordHash)
      console.log(record);      
      setRecord(record)
      toast.success("Successful", {id: "doctor"})
    } catch (error) {
      toast.error(error.reason ? error.reason : "Connection error", {id: "doctor"})
      console.error(error)
    }
  }

  return (
    <div className="card bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
        <div className="avatar placeholder">
          <div className="shadow-md text-neutral-content rounded-md w-24">
            <span className="text-3xl">P</span>
            {/* <span className="text-3xl">{patient.name.charAt(0).toUpperCase()}</span> */}
          </div>
        </div>
        </div>
        <div className="p-8">
          <p className="block mt-1 text-lg leading-tight font-medium text-black">{patient.address}</p>
        </div>
      </div>
      <div className="mt-4">
        <div>
          <button onClick={viewRecords} className="btn btn-info">View records</button>
        </div>
      </div>
    </div>
  );
};

// export const HospitalCard = ({ hosp }: { hosp: Hospital}) => {
//   const [hospital, setHospital] = useState<Hospital | null>(hosp)
//   const contract = useContract()
//   async function handleWhiteList(value: boolean) {
//     if (contract === null) return;
//     try {
//       if (hosp.whitelisted === false || value === true) {
//       const response = await contract.addHospitalToWhitelist(hosp.walletAddress)
//       console.log(response)
//       } else {
//         const response = await contract.removeHospitalFromWhitelist(hosp.walletAddress)
//         console.log(response)
//       }
//       setHospital((prev: Hospital | null) => {
//         if (!prev) return null; // Handle the case where prev is null
//         return { ...prev, whitelisted: value };
//         });
//     } catch (error) {
      
//     }
    
//   }
//   return (
//     <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
//       {hospital &&<div className="md:flex">
//         <div className="md:flex-shrink-0">
//         <div className="avatar placeholder">
//           <div className="shadow-md text-neutral-content rounded-md w-24">
//             <span className="text-3xl">{hospital.name.charAt(0).toUpperCase()}</span>
//           </div>
//         </div>
//         </div>
//         <div className="p-8">
//           <h2 className="block mt-1 text-lg leading-tight font-medium text-black">{hospital.name}</h2>
//           <div className="mt-4">
//             {hospital.whitelisted ? (
//               <button onClick={() => handleWhiteList(false)} className="btn btn-primary">Revoke Access</button>
//             ) : (
//               <button onClick={() => handleWhiteList(true)} className="btn btn-primary">Whitelist</button>
//             )}
//           </div>
//         </div>
//       </div>}
//     </div>
//   );
// };
