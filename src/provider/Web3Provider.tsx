import {
    type ExternalProvider,
    type JsonRpcFetchFunc,
    Web3Provider,
  } from "@ethersproject/providers";


import { POLLING_INTERVAL, injected, walletconnect } from "../dapp/connectors";

export default function getLibrary(
    provider: ExternalProvider | JsonRpcFetchFunc,
  ): Web3Provider {
    const library = new Web3Provider(provider);
    library.pollingInterval = POLLING_INTERVAL;
    return library;
  }
  