import { useState } from "react";

interface Patient {
  id: string;
  name: string;
  picture: string;
  address: string;
  accessStatus: string;
}

const patient_s: Patient[] = [
  {
    id: "1",
    name: "John Doe",
    picture: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
    address: "123 Main St",
    accessStatus: "Allowed"
  },
  {
    id: "2",
    name: "Jane Smith",
    picture: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
    address: "456 Elm St",
    accessStatus: "Denied"
  },
  {
    id: "3",
    name: "Alice Johnson",
    picture: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
    address: "789 Oak St",
    accessStatus: "Allowed"
  },
  {
    id: "4",
    name: "Bob Brown",
    picture: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
    address: "1011 Pine St",
    accessStatus: "Denied"
  },
  {
    id: "5",
    name: "Emily Davis",
    picture: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
    address: "1213 Cedar St",
    accessStatus: "Allowed"
  },
  {
    id: "6",
    name: "Michael Wilson",
    picture: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
    address: "1415 Maple St",
    accessStatus: "Denied"
  },
  {
    id: "7",
    name: "Samantha Martinez",
    picture: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
    address: "1617 Birch St",
    accessStatus: "Allowed"
  },
  {
    id: "8",
    name: "David Taylor",
    picture: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
    address: "1819 Walnut St",
    accessStatus: "Denied"
  },
  {
    id: "9",
    name: "Olivia Anderson",
    picture: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
    address: "2021 Spruce St",
    accessStatus: "Allowed"
  },
  {
    id: "10",
    name: "William Thomas",
    picture: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
    address: "2223 Oakwood St",
    accessStatus: "Denied"
  }
];


export default function HealthcareProvider() {
  const [name, setName] = useState("St. Mary's Hospital");
  const [patients, setPatients] = useState<Patient[]>(patient_s)
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  function requestAccess(name: string): void {
    setPatients(prevPatients => {
      return prevPatients.map(patient => {
        if (patient.name === name) {
          return { ...patient, accessStatus: "Allowed" };
        }
        return patient;
      });
    });
  }

  return (
    <div className="flex container flex-col min-h-screen">
      <main className="flex-1">
        <div className="flex flex-col items-center justify-center">
          <div className="card card-normal bg-base-100 shadow-xl mb-2 w-full">
            <h1 className="text-center m-2 p-8 text-2xl font-bold">{name}</h1>
          </div>
          <div className='flex sm:flex-row flex-col gap-2 w-full mx-auto'>
          <div className="overflow-x-auto card card-normal bg-base-100 shadow-xl">
            <h2 className='card-title px-4 pt-3'>Patients</h2>
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
                {patients.map(patient => (
                <tr key={patient.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={patient.picture} alt="Avatar Tailwind CSS Component" />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{patient.name}</div>
                        {/* <div className="text-sm opacity-50">United States</div> */}
                      </div>
                    </div>
                  </td>
                  <td>
                    {patient.address}
                  </td>
                  <td><span className={`badge badge-ghost badge-md ${patient.accessStatus.toLowerCase() === "allowed" ? "text-success" : "text-secondary"}`}>{patient.accessStatus}</span></td>
                  <th>
                    <button className="btn btn-ghost btn-xs" onClick={() => setSelectedPatient(patient)}>
                    <svg width="16px" height="16px" viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#05e654"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.048"></g><g id="SVGRepo_iconCarrier"> <path d="M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z" stroke="#ff00d0" stroke-width="0.648" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12.0012 5C7.52354 5 3.73326 7.94288 2.45898 12C3.73324 16.0571 7.52354 19 12.0012 19C16.4788 19 20.2691 16.0571 21.5434 12C20.2691 7.94291 16.4788 5 12.0012 5Z" stroke="#ff00d0" stroke-width="0.648" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                    </button>
                  </th>
                  <th className=' card-actions'>
                    {
                      patient.accessStatus.toLowerCase() === "allowed" ?
                      <button className='btn btn-sm  bg-accent' disabled onClick={() => requestAccess(patient.name)}>Request</button>
                      :
                      <button className='btn btn-sm  bg-accent' onClick={() => requestAccess(patient.name)}>Request</button>
                    }
                  </th>
                </tr>))}
              </tbody>            
            </table>
          </div>
        <div className="flex md:flex-col sm:flex-row flex-col gap-3">  
            {selectedPatient ?
            <div className="card min-h-12 w-96 bg-base-100 shadow-xl">
              <figure className="">
                  <img src={selectedPatient.picture}></img>
                </figure>
              <div className="card-body">
                <p className="font-semibold text-lg text-center">{selectedPatient.name}</p>
                <p>Address: {selectedPatient.address}</p>

              </div>
              <div className="card-actions justify-center mb-4">
                <button className="btn btn-info">View record</button>
                <button className="btn btn-success">Update record</button>
              </div>
            </div>
            :
            <div className="card w-96 bg-base-100 shadow-xl image-full">
              <figure><img src="/vect1.webp" alt="Shoes" /></figure>
              <div className="card-body justify-center items-center">
                <p >Select a patient</p>
                
              </div>
            </div>
            }
          
          <div className="card w-96 bg-base-100 shadow-xl">
            <h2 className="text-center m-2 font-semibold">Create patient record</h2>
            <div className="card-body">
              <form action="" className="flex flex-col space-y-3">    
                <input type="text" placeholder="Name of patient" className="input input-bordered input-primary w-full max-w-xs" />
                <input type="text" placeholder="Patient address" className="input input-bordered input-primary w-full max-w-xs" />
                <input type="text" placeholder="Link to file" className="input input-bordered input-primary w-full max-w-xs" />
                <button type="submit" className="btn btn-success">Create record</button>
              </form>
            
            </div>
          </div>
        </div>
          
        </div>
        </div>
      </main>
    </div>
  );
}