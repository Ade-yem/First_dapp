// pages/patient-dashboard.js

import React, { useState } from 'react';

interface Hospital {
  id: string;
  name: string;
  logo: string;
  address: string;
  accessStatus: string;
}
const hospital_s: Hospital[] = [
  {
    id: "1",
    name: "St. Mary's Hospital",
    logo: "https://img.daisyui.com/tailwind-css-component-profile-2@56w.png",
    address: "123 Main Street, Cityville",
    accessStatus: "Granted",
  },
  {
    id: "2",
    name: "General Medical Center",
    logo: "https://img.daisyui.com/tailwind-css-component-profile-3@56w.png",
    address: "456 Elm Avenue, Townsville",
    accessStatus: "Not Granted",
  },
  {
    id: "3",
    name: "Community Health Clinic",
    logo: "https://example.com/community-health-clinic-logo.png",
    address: "789 Oak Drive, Villageton",
    accessStatus: "Granted",
  },
  {
    id: "4",
    name: "City Hospital",
    logo: "https://img.daisyui.com/tailwind-css-component-profile-4@56w.png",
    address: "555 Maple Lane, Metropolis",
    accessStatus: "Not Granted",
  },
  {
    id: "5",
    name: "Sunset Medical Center",
    logo: "https://img.daisyui.com/tailwind-css-component-profile-5@56w.png",
    address: "987 Sunset Boulevard, Beachside",
    accessStatus: "Granted",
  },
];

const PatientDashboard = () => {
  // Replace this with actual patient data fetched from an API or context
  const patientName = 'John Doe';
  const [hospitals, setHospitals] = useState(hospital_s)


  // Simulated access logs (replace with actual data)
  const accessLogs = [
    { id: 1, date: '2023-05-12', action: 'Access granted to Dr. Smith' },
    { id: 2, date: '2023-05-15', action: 'Access revoked from Dr. Johnson' },
    // Add more logs as needed
  ];
 
  const grantAccess = (hospitalName) => {
    setHospitals(prevHospitals => {
      return prevHospitals.map(hospital => {
        if (hospital.name === hospitalName) {
          return { ...hospital, accessStatus: "Granted" };
        }
        return hospital;
      });
    });
  };

  const revokeAccess = (hospitalName) => {
    setHospitals(prevHospitals => {
      return prevHospitals.map(hospital => {
        if (hospital.name === hospitalName) {
          return { ...hospital, accessStatus: "Not Granted" };
        }
        return hospital;
      });
    });
  };
  
  return (
    <div className='container mx-auto min-h-screen'>
      <div className='card card-normal bg-base-100 shadow-xl mb-2'>
      <h1 className='text-center m-2 p-2 text-xl font-bold'>Welcome, {patientName}!</h1>
      </div>
      <div className='flex gap-2'>
        <div className="overflow-x-auto card card-normal bg-base-100 shadow-xl">
          <h2 className='card-title px-4 pt-3'>Your Healthcare providers</h2>
          <table className="table card-body px-3">
            {/* head */}
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Access status</th>
                <th></th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* rows */}
              {hospitals.map(hospital => (
              <tr key={hospital.id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={hospital.logo} alt="Avatar Tailwind CSS Component" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{hospital.name}</div>
                      {/* <div className="text-sm opacity-50">United States</div> */}
                    </div>
                  </div>
                </td>
                <td>
                  {hospital.address}
                </td>
                <td><span className={`badge badge-ghost badge-md ${hospital.accessStatus.toLowerCase() === "granted" ? "text-success" : "text-secondary"}`}>{hospital.accessStatus}</span></td>
                <th>
                  <button className="btn btn-ghost btn-xs">
                  <svg width="16px" height="16px" viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#05e654"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.048"></g><g id="SVGRepo_iconCarrier"> <path d="M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z" stroke="#ff00d0" stroke-width="0.648" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12.0012 5C7.52354 5 3.73326 7.94288 2.45898 12C3.73324 16.0571 7.52354 19 12.0012 19C16.4788 19 20.2691 16.0571 21.5434 12C20.2691 7.94291 16.4788 5 12.0012 5Z" stroke="#ff00d0" stroke-width="0.648" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                  </button>
                </th>
                <th className=' card-actions'>
                  <button className='btn btn-sm  bg-accent' onClick={() => grantAccess(hospital.name)}>Grant</button>
                  <button className='btn btn-sm bg-error' onClick={() => revokeAccess(hospital.name)}>Revoke</button>
                </th>
              </tr>))}
            </tbody>            
          </table>
        </div>
        {/* Access Logs Section */}
        <div className='bg-base-100 card card-normal shadow-xl'>
          <h2 className='card-title px-4 pt-3'>Access Logs</h2>
          <ul className=' card-body'>
            {accessLogs.map((log) => (
              <li key={log.id} className='border-b py-2 cursor-pointer hover:bg-black/10'>
                <div className='flex space-x-3'>
                <svg fill="#ff00bb" className='mt' width="18px" height="18px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="#ff00bb" stroke-width="0.00024000000000000003"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M3,22H21a1,1,0,0,0,1-1V6a1,1,0,0,0-1-1H17V3a1,1,0,0,0-2,0V5H9V3A1,1,0,0,0,7,3V5H3A1,1,0,0,0,2,6V21A1,1,0,0,0,3,22ZM4,7H20v3H4Zm0,5H20v8H4Z"></path></g></svg> 
                <span className=' text-md'>{log.date}</span>
                </div>
                <div className='flex space-x-3'>
                <svg fill="#ff00dd" className='mt' width="18px" height="18px" viewBox="-2.88 -2.88 37.76 37.76" version="1.1" xmlns="http://www.w3.org/2000/svg" stroke="#ff00dd" stroke-width="0.00032" transform="rotate(0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.128"></g><g id="SVGRepo_iconCarrier"> <path d="M1.060 29.448c0.010 0 0.022 0 0.034-0.001 0.506-0.017 0.825-0.409 0.868-0.913 0.034-0.371 1.030-9.347 15.039-9.337l0.032 5.739c0 0.387 0.223 0.739 0.573 0.904 0.346 0.166 0.764 0.115 1.061-0.132l12.968-10.743c0.233-0.191 0.366-0.475 0.365-0.774s-0.136-0.584-0.368-0.774l-12.967-10.643c-0.299-0.244-0.712-0.291-1.061-0.128-0.349 0.166-0.572 0.518-0.572 0.903l-0.032 5.614c-5.811 0.184-10.312 2.053-13.229 5.467-4.748 5.556-3.688 13.63-3.639 13.966 0.074 0.49 0.433 0.85 0.926 0.85zM18.033 17.182h-0.002c-10.007 0.006-13.831 3.385-16.015 6.37 0.32-2.39 1.252-5.273 3.281-7.626 2.698-3.128 7.045-4.777 12.736-4.777 0.552 0 1-0.447 1-1v-4.493l10.389 8.542-10.389 8.622v-4.637c0-0.265-0.105-0.52-0.294-0.708-0.187-0.187-0.441-0.293-0.706-0.293z"></path> </g></svg>
                <span className=' text-md'>{log.action}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
