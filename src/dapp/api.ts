// import useContract from "./contract";
// import { decodePatientData, encodePatientData } from "./encoder";

// const contract = useContract();


// export const addDoctorToHospital = async (_address: string) => {
//   if (!contract) {
//   return "Contract is null. Make sure it's properly initialized.";
// }
//   const res = await contract.addDoctorTohospital(_address)
//   console.log(res)
// }

// export const createRecord = async (_address: string, data: Object) => {
//   if (!contract) {
//   return "Contract is null. Make sure it's properly initialized.";
// }
//   const dataHash = encodePatientData(data)
//   const res = await contract.createRecord(_address, dataHash)
//   console.log(res)
// }

// export const registerHospital = () => {
//   if (!contract) {
//   return "Contract is null. Make sure it's properly initialized.";
// }

// }

// // Doctor
// export const updateRecord = async (_address: string, data: Object) => {
//   if (!contract) {
//   return "Contract is null. Make sure it's properly initialized.";
// }
//   const dataHash = encodePatientData(data)
//   const res = await contract.updateRecord(_address, dataHash)
//   console.log(res)
// }
// export const getRecord = async (_address: string) => {
//   if (!contract) {
//   return "Contract is null. Make sure it's properly initialized.";
// }
//   const res = await contract.getPatientRecord(_address)
//   const data = decodePatientData(res)
//   return data
// }

// // Patient
// export const grantDoctorAccess = async (_address: string) => {
//   if (!contract) {
//   return "Contract is null. Make sure it's properly initialized.";
// }
//   const res = await contract.grantDoctorAccess(_address)
//   console.log(res)
// }
// export const revokeDoctorAccess = async (_address: string) => {
//   if (!contract) {
//   return "Contract is null. Make sure it's properly initialized.";
// }
//   const res = await contract.revokeDoctorAccess(_address)
//   console.log(res)
// }

// // Admin
// export const addHospitalToWhitelist = async (_address: string) => {
//   if (!contract) {
//   return "Contract is null. Make sure it's properly initialized.";
// }
//   const res = await contract.addHospitalToWhitelist(_address)
//   console.log(res)
// }
// export const removeHospitalFromWhitelist = async (_address: string) => {
//   if (!contract) {
//   return "Contract is null. Make sure it's properly initialized.";
// }
//   const res = await contract.removeHospitalFromWhitelist(_address)
//   console.log(res)
// }
// export const verify = async (_address: string) => {
//   if (!contract) {
//   return "Contract is null. Make sure it's properly initialized.";
// }
//   if (await contract.verifyDoctor(_address) === true) {
//     console.log("Hospital")
//     return "hospital"
//   }
//   else if (await contract.verifyDoctor(_address) === true) {
//     console.log("Doctor")
//     return "doctor"}
//   else {
//     console.log("Patient")
//     return "patient"}
// }
