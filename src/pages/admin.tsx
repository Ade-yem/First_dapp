import { useCallback, useState } from "react";
import { Search } from "../components/Search";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { Hospital, HospitalCard } from "../components/access";

export default function Admin() {
  const context = useWeb3React<Web3Provider>();
  const name = context.account ? context.account : "Admin";
  const [data, setData] = useState<Hospital | null>(null)
  const handleData = useCallback((state: Hospital | null) => {
    setData(state as Hospital)
  }, [])
  return (
    <div>
      <h1>Hi {name}?</h1>
      <Search title="hospital" handleData={handleData}/>
      <HospitalCard hosp={data as Hospital}/>
    </div>
  );
}