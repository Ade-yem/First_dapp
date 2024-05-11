import { contract } from "./contract"
import { decodeData, encodeData } from "./encoder"

// General
export const checkUserRole = async () => {

}


// Hospital
export const addDoctorToHospital = async (_address: string) => {
  const res = await contract.addDoctorTohospital(_address)
  console.log(res)
}

export const createRecord = async (_address: string, data: Object) => {
  const dataHash = encodeData(data)
  const res = await contract.createRecord(_address, dataHash)
  console.log(res)
}

export const registerHospital = () => {

}

// Doctor
export const updateRecord = async (_address: string, data: Object) => {
  const dataHash = encodeData(data)
  const res = await contract.updateRecord(_address, dataHash)
  console.log(res)
}
export const getRecord = async (_address: string) => {
  const res = await contract.getPatientRecord(_address)
  const data = decodeData(res)
  return data
}

// Patient
export const grantDoctorAccess = async (_address: string) => {
  const res = await contract.grantDoctorAccess(_address)
  console.log(res)
}
export const revokeDoctorAccess = async (_address: string) => {
  const res = await contract.revokeDoctorAccess(_address)
  console.log(res)
}

// Admin
export const addHospitalToWhitelist = async (_address: string) => {
  const res = await contract.addHospitalToWhitelist(_address)
  console.log(res)
}
export const removeHospitalFromWhitelist = async (_address: string) => {
  const res = await contract.removeHospitalFromWhitelist(_address)
  console.log(res)
}