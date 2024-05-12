import { useMemo } from 'react';
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import data from "./HealthRecords.json" with { type: "json" };
import { Web3Provider } from '@ethersproject/providers';

// This hook will return the contract instance or null if it's not available
export default function useContract() {
  const { library, active } = useWeb3React<Web3Provider>();

  // useMemo will only recompute the contract instance when one of the dependencies has changed
  const contract = useMemo(() => {
    if (active && library) {
      const provider = new ethers.providers.Web3Provider(library.provider as ethers.providers.ExternalProvider);
      const signer = provider.getSigner();
      const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string;
      const ABI = data.abi;

      try {
        // Create and return the contract instance
        const contractInstance = new ethers.Contract(contractAddress, ABI, signer);
        return contractInstance;
      } catch (error) {
        console.error('Failed to create contract instance:', error);
      }
    }
    // Return null if the contract instance can't be created
    return null;
  }, [library, active]);

  return contract;
}
