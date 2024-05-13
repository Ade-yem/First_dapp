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
    "name": "id",
    "type": "string"
  }),
  ethers.utils.ParamType.from({
    "name": "name",
    "type": "string"
  }),
  ethers.utils.ParamType.from({
    "name": "diagnosis",
    "type": "string"
  }),
  medicalRecordParamType,
  ethers.utils.ParamType.from({
    "name": "doctor",
    "type": "string"
  }),
  ethers.utils.ParamType.from({
    "name": "date",
    "type": "string"
  }),
  ethers.utils.ParamType.from({
    "name": "walletAddress",
    "type": "string"
  }),
  
];

// Encode the patient data to bytes
export function encodePatientData(data: MedicalRecord) {
  const encodedData = ethers.utils.defaultAbiCoder.encode(paramTypes, [
    data.id,
    data.name,
    data.diagnosis,
    data.medications.map(record => [
      record.name,
      record.dosage,
      ]),
    data.doctor,
    data.date,
    data.walletAddress,
    
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
    id: decodedData[0],
    name: decodedData[1],
    diagnosis: decodedData[2],
    medications: decodedData[3].map(record => ({
      name: record[0],
      dosage: record[1],
    })),
    doctor: decodedData[4],
    date: decodedData[5],
    walletAddress: decodedData[6],
  };
}
