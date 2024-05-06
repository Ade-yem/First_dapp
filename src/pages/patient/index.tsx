// pages/patient-dashboard.js

import React, { useState } from 'react';

interface Doctor {
  id: string;
  name: string;
  logo: string;
  address: string;
  accessStatus: string;
}
const hospital_s: Doctor[] = [
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
type Medication = {
  name: string;
  dosage: string;
};

type MedicalRecord = {
  id: number;
  patientName: string;
  diagnosis: string;
  medications: Medication[];
  doctor: string;
};

const PatientDashboard = () => {
  // Replace this with actual patient data fetched from an API or context
  const patientName = 'John Doe';
  const [doctor, setDoctor] = useState(hospital_s)


  // Simulated access logs (replace with actual data)
  const accessLogs = [
    { id: 1, date: '2023-05-12', action: 'Access granted to Dr. Smith' },
    { id: 2, date: '2023-05-15', action: 'Access revoked from Dr. Johnson' },
    // Add more logs as needed
  ];
 
  const grantAccess = (hospitalName: string) => {
    setDoctor(prevdoctor => {
      return prevdoctor.map(hospital => {
        if (hospital.name === hospitalName) {
          return { ...hospital, accessStatus: "Granted" };
        }
        return hospital;
      });
    });
  };

  const revokeAccess = (hospitalName: string) => {
    setDoctor(prevdoctor => {
      return prevdoctor.map(hospital => {
        if (hospital.name === hospitalName) {
          return { ...hospital, accessStatus: "Not Granted" };
        }
        return hospital;
      });
    });
  };
  const [records, setRecords] = useState<MedicalRecord[]>([]);

  // Function to fetch medical records from the server
  const fetchMedicalRecords = async () => {
    try {
      // Sample data
      const sampleRecords: MedicalRecord[] = [
        {
          id: 1,
          patientName: "John Doe",
          diagnosis: "Hypertension",
          medications: [
            { name: "Lisinopril", dosage: "10mg" },
            { name: "Hydrochlorothiazide", dosage: "25mg" },
          ],
          doctor: "Dr. Smith",
        },
        {
          id: 2,
          patientName: "Jane Smith",
          diagnosis: "Type 2 Diabetes",
          medications: [
            { name: "Metformin", dosage: "500mg" },
            { name: "Insulin", dosage: "10 units" },
          ],
          doctor: "Dr. Johnson",
        },
      ];

      setRecords(sampleRecords);
    } catch (error) {
      console.error("Error fetching medical records:", error);
    }
  };
  
  return (
    <div className='min-h-screen'>
      <div className='card card-normal bg-base-100 shadow-xl mb-2'>
      <h1 className='text-center m-2 p-8 text-2xl font-bold'>Welcome, {patientName}!</h1>
      </div>
      <div className='flex gap-2 md:flex-row flex-col'>
        <div className="overflow-x-auto card card-normal bg-base-100 shadow-xl">
            
          <h1>Medical Records</h1>
          <button onClick={fetchMedicalRecords}>Load Medical Records</button>
          <ul>
            {records.map((record) => (
              <li key={record.id}>
                <h3>{record.patientName}</h3>
                <p>Diagnosis: {record.diagnosis}</p>
                <p>Medications: {record.medications.join(", ")}</p>
                <p>Doctor: {record.doctor}</p>
              </li>
            ))}
          </ul>
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
