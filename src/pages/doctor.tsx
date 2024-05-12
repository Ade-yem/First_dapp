import { useCallback, useEffect, useState } from "react";
import { Search } from "../components/Search";
import { MedicalRecord, Patient } from "../types/healthchain_types";
import { PatientCard } from "../components/access";
import MedicalRecordForm from "../components/medicalRecord";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { useEagerConnect, useInactiveListener } from "../dapp/hooks";



const sampleRecords: MedicalRecord[] = [
  {
    id: "1",
    name: "John Doe",
    diagnosis: "Hypertension",
    medications: [
      { name: "Lisinopril", dosage: "10mg" },
      { name: "Hydrochlorothiazide", dosage: "25mg" },
    ],
    doctor: "Dr. Smith",
    date: "15-4-2024",
    walletAddress: "0xkrjq2IOJRDFNVJKFNKONWKLFMEWKMEKDJ"
  },
  {
    id: "2",
    name: "Jane Smith",
    diagnosis: "Type 2 Diabetes",
    medications: [
      { name: "Metformin", dosage: "500mg" },
      { name: "Insulin", dosage: "10 units" },
    ],
    doctor: "Dr. Johnson",
    date: "12-2-24",
    walletAddress: "0xkrjq2IOJRDFNVJKFNKONWKLFMEWKMEKDJ"
  },
];


export default function Doctor() {
  const context = useWeb3React<Web3Provider>();
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


  const [name, setName] = useState(context.account);
  const [selectedPatient, setSelectedPatient] = useState<any>(null)
  const [record, setRecord] = useState<MedicalRecord[] | null>(sampleRecords)
  
  const handleData = useCallback((state: any) => {
    setSelectedPatient(state)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-w-full">
      <div className="card card-normal bg-base-100 shadow-xl mb-2 w-full">
        <h1 className="text-center m-2 p-8 text-lg font-semibold">{name}</h1>
      </div>
      <Search title="patient" handleData={handleData}/>
      <div className='flex sm:flex-row flex-col gap-2 w-full mx-auto'>
        <div className="card card-normal bg-base-100 shadow-xl min-h-full sm:flex-grow">
          <h2 className='card-title px-4 pt-3 underline'>Patient Record</h2>
          {
            record ?
            <div className="flex flex-wrap gap-2 m-2">
              {record.map((record) => (
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
            :
            <div className="h-full w-full flex justify-center items-center">Nothing here</div>
          }
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
              <p>Select a patient</p>
              
            </div>
          </div>
          }
        
        <div className="card w-96 bg-base-100 shadow-xl">
          <h2 className="text-center m-2 font-semibold">Update patient record</h2>
          <div className="card-body">
            <MedicalRecordForm who="doctor"/>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}