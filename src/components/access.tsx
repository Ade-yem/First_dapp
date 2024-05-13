import { useState } from "react";
import useContract from "../dapp/contract";
import toast from "react-hot-toast";
import { Contract } from "ethers";
import { decodePatientData } from "../dapp/encoder";

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
    <div className="card bg-white rounded-xl shadow-md overflow-hidden">

      {doctor && <div className="mx-5">
        <div className="flex-shrink-0">
        <div className="avatar placeholder mt-2">
          <div className="shadow-md text-neutral-content rounded-md w-24">
            <span className="text-3xl">D</span>
            {/* <span className="text-3xl">{doctor.name.charAt(0).toUpperCase()}</span> */}
          </div>
        </div>
        </div>
        <div className="p-8">
          {/* <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{doctor.specialization}</div> */}
          <p className="block mt-1 text-sm leading-tight font-medium text-black">{doctor.address}</p>
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
      setRecord([record])
      toast.success("Successful", {id: "doctor"})
    } catch (error) {
      toast.error(error.reason ? error.reason : "Connection error", {id: "doctor"})
      console.error(error)
    }
  }

  return (
    <div className="card bg-white rounded-xl shadow-md overflow-hidden">
      <div className="mx-5">
        <div className="flex-shrink-0">
        <div className="avatar placeholder mt-2">
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
      <div className="m-4 flex justify-center">
        <button onClick={viewRecords} className="btn btn-info">View records</button>
      </div>
    </div>
  );
};

// components/SearchForm.tsx

export const SearchForm = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('doctor'); // Default to "doctor"
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const contract = useContract() as Contract

  const handleSearch = async () => {
    try {
      let res: boolean;
      setLoading(true)
      if (searchType === "doctor") {
        res = await contract.verifyDoctor(searchTerm)
        if (res) setResult(`${searchTerm} is a ${searchType}`)
        else setResult(`${searchTerm} is not a ${searchType}`)
      } else {
        res = contract.verifyHospital(searchTerm)
        if (res) setResult(`${searchTerm} is a ${searchType}`)
          else setResult(`${searchTerm} is not a ${searchType}`)
      }
      if (res) setResult(`${searchTerm} is a ${searchType}`)
      else setResult(`${searchTerm} is not a ${searchType}`)
      setLoading(false)
    } catch (error) {
      setResult(error.reason)
      console.error(error.reason)
    }  
  };

  return (
    <div className="p-4 z-50 text-white">
      <div className="h-14 flex justify-center items-center text-sm text-wrap">{result}</div>
      <input
        type="text"
        placeholder="Search..."
        className="w-full p-2 border rounded-md text-black outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="mt-2 pb-4 flex justify-center space-x-3">
        <label>
          <input
            className="mr-2"
            type="radio"
            value="doctor"
            checked={searchType === 'doctor'}
            onChange={() => setSearchType('doctor')}
          />
          Doctor
        </label>
        <label>
          <input
            className="mr-2"
            type="radio"
            value="hospital"
            checked={searchType === 'hospital'}
            onChange={() => setSearchType('hospital')}
          />
          Hospital
        </label>
      </div>
      <button
        className="btn btn-success mt-6 w-full"
        style={{ minWidth: '250px' }}
        onClick={handleSearch}
      >
        { loading ? <span className="loading loading-dots text-neutral-content loading-lg"></span> : "Search"}
      </button>
      
    </div>
  );
};

export default SearchForm;

