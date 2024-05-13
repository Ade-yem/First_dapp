import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import Link from "next/link"
import { useRouter } from "next/router";
import useLocalStorage from "../hooks/useLocalStorage";
import useContract from "../dapp/contract";
import { Contract } from "ethers";
import { useState } from "react";


export function Account() {
  const { account, active } = useWeb3React();
  const context = useWeb3React<Web3Provider>();
  const contract = useContract() as Contract
  const router = useRouter();
  const [deactivated, setDeactivated] = useLocalStorage<true | false>("theme", false);
  const Disconnect = async () => {
    await context.deactivate();
    setDeactivated(true)
    router.push("/login");
  }
  const verify = async () => {
    let profile: "hospital" | "doctor" | "patient";
    if (!contract) return "Unabble to verify"
    if (await contract.verifyHospital(context.account) === true) {
      console.log("Hospital")
      profile = "hospital"
    }
    else if (await contract.verifyDoctor(context.account) === true) {
      console.log("Doctor")
      profile = "doctor"}
    else {
      console.log("Patient")
      profile = "patient"
    }
    router.push(`${profile}`)  
  }

  return (
    <div className="dropdown">
      <div className="btn btn-ghost btn-sm rounded-btn" tabIndex={0} role="button" >
        <span>&or; Account</span>
        <span role="img" aria-label="robot">
          
        </span>
        <span>
          {account === null
            ? "-"
            : account
              ? `${account.substring(0, 6)}...${account.substring(
                  account.length - 4,
                )}`
              : ""}
        </span>
      </div>

      <div tabIndex={0} className="dropdown-content cursor-pointer z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
      {active ? (
        <ul>
      <li className="" onClick={verify}>Profile</li>
      <li className="" onClick={Disconnect}><Link href={"/"}>Logout</Link></li>
      </ul>) : 
      <Link href={"/login"}><span className="p-2">Login with wallet</span></Link>
      }
      
    </div>
    </div>
  );
}
