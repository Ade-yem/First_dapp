import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

export const POLLING_INTERVAL = 12000;
export const injected = new InjectedConnector({
  supportedChainIds: [1, 4202],
});

const RPC_URLS: Record<number, string> = {
  5: process.env.NEXT_PUBLIC_RPC_URL_5 ?? "",
  1337: "http://127.0.0.1:8545/",
};

export const walletconnect = new WalletConnectConnector({
  rpc: RPC_URLS,
  qrcode: true,
});
