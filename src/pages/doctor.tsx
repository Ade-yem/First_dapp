import { useCallback, useState } from "react";
import { Search } from "../components/Search";
import { Patient, PatientCard } from "../components/access";






export default function Doctor() {
  const [name, setName] = useState("Doctor Adeyemi");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const [record, setRecord] = useState<Patient | null>(null)
  
  const handleData = useCallback((state: Patient | null) => {
    setSelectedPatient(state)
  }, [])
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const walletAddress = formData.get("walletAddress");
    const recordFile = formData.get("recordFile");
    const data = {name, walletAddress, recordFile};
    console.log(data);
    // Optionally, you can reset the form after submission
    e.target.reset();
  };
  

  return (
    <div className="flex container flex-col min-h-screen">
      <main className="flex-1">
        <div className="flex flex-col items-center justify-center">
          <div className="card card-normal bg-base-100 shadow-xl mb-2 w-full">
            <h1 className="text-center m-2 p-8 text-2xl font-bold">{name}</h1>
          </div>
          <Search title="patient" handleData={handleData}/>
          <div className='flex sm:flex-row flex-col gap-2 w-full mx-auto'>
          <div className="overflow-x-auto card card-normal bg-base-100 shadow-xl">
            <h2 className='card-title px-4 pt-3'>Patient Record</h2>
            {JSON.stringify(record)}
          </div>
        <div className="flex md:flex-col sm:flex-row flex-col gap-3">  
            {selectedPatient ?
            <div className="card min-h-12 w-96 bg-base-100 shadow-xl">
              <PatientCard setRecord={setRecord} patient={selectedPatient}/>
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
            <h2 className="text-center m-2 font-semibold">Update patient record</h2>
            <div className="card-body">
              <form onSubmit={handleSubmit} className="flex flex-col space-y-3">    
                <input type="text" name="name" placeholder="Name of patient" className="input input-bordered input-primary w-full max-w-xs" />
                <input type="text" name="walletAddress" placeholder="Patient address" className="input input-bordered input-primary w-full max-w-xs" />
                <input type="text" name="recordFile" placeholder="Link to file" className="input input-bordered input-primary w-full max-w-xs" />
                <button type="submit" className="btn btn-success">Update record</button>
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