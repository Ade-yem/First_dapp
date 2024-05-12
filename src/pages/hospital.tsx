import { useCallback, useState } from "react";
import { Search } from "../components/Search";
import { Doctor } from "../types/healthchain_types";
import MedicalRecordForm from "../components/medicalRecord";
import { DoctorCard } from "../components/access";
import toast from "react-hot-toast";
import useContract from "../dapp/contract";
import { Contract } from "ethers";


const doctor_s: Doctor[] = [
  {
    id: "1",
    name: "John Doe",
    walletAddress: "0x9b6f4e5b6eC7fD9c09dC388A1eF0575855C18d49",
    whitelisted: true,
    hospitalAffiliation: "St Mary hospital",
    specialization: "Dermatology"
  },
  {
    id: "2",
    name: "Jane Smith",
    walletAddress: "0xEe921e8f593c0123456789ABCDEF1234567890ab",
    whitelisted: true,
    hospitalAffiliation: "St Mary hospital",
    specialization: "Dermatology"
  },
  {
    id: "3",
    name: "Alice Johnson",
    walletAddress: "0x3a7B6aF584392dFcD5678901234567890ABcdeF1",
    whitelisted: true,
    hospitalAffiliation: "St Mary hospital",
    specialization: "Dermatology"
  },
  {
    id: "4",
    name: "Bob Brown",
    walletAddress: "0xFf8DdFa94ABc34fEcA5678901234567890abcDE2",
    whitelisted: true,
    hospitalAffiliation: "St Mary hospital",
    specialization: "Dermatology",
  },
  {
    id: "5",
    name: "Emily Davis",
    walletAddress: "0x1AaBCD1234eF5678901234567890AbcdeF987654",
    whitelisted: true,
    hospitalAffiliation: "St Mary hospital",
    specialization: "Dermatology"
  }
];


export default function HealthcareProvider() {
  const [name, setName] = useState("St. Mary's Hospital");
  const [doctor, setDoctor] = useState<Doctor[]>(doctor_s)
  const [selectedDoctor, setselectedDoctor] = useState<Doctor | null>(null)
  const [data, setData] = useState<Doctor | null>(null)
  const contract = useContract() as Contract

  const handleData = useCallback((state: any) => {
    setData(state)
    setselectedDoctor(null)
  }, [])
  const revokeAccess = async () => {
    try {
      toast.loading("Revoking doctor access", {id: "doctor"})
      const res = await contract.revokeDoctorAccess(selectedDoctor?.walletAddress)
      console.log(res)
    toast.success("Revoked doctor access", {id: "doctor"})
    } catch (error) {
      toast.success(error.reason, {id: "doctor"})
      console.error("Error: " + error.reason)
    }
  }

  return (
    <div className="flex container flex-col items-center justify-center min-h-screen min-w-full">
      <div className="card card-normal bg-base-100 shadow-xl mb-2 w-full">
        <h1 className="text-center m-2 p-8 text-2xl font-bold">{name}</h1>
      </div>
      <div className="card card-normal bg-base-100 shadow-xl mb-2 w-full">
        <Search title="doctor" handleData={handleData}/>
      </div>
      <div className='flex sm:flex-row flex-col gap-2 w-full mx-auto'>
      <div className="overflow-x-auto card card-normal md:flex-grow bg-base-100 shadow-xl">
        <h2 className='card-title px-4 pt-3'>Doctors</h2>
        <table className="table card-body px-3">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Wallet Address</th>
              <th>Whitelisted</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* rows */}
            {doctor.map(doctor => (
            <tr key={doctor.id}>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar placeholder">
                      <div className="shadow-md text-neutral-content rounded-md w-10">
                        <span className="text-3xl">{doctor.name.charAt(0).toUpperCase()}</span>
                      </div>
                  </div>
                  <div className="font-bold">{doctor.name}</div>
                </div>
              </td>
              <td className="text-sm text-wrap">
                {doctor.walletAddress}
              </td>
              <td><span className={`badge badge-ghost badge-md ${doctor.whitelisted ? "bg-success" : "bg-secondary"}`}>{doctor.whitelisted}</span></td>
              <th>
                <button className="btn btn-ghost btn-xs" onClick={() => {setData(null); setselectedDoctor(doctor)}}>
                <svg width="16px" height="16px" viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#05e654"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="0.048"></g><g id="SVGRepo_iconCarrier"> <path d="M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z" stroke="#ff00d0" strokeWidth="0.648" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M12.0012 5C7.52354 5 3.73326 7.94288 2.45898 12C3.73324 16.0571 7.52354 19 12.0012 19C16.4788 19 20.2691 16.0571 21.5434 12C20.2691 7.94291 16.4788 5 12.0012 5Z" stroke="#ff00d0" strokeWidth="0.648" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                </button>
              </th>
            </tr>))}
          </tbody>            
        </table>
      </div>
      <div className="flex md:flex-col sm:flex-row flex-col gap-3">  
          {selectedDoctor ?
          <div className="card items-center min-h-12 w-96 bg-base-100 shadow-xl">
            <div className="avatar placeholder mt-2">
              <div className="shadow-lg text-neutral-content rounded-lg w-24">
                <span className="text-3xl">{selectedDoctor.name.charAt(0).toUpperCase()}</span>
              </div>
            </div>
            <div className="card-body">
              <p className="font-semibold text-lg text-center">{selectedDoctor.name}</p>
              <p className="text-sm">Address: {selectedDoctor.walletAddress}</p>

            </div>
            <div className="card-actions justify-center mb-4">
              <button className="btn btn-secondary" onClick={revokeAccess}>Revoke access</button>
            </div>
          </div>
          :
          data ?
          // @ts-ignore
          <DoctorCard doc={data} who="hospital"/>
          :
          <div className="card w-96 bg-base-100 shadow-xl image-full">
            <figure><img src="/vect1.webp" alt="Shoes" /></figure>
            <div className="card-body h-full w-full justify-center items-center">
              <p>No doctor</p>
            </div>
          </div>
          }
        <div className="card w-96 bg-base-100 shadow-xl">
          <h2 className="text-center m-2 font-semibold">Create patient record</h2>
          <div className="card-body">
            <MedicalRecordForm who="hospital"/>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}