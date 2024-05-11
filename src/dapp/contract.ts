import data from "./HealthRecords.json" with { type: "json" };
import { ethers } from "ethers";

const provider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL_5)
const signer = provider.getSigner()

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string
const ABI = data.abi

export const contract = new ethers.Contract(contractAddress, ABI, signer)
