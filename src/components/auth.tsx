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
    useEffect(() => {
      verifyUser()

    }, [active, account])
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
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-2 py-4 px-2">
        <div className="card bordered pt-3">
          <figure>
            <img
              className="h-16 w-16"
              src="/metamask.png"
              alt="metamask"
            />
          </figure>
          <div className="card-body">
            <div className="justify-center card-actions m-3">
              <button
                type="button"
                className="btn btn-primary"
                disabled={disabled}
                onClick={Connect}
              >
                <div className="py-4 px-2">
                  {activating(injected) && (
                    <p className="btn loading">loading...</p>
                  )}
                  {connected(injected) && (
                    <span role="img" aria-label="check">
                      ✅
                    </span>
                  )}
                </div>
                Connect with MetaMask
              </button>
              {(active || error) && connected(injected) && (
                <>
                  {Boolean(library && account) && (
                    <button
                      type="button"
                      className="btn btn-primary"
                      disabled={disabled}
                      onClick={() => {
                        if (!library || !account) return;
                        library
                          .getSigner(account)
                          .signMessage("👋")
                          .then((signature: any) => {
                            if (usePathname() === "/login") router.push("/");
                            window.alert(`Success!\n\n${signature}`);
                          })
                          .catch((err: Error) => {
                            window.alert(
                              `Failure!${JSON.stringify(err, null, 2)}`,
                            );
                          });
                      }}
                    >
                      Sign Message
                    </button>
                  )}
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      if (connected(walletconnect)) {
                        (connector as any).close();
                      }
                      deactivate();
                    }}
                  >
                    Deactivate
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="card bordered pt-3">
          <figure>
            <img
              className="h-16 w-16"
              src="https://docs.walletconnect.com/img/walletconnect-logo.svg"
              alt="wallet connect"
            />
          </figure>
          <div className="card-body">
            <div className="justify-center card-actions m-3">
              <button
                type="button"
                className="btn btn-primary"
                disabled={disabled}
                onClick={() => {
                  setActivatingConnector(walletconnect);
                  activate(walletconnect).catch(logger.error);
                }}
              >
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
                Connect with WalletConnect
              </button>
              {(active || error) && connected(walletconnect) && (
                <>
                  {Boolean(library && account) && (
                    <button
                      type="button"
                      className="btn btn-primary"
                      disabled={disabled}
                      onClick={() => {
                        if (!library || !account) return;
                        library
                          .getSigner(account)
                          .signMessage("👋")
                          .then((signature: any) => {
                            window.alert(`Success!\n\n${signature}`);
                          })
                          .catch((err: Error) => {
                            window.alert(
                              `Failure!${JSON.stringify(err, null, 2)}`,
                            );
                          });
                      }}
                    >
                      Sign Message
                    </button>
                  )}
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      if (connected(walletconnect)) {
                        (connector as any).close();
                      }
                      deactivate();
                    }}
                  >
                    Deactivate
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
