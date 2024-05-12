import { ethers } from "ethers";
import { MedicalRecord } from "../types/healthchain_types";

// Define ParamType for adding MedicalRecord object
const medicalRecordParamType = ethers.utils.ParamType.from({
  "name": "medications",
  "type": "tuple[]",
  "components": [
    { "name": "name", "type": "string" },
    { "name": "dosage", "type": "string" },
  ]
});

const paramTypes = [
  ethers.utils.ParamType.from({
    "name": "name",
    "type": "string"
  }),
  ethers.utils.ParamType.from({
    "name": "id",
    "type": "string"
  }),
  ethers.utils.ParamType.from({
    "name": "walletAddress",
    "type": "string"
  }),
  ethers.utils.ParamType.from({
    "name": "walletAddress",
    "type": "string"
  }),
  ethers.utils.ParamType.from({
    "name": "diagnosis",
    "type": "string"
  }),
  ethers.utils.ParamType.from({
    "name": "doctor",
    "type": "string"
  }),
  ethers.utils.ParamType.from({
    "name": "date",
    "type": "string"
  }),
  medicalRecordParamType
];

// Encode the patient data to bytes
export function encodePatientData(data: MedicalRecord) {
  const encodedData = ethers.utils.defaultAbiCoder.encode(paramTypes, [
    data.name,
    data.walletAddress,
    data.medications.map(record => [
      record.name,
      record.dosage,
      ]),
    data.diagnosis,
    data.doctor,
    data.date,
    data.id,
  ]);

  // return encodedData in hex string so blockchain can accept the bytes type;
  return ethers.utils.hexlify(encodedData)
}

// Decode bytes back to the patient data object
export function decodePatientData(bytes: string) {
  // Ensure bytes is a valid hexadecimal string
  if (typeof bytes !== 'string' || !bytes.match(/^0x[0-9A-Fa-f]*$/)) {
    throw new Error('Invalid bytes format. Expected a hexadecimal string.');
  }

  // Decode hexadecimal string back to bytes so we can decode it
  const encodedData = ethers.utils.arrayify(bytes);

  const decodedData = ethers.utils.defaultAbiCoder.decode(paramTypes, encodedData);

  return {
    name: decodedData[0],
    walletAddress: decodedData[1],
    medications: decodedData[2].map(record => ({
      name: record[0],
      dosage: record[1],
    })),
    diagnosis: decodedData[3],
    doctor: decodedData[4],
    date: decodedData[5],
    id: decodedData[6]
  };
}

// // Example usage
// const patientData = {
//   name: "John Doe",
//   address: "123 Main Street, Lagos",
//   medicalRecords: [
//     { diagnosis: "Allergy", treatment: "Antihistamines", date: "2022-01-01" },
//     { diagnosis: "Fractured Arm", treatment: "Cast", date: "2022-02-15" }
//   ]
// };

// function addMedicalRecord(obj, newRecord) { // obj is decoded patient record
//   obj.medicalRecords.push(newRecord);
// }

// // Function to get all medical records
// function getAllMedicalRecords(obj) {
//   return obj.medicalRecords;
// }

// // Function to search for a record by index
// function getMedicalRecordAtIndex(obj, index) {
//   return obj.medicalRecords[index];
// }


// // console.log(`normal data : ${patientData.name}\n records : ${patientData.medicalRecords}`)
// const newMedicalRecord = { diagnosis: "Fever", treatment: "Rest", date: "2024-05-07" };
// addMedicalRecord(patientData, newMedicalRecord);
// console.log("Updated Object with New Record:", patientData);



// const encodedPatientData2 = encodePatientData(patientData);
// console.log("Encoded Patient Data:", encodedPatientData2);

// const decodedPatientData2 = decodePatientData(encodedPatientData2);
// console.log("Decoded Patient Data:", decodedPatientData2);

// const allRecords = getAllMedicalRecords(patientData);
// console.log("All Medical Records:", allRecords);

// const index = 2; // Example index
// const recordAtIndex = getMedicalRecordAtIndex(patientData, index);
// console.log(`Medical Record at index ${index}:`, recordAtIndex);