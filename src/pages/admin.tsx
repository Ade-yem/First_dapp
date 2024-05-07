import { useCallback, useState } from "react";
import { Search } from "../components/Search";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { HospitalCard } from "../components/access";
import { Hospital } from "../types/healthchain_types";

export default function Admin() {
  const context = useWeb3React<Web3Provider>();
  const name = context.account ? context.account : "Admin";
  const [data, setData] = useState<Hospital | null>(null)
  const handleData = useCallback((state: Hospital | null) => {
    setData(state as Hospital)
  }, [])
  return (
    <div className="flex container flex-col min-h-screen min-w-full">
      <div className="card card-normal bg-base-100 shadow-xl mb-2 w-full">
        <h1 className="text-center m-2 p-8 text-2xl font-bold">Hi {name}!</h1>
      </div>
      <div className="card card-normal bg-base-100 shadow-xl mb-2 w-full">
        <Search title="hospital" handleData={handleData}/>
      </div>
      
      <HospitalCard hosp={data as Hospital}/>
    </div>
  );
}