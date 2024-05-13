import { useCallback, useState } from "react";
import { Search } from "../components/Search";
import { Doctor } from "../types/healthchain_types";
import MedicalRecordForm from "../components/medicalRecord";
import { DoctorCard } from "../components/access";
import toast from "react-hot-toast";
import useContract from "../dapp/contract";
import { Contract } from "ethers";
import withAuth from "../components/middleware";


function HealthcareProvider() {
  const [name, setName] = useState("St. Mary's Hospital");
  const [doctor, setDoctor] = useState<Doctor[]>()
  const [selectedDoctor, setselectedDoctor] = useState<Doctor | null>(null)
  const [data, setData] = useState<any>(null)
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
      <div className='flex sm:flex-row flex-col justify-center gap-4 w-full mx-auto'>
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
        <div className="relative">
          <div className='absolute top-2 right-3 cursor-pointer btn btn-circle btn-ghost z-50 max-w-40' onClick={() => {setData(null); setselectedDoctor(null)}}>
            <span className='text-2xl'>X</span>
          </div>
          <DoctorCard doc={data} who="hospital"/>
        </div>
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
  );
}

export default withAuth(HealthcareProvider);
