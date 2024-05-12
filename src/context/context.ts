// "use client"
// import {  Web3Provider } from "@ethersproject/providers";
// import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
// import { NoEthereumProviderError, UserRejectedRequestError as UserRejectedRequestErrorInjected,
// } from "@web3-react/injected-connector";
// import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect } from "@web3-react/walletconnect-connector";
// import { ReactNode, createContext, useContext, useEffect, useState } from "react";
// import { injected, walletconnect } from "../dapp/connectors";
// import { useEagerConnect, useInactiveListener } from "../dapp/hooks";
// import logger from "../logger";
// import useLocalStorage from "../hooks/useLocalStorage";
// import { useRouter } from "next/router";
// import useContract from "../dapp/contract";

// interface Web3ContextType {
//   active: boolean;
//   connector: any;
//   library: Web3Provider | undefined;
//   error: Error | undefined;
//   connectWallet: (connection: any) => void;
//   disconnectWallet: () => void;
// }
// const Web3Context = createContext<Web3ContextType | null>(null);

// // export const useWeb3 = () => useContext(Web3Context);

// export const Web3ProviderWrapper = ({ children }: { children: ReactNode }) => {
//   const router = useRouter();
//   const { activate, account, deactivate, active, connector, library, error } = useWeb3React<Web3Provider>();
//   const [isConnecting, setIsConnecting] = useState(false);
//   const contract = useContract();

//   useEffect(() => {
//     if (!active && !isConnecting) {
//       connectWallet(injected);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [active, isConnecting]);

//   useEffect(() => {
//     if (active) {
//       verifyUser();
//     }
//   }, [active]);

//   const connectWallet = async (connection: any) => {
//     try {
//       setIsConnecting(true);
//       await activate(connection, undefined, true);
//       setIsConnecting(false);
//     } catch (error) {
//       if (error instanceof NoEthereumProviderError) {
//         logger.error("No Ethereum browser extension detected.");
//       } else if (error instanceof UnsupportedChainIdError) {
//         logger.error("You're connected to an unsupported network.");
//       } else {
//         logger.error(error);
//       }
//       setIsConnecting(false);
//     }
//   };

//   const disconnectWallet = () => {
//     deactivate();
//   };

//   const verifyUser = async () => {
//     if (active && connector === injected && account && contract) {
//       try {
//         const url = await verify(account);
//         router.push(`/${url}`);
//       } catch (error) {
//         logger.error("Error verifying user:", error);
//       }
//     }
//   };

//   const verify = async (_address: string) => {
//     if (!contract) return "Unable to verify";
//     try {
//       if (await contract.verifyHospital(_address)) {
//         return "hospital";
//       } else if (await contract.verifyDoctor(_address)) {
//         return "doctor";
//       } else {
//         return "patient";
//       }
//     } catch (error) {
//       logger.error("Error verifying user:", error);
//       return "Unable to verify";
//     }
//   };
//   const value = { active, connector, library, error, connectWallet, disconnectWallet }
//   return (
//     <Web3Context.Provider value={value}>
//       {children}
//     </Web3Context.Provider>
//   );
// };
