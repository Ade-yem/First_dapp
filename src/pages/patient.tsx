// pages/patient-dashboard.js
import React, { useCallback, useEffect, useState } from 'react';
import { Doctor, MedicalRecord } from '../types/healthchain_types';
import { Search } from '../components/Search';
import { DoctorCard } from '../components/access';
import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { useEagerConnect, useInactiveListener } from '../dapp/hooks';
import { Contract } from 'ethers';
import useContract from '../dapp/contract';
import { decodePatientData } from '../dapp/encoder';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import withAuth from '../components/middleware';

const PatientDashboard = () => {

  const context = useWeb3React<Web3Provider>();
  const contract = useContract() as Contract
  // Handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = useState<any>();
  useEffect(() => {
    if (activatingConnector && activatingConnector === context.connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, context.connector]);
  // Handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
    const triedEager = useEagerConnect();

    // Handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
    useInactiveListener(!triedEager || Boolean(activatingConnector));

  // Replace this with actual patient data fetched from an API or context
  const patientName = 'John Doe';
  const [selectedDoctor, setselectedDoctor] = useState<Doctor | null>(null)
  const [visible, setVisible] = useState(false)
  // Simulated access logs (replace with actual data)
  const accessLogs = [
    { id: 1, date: '2023-05-12', action: 'Access granted to Dr. Smith' },
    { id: 2, date: '2023-05-15', action: 'Access revoked from Dr. Johnson' },
    // Add more logs as needed
  ];
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  // Function to fetch medical records from the server
  const fetchMedicalRecords = async () => {

    try {
      // Sample data
      toast.loading("Getting medical records", {id:"patient"})
      const dataHash = await contract.getPatientRecord(context.account)
      const data = decodePatientData(dataHash)
      console.log(data)
      toast.success("Success", {id:"patient"})
      setRecords([data]);
    } catch (error) {
      toast.error(error.reason ? error.reason : "Connection error", {id:"patient"})
      console.error("Error fetching medical records:", error.reason);
    }
  };
  
  const handleData = useCallback((state: any) => {
    setselectedDoctor(state)
    setVisible(true);
  }, [])
  async function Register() {
    try {
      toast.loading("Registering you as hospital", {id: "hospital"})
      const res  = await contract.registerHospital();
      console.log(res)
      toast.success("Hospital registration complete", {id: "hospital"})
      useRouter().push("/hospital")

    } catch (error) {
      toast.error(error.reason ? error.reason : "Connection error", {id: "hospital"})
      console.error(error.reason)
    }
  }

  return (
    <div className='min-h-screen'>
      <div className='bg-base-100'>
        <div className='navbar'>
        <div className="dropdown navbar-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
          </div>
          <div tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-60">
            <p>Register as an hospital here</p>
            <button className="btn btn-xs mt-3 btn-secondary" onClick={Register}>Register</button>
          </div>
        </div>
        </div>
      <h1 className='text-center mt-2 p-8 text-2xl font-bold'>Welcome, {patientName}!</h1>
      </div>
      <div className='flex gap-2 flex-col'>
        {/* Access Logs Section */}
        <div tabIndex={0} className='bg-base-100 collapse collapse-arrow shadow-xl'>
          <div className="collapse-title text-xl font-medium">
            <h2 className=''>Access Logs</h2>
          </div>
          <div className='collapse-content'>
            {accessLogs.map((log) => (
              <div key={log.id} className='border-b py-2 cursor-pointer hover:bg-black/10'>
                <div className='flex space-x-3'>
                <svg fill="#ff00bb" className='mt' width="18px" height="18px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="#ff00bb" strokeWidth="0.00024000000000000003"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M3,22H21a1,1,0,0,0,1-1V6a1,1,0,0,0-1-1H17V3a1,1,0,0,0-2,0V5H9V3A1,1,0,0,0,7,3V5H3A1,1,0,0,0,2,6V21A1,1,0,0,0,3,22ZM4,7H20v3H4Zm0,5H20v8H4Z"></path></g></svg> 
                <span className=' text-md'>{log.date}</span>
                </div>
                <div className='flex space-x-3'>
                <svg fill="#ff00dd" className='mt' width="18px" height="18px" viewBox="-2.88 -2.88 37.76 37.76" version="1.1" xmlns="http://www.w3.org/2000/svg" stroke="#ff00dd" strokeWidth="0.00032" transform="rotate(0)"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="0.128"></g><g id="SVGRepo_iconCarrier"> <path d="M1.060 29.448c0.010 0 0.022 0 0.034-0.001 0.506-0.017 0.825-0.409 0.868-0.913 0.034-0.371 1.030-9.347 15.039-9.337l0.032 5.739c0 0.387 0.223 0.739 0.573 0.904 0.346 0.166 0.764 0.115 1.061-0.132l12.968-10.743c0.233-0.191 0.366-0.475 0.365-0.774s-0.136-0.584-0.368-0.774l-12.967-10.643c-0.299-0.244-0.712-0.291-1.061-0.128-0.349 0.166-0.572 0.518-0.572 0.903l-0.032 5.614c-5.811 0.184-10.312 2.053-13.229 5.467-4.748 5.556-3.688 13.63-3.639 13.966 0.074 0.49 0.433 0.85 0.926 0.85zM18.033 17.182h-0.002c-10.007 0.006-13.831 3.385-16.015 6.37 0.32-2.39 1.252-5.273 3.281-7.626 2.698-3.128 7.045-4.777 12.736-4.777 0.552 0 1-0.447 1-1v-4.493l10.389 8.542-10.389 8.622v-4.637c0-0.265-0.105-0.52-0.294-0.708-0.187-0.187-0.441-0.293-0.706-0.293z"></path> </g></svg>
                <span className=' text-md'>{log.action}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="card card-normal bg-base-100 shadow-xl mb-2 w-full">
          <Search title="doctor" handleData={handleData}/>
        </div>
        <div className='flex md:flex-row flex-col'>
        <div className="card card-normal flex-grow justify-center mt-4 items-center">
          <button className='btn-wide btn-accent btn' onClick={fetchMedicalRecords}>Load Medical Records</button>
          <div className='flex flex-wrap m-3 gap-3'>
          {records.map((record) => (
              <div className='card shadow-xl bg-base-100 min-w-[250px] border border-accent p-4' key={record.id}>
                <div className="flex justify-between">
                  <h3 className="border-accent border-b m-2">{record.name}</h3>
                  <div className="badge badge-ghost">{record.date}</div>
                </div>
                
                <div className="block border-accent border-b p-2">
                  <span className="font-semibold text-base">Diagnosis</span>
                  <p className="text-sm"> {record.diagnosis}</p>
                </div>
                <div className="block border-accent border-b p-2">
                  <span className="font-semibold text-base">Medications</span>
                  <div>
                    {record.medications.map((medic) => (
                      <div>
                        <span className=" font-medium text-sm">{medic.name}</span>
                        <p className=" font-medium text-xs">{medic.dosage}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="block border-accent border-b p-2">
                  <span className="font-semibold text-base">Doctor</span>
                  <p className="text-sm"> {record.doctor}</p>
                </div>
              </div>
              ))}
          </div>
        </div>
        {
            visible && <div  className='relative'>
              <div className='absolute top-2 right-1' onClick={() => {setVisible(false); setselectedDoctor(null)}}>
                <span className='text-2xl'>X</span>
              </div>
              <DoctorCard doc={selectedDoctor} who='patient'/>
            </div>
          }

        </div>
        

      </div>
    </div>
  );
};

export default withAuth(PatientDashboard);
