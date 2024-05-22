"use client"
import { usePathname } from "next/navigation";
import {  Web3Provider } from "@ethersproject/providers";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from "@web3-react/injected-connector";
import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect } from "@web3-react/walletconnect-connector";
import { useEffect, useState } from "react";
import { injected, walletconnect } from "../dapp/connectors";
import { useEagerConnect, useInactiveListener } from "../dapp/hooks";
import logger from "../logger";
import useLocalStorage from "../hooks/useLocalStorage";
import { useRouter } from "next/router";
import useContract from "../dapp/contract";


function getErrorMessage(error?: Error) {
  if (error instanceof NoEthereumProviderError) {
    return "No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.";
  }

  if (error instanceof UnsupportedChainIdError) {
    return "You're connected to an unsupported network.";
  }

  if (
    error instanceof UserRejectedRequestErrorInjected ||
    error instanceof UserRejectedRequestErrorWalletConnect
  ) {
    return "Please authorize this website to access your Ethereum account.";
  }

  logger.error(error);
  return "An unknown error occurred. Check the console for more details.";
}


export function Auth() {
  const context = useWeb3React<Web3Provider>();
  const { connector, library, account, activate, deactivate, active, error } =
    context;
  const router = useRouter();
  const contract = useContract()
  // Handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = useState<any>();
  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  const activating = (connection: typeof injected | typeof walletconnect) =>
    connection === activatingConnector;
  const connected = (connection: typeof injected | typeof walletconnect) =>
    connection === connector;
  const disabled =
    // !triedEager ||
    Boolean(activatingConnector) ||
    connected(injected) ||
    connected(walletconnect) ||
    Boolean(error);
  
    const Connect = async () => {
      setActivatingConnector(injected);
      activate(injected).catch(logger.error);
    }
    // useEffect(() => {
    //   verifyUser()

    // }, [active, account])
    const verify = async (_address: string) => {
      if (!contract) return "Unabble to verify"
      if (await contract.verifyHospital(_address) === true) {
        console.log("Hospital")
        return "hospital"
      }
      else if (await contract.verifyDoctor(_address) === true) {
        console.log("Doctor")
        return "doctor"
      } else if (await contract.owner === context.account) {
        console.log("Admin")
        return "admin"
      }
      else {
        console.log("Patient")
        return "patient"}
    }

    const verifyUser = async () => {if (active && connected(injected) &&  account) {
      try {
        const url = await verify(account)
        router.push(`/${url}`)
      } catch (error) {
        console.error(error)
      }
    } else {
      console.log("Unable to verify user")
    }
  }

  return (
    <div className="" >
      <div>
        {Boolean(error) && (
          <h4 style={{ marginTop: "1rem", marginBottom: "0" }}>
            {getErrorMessage(error)}
          </h4>
        )}
      </div>
      <div className="flex flex-col justify-center gap-2 py-4 px-2">
        <div className="flex justify-center gap-5">
          <figure className="btn btn-circle btn-ghost w-fit h-fit" onClick={Connect}>
            <img
              className="h-16 w-16"
              src="/metamask.png"
              alt="metamask"
            />
          </figure>
          <figure className="btn btn-circle btn-ghost w-fit h-fit" onClick={() => {
                  setActivatingConnector(walletconnect);
                  activate(walletconnect).catch(logger.error);
                }}>
            <img
              className="h-16 w-16"
              src="https://docs.walletconnect.com/img/walletconnect-logo.svg"
              alt="wallet connect"
            />
          </figure>
        </div>
        <div className="justify-center m-3">
          { activating(injected) || connected(injected) || activating(walletconnect) || connected(walletconnect) &&
          <button type="button" className="btn" disabled>
            <div className="py-4 px-2 flex justify-center">
              {activating(injected) && (
                <p className="btn loading">loading...</p>
              )}
              {connected(injected) && (
                <span role="img" aria-label="check">
                  ✅
                </span>
              )}
            </div>
            <div className="py-4 px-2">
              {activating(walletconnect) && (
                <p className="btn loading">loading...</p>
              )}
              {connected(walletconnect) && (
                <span role="img" aria-label="check">
                  ✅
                </span>
              )}
            </div>
          </button>}
        </div>
        <button disabled className="btn btn-ghost btn-block">
              {
                account ? account : "Not connected"
              }
        </button>

      </div>
    </div>
  );
}

export default Auth;
