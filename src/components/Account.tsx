import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import Link from "next/link"
import { useRouter } from "next/router";
import useLocalStorage from "../hooks/useLocalStorage";
import useContract from "../dapp/contract";
import { Contract } from "ethers";
import Auth from "./auth";
import toast from "react-hot-toast";


export function Account() {
  const { account, active } = useWeb3React();
  const context = useWeb3React<Web3Provider>();
  const contract = useContract() as Contract
  const router = useRouter();
  const Disconnect = async () => {
    context.deactivate();
  }
  const verify = async () => {
    let profile: "hospital" | "doctor" | "patient" | "admin";
    if (!contract) {
      toast.error("Unable to verify you");
      return;
    };
    if (await contract.verifyHospital(context.account) === true) {
      profile = "hospital"
    }
    else if (await contract.verifyDoctor(context.account) === true) {
      profile = "doctor"
    } else if (await contract.owner() === context.account) {
      profile = "admin"
    }
    else {
      profile = "patient"
    }
    router.push(`${profile}`)  
  }
  

  return (
    <div className="dropdown m-6">
      {/* @ts-ignore */}
      <div className="btn btn-ghost btn-md border-neutral-content rounded-btn flex h-fit" onClick={()=>document.getElementById('my_modal_3')?.showModal()} tabIndex={0} role="button" >
        <span>
          <svg width="30px" height="30px" viewBox="-2.16 -2.16 28.32 28.32" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M13 14.0008L7 14M13 14.0008L10.5 11.5M13 14.0008L10.5 16.5M21 12V11.2C21 10.0799 21 9.51984 20.782 9.09202C20.5903 8.71569 20.2843 8.40973 19.908 8.21799C19.4802 8 18.9201 8 17.8 8H3M21 12V16M21 12H19C17.8954 12 17 12.8954 17 14C17 15.1046 17.8954 16 19 16H21M21 16V16.8C21 17.9201 21 18.4802 20.782 18.908C20.5903 19.2843 20.2843 19.5903 19.908 19.782C19.4802 20 18.9201 20 17.8 20H6.2C5.0799 20 4.51984 20 4.09202 19.782C3.71569 19.5903 3.40973 19.2843 3.21799 18.908C3 18.4802 3 17.9201 3 16.8V8M18 8V7.2C18 6.0799 18 5.51984 17.782 5.09202C17.5903 4.71569 17.2843 4.40973 16.908 4.21799C16.4802 4 15.9201 4 14.8 4H6.2C5.07989 4 4.51984 4 4.09202 4.21799C3.71569 4.40973 3.40973 4.71569 3.21799 5.09202C3 5.51984 3 6.0799 3 7.2V8" stroke="#ffffff" strokeWidth="0.72" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
        </span>
        <span>
          {account === null
            ? "Connect wallet"
            : account
              ? `${account.substring(0, 6)}...${account.substring(
                  account.length - 4,
                )}`
              : "Connect wallet"}
        </span>
      </div>
      {active ?
      <div tabIndex={0} className="dropdown-content dark:text-neutral-content cursor-pointer z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
        <ul>
          <li className="p-2" onClick={verify}>Profile</li>
          <li className="p-2" onClick={Disconnect}>Logout</li>
        </ul>
      </div>
      :
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <div>
            <Auth/>
          </div>
        </div>
      </dialog>
      }
    </div>
  );
}
