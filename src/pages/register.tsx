// components/RegistrationForm.js

import React, { useState } from 'react';
import Auth from '../components/auth';

const RegistrationForm = () => {
  const [activeTab, setActiveTab] = useState('patient'); // Default active tab is 'patient'

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission based on the active tab (patient, doctor, hospital)
    console.log('Form submitted for:', activeTab);
    // Add your logic here (e.g., API calls, state management)
  };

  return (
    <div className='container mx-auto min-h-screen max-w-[500px]'>
      <Auth/>
      <form onSubmit={handleSubmit}>
        <div role="tablist" className="tabs">
          <input onClick={() => handleTabChange('patient')} type="radio" name="patient" role="tab" className="tab pl-10 pr-10" aria-label="Patient" defaultChecked />
          <div role="tabpanel" className="tab-content p-10">
          {activeTab === 'patient' && (
          <div className='flex flex-col justify-center space-y-4 tab-content'>
            <h2>Patient Registration</h2>
            <label className="input input-bordered flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
              <input type="text" className="grow" placeholder="Username" name='username' />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
              <input type="text" className="grow" placeholder="Email" name='email' />
            </label>
            <label className="input input-bordered flex items-center gap-2">
            <svg width="16px" height="16px" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 10V7C20 5.89543 19.1046 5 18 5H6C4.89543 5 4 5.89543 4 7V10M20 10V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V10M20 10H4M8 3V7M16 3V7" stroke="#000000" strokeWidth="2" strokeLinecap="round"/>
            <rect x="6" y="12" width="3" height="3" rx="0.5" fill="#000000"/>
            <rect x="10.5" y="12" width="3" height="3" rx="0.5" fill="#000000"/>
            <rect x="15" y="12" width="3" height="3" rx="0.5" fill="#000000"/>
            </svg>
              <input type="date" className="grow" name='date-of-birth' />
            </label>
          </div>
          )}
          </div>

          <input type="radio" onClick={() => handleTabChange('doctor')} name="doctor" role="tab" className="tab pl-10 pr-10" aria-label="Doctor" checked />
          <div role="tabpanel" className="tab-content p-10">
          {activeTab === 'doctor' && (
          <div>
            <div className='flex flex-col justify-center space-y-4'>
            <h2>Doctor Registration</h2>
            <label className="input input-bordered flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
              <input type="text" className="grow" placeholder="Name" name='name' />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <svg fill="#000000" width="16px" height="16px" viewBox="-7.5 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>stethoscope</title> <path d="M16.56 13c0-1.32-1.080-2.4-2.4-2.4s-2.4 1.080-2.4 2.4c0 1.040 0.64 1.92 1.56 2.24v4.92c0 2.84-2.88 3.040-3.76 3.040s-3.76-0.2-3.76-3.040v-1.88c2.28-0.36 4.16-2.080 4.16-3.92v-4.96c0-0.84-0.48-1.6-1.2-1.96-0.64-0.32-1.24-0.4-1.72-0.2-0.44 0.16-0.64 0.6-0.48 1.040s0.64 0.68 1.040 0.52c0.040 0 0.16 0 0.44 0.12 0.16 0.080 0.28 0.28 0.28 0.48v4.92c0 0.92-1.4 2.32-3.32 2.32s-3.32-1.4-3.32-2.32v-4.92c0-0.2 0.12-0.4 0.28-0.48 0.24-0.12 0.4-0.12 0.44-0.12 0.44 0.16 0.92-0.080 1.080-0.52s-0.080-0.92-0.52-1.080c-0.52-0.2-1.12-0.12-1.72 0.2-0.76 0.36-1.2 1.12-1.2 1.96v4.92c0 1.88 1.88 3.56 4.16 3.92v1.88c0 3.24 2.72 4.72 5.4 4.72s5.4-1.44 5.4-4.72v-4.84c0.88-0.32 1.56-1.2 1.56-2.24zM14.16 12.24c0.4 0 0.76 0.32 0.76 0.76 0 0.4-0.32 0.76-0.76 0.76-0.4 0-0.76-0.32-0.76-0.76 0-0.4 0.32-0.76 0.76-0.76z"></path> </g></svg>
              <input type="text" className="grow" placeholder="Affiliation" name='affiliation'/>
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <svg fill="#000000" width="16px" height="16px" viewBox="-7.5 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>stethoscope</title> <path d="M16.56 13c0-1.32-1.080-2.4-2.4-2.4s-2.4 1.080-2.4 2.4c0 1.040 0.64 1.92 1.56 2.24v4.92c0 2.84-2.88 3.040-3.76 3.040s-3.76-0.2-3.76-3.040v-1.88c2.28-0.36 4.16-2.080 4.16-3.92v-4.96c0-0.84-0.48-1.6-1.2-1.96-0.64-0.32-1.24-0.4-1.72-0.2-0.44 0.16-0.64 0.6-0.48 1.040s0.64 0.68 1.040 0.52c0.040 0 0.16 0 0.44 0.12 0.16 0.080 0.28 0.28 0.28 0.48v4.92c0 0.92-1.4 2.32-3.32 2.32s-3.32-1.4-3.32-2.32v-4.92c0-0.2 0.12-0.4 0.28-0.48 0.24-0.12 0.4-0.12 0.44-0.12 0.44 0.16 0.92-0.080 1.080-0.52s-0.080-0.92-0.52-1.080c-0.52-0.2-1.12-0.12-1.72 0.2-0.76 0.36-1.2 1.12-1.2 1.96v4.92c0 1.88 1.88 3.56 4.16 3.92v1.88c0 3.24 2.72 4.72 5.4 4.72s5.4-1.44 5.4-4.72v-4.84c0.88-0.32 1.56-1.2 1.56-2.24zM14.16 12.24c0.4 0 0.76 0.32 0.76 0.76 0 0.4-0.32 0.76-0.76 0.76-0.4 0-0.76-0.32-0.76-0.76 0-0.4 0.32-0.76 0.76-0.76z"></path> </g></svg>
              <input type="text" className="grow" placeholder="Specialty" name='specialty' />
            </label>

            <label className="input input-bordered flex items-center gap-2">
            <svg width="16px" height="16px" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 3H9V3C7.11438 3 6.17157 3 5.58579 3.58579C5 4.17157 5 5.11438 5 7V10.5V17" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14 17V19C14 20.1046 14.8954 21 16 21V21C17.1046 21 18 20.1046 18 19V9V4.5C18 3.67157 18.6716 3 19.5 3V3C20.3284 3 21 3.67157 21 4.5V4.5C21 5.32843 20.3284 6 19.5 6H18.5" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 21H5C3.89543 21 3 20.1046 3 19V19C3 17.8954 3.89543 17 5 17H14" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 7H14" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 11H14" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
              <input type="text" name='license_number' className="grow" placeholder='License Number' />
            </label>
          </div>
          </div>
        )}
          </div>

          <input type="radio" onClick={() => handleTabChange('hospital')} name="hospital" role="tab" className="tab pl-10 pr-10" aria-label="Hospital" />
          <div role="tabpanel" className="tab-content p-10">
          {activeTab === 'hospital' && (
          <div>
            <div className='flex flex-col justify-center space-y-4 tab-content'>
            <h2>Hospital Registration</h2>
            <label className="input input-bordered flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
              <input type="text" className="grow" placeholder="Name of Hospital" name='hospital-name' />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
              <input type="text" className="grow" name='hospìtal-address' placeholder="Address" />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
              <input type="text" className="grow" name='contact-info' placeholder="Contact info" />
            </label>
          </div>
          </div>
        )}
          </div>
        </div>
        <button type="submit" className='ml-11 w-[80%] max-w-[415px] btn btn-success'>Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
