import { useCallback, useEffect, useState } from "react";
import { Search } from "../components/Search";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { Hospital } from "../types/healthchain_types";
import { useEagerConnect, useInactiveListener } from "../dapp/hooks";
import useContract from "../dapp/contract";
import toast from "react-hot-toast";

export default function Admin() {
  const context = useWeb3React<Web3Provider>();
  const [loading, setLoading] = useState(false)
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
  
  const name = context.account ? context.account : "Admin";
  const [data, setData] = useState<any>(null)
  const handleData = useCallback((state: any) => {
    setData(state)
  }, [])
  const contract = useContract()
  async function handleWhiteList() {
    setLoading(true)
    if (contract === null || data === null) return;
    try {
      toast.loading("Granting access", {id: "admin"})
      const response = await contract.addHospitalToWhitelist(data.walletAddress)
      console.log(response)
      setData((prev: Hospital | null) => {
        if (!prev) return null; // Handle the case where prev is null
        return { ...prev, whitelisted: true };
        });
        toast.success("Hospital access granted", {id: "admin"})
        setLoading(false)
    } catch (error) {
      toast.error(error.reason, {id: "admin"})
      console.error("Error: " + error.reason)
      setLoading(false)
    }
    
  }
  async function RevokeHospital() {
    setLoading(true)
    if (contract === null || data === null) return;
    try {
        toast.loading("Revoking access", {id: "admin"})
      const response = await contract.removeHospitalFromWhitelist(data.walletAddress)
      console.log(response)
      setData((prev: Hospital | null) => {
        if (!prev) return null; // Handle the case where prev is null
        return { ...prev, whitelisted: false };
        });
        setLoading(false)
        toast.success("Hospital access revoked", {id: "admin"})
    } catch (error) {
      toast.error(error.reason, {id: "admin"})
      console.error("Error: " + error.reason)
      setLoading(false)
    }
  }

  return (
    <div className="flex container flex-col min-h-screen min-w-full">
      <div className="card card-normal bg-base-100 shadow-xl mb-2 w-full">
        <h1 className="text-center m-2 p-8 text-lg font-semibold">Hi {name}!</h1>
      </div>
      <div className="card card-normal bg-base-100 shadow-xl mb-2 w-full">
        <Search title="hospital" handleData={handleData}/>
      </div>
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      {data &&
      <div className="flex flex-col justify-center min-w-60 min-h-24">
        <div className="avatar placeholder">
          <div className="shadow-md text-neutral-content rounded-md w-24">
            {/* <span className="text-3xl">{data.name.charAt(0).toUpperCase()}</span> */}
            <span className="text-3xl">{"H"}</span>
          </div>
        </div>
        <div className="text-sm"><span>{data.address}</span></div>
        <div className="p-8">
          <h2 className="block mt-1 text-lg leading-tight font-medium text-black">{"Hospital"}</h2>
          {/* <h2 className="block mt-1 text-lg leading-tight font-medium text-black">{data.name}</h2> */}
          <div className="mt-4">
            {loading ? <button className="btn btn-primary"><span className="loading loading-dots loading-lg"></span></button> :
            <div className="card-actions">
              <button onClick={RevokeHospital} className="btn btn-primary">Revoke Access</button>
              <button onClick={handleWhiteList} className="btn btn-primary">Whitelist</button>
            </div>}
          </div>
        </div>
      </div>}
    </div>
      
    </div>
  );
}
