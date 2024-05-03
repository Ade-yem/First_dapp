import type { AppProps } from "next/app";
import Layout from "../components/layout";

import "../index.css";
import { Web3ReactProvider } from "@web3-react/core";
import getLibrary from "../provider/Web3Provider";


function MyApp({ Component, pageProps }: AppProps) {
  return (
  <Web3ReactProvider getLibrary={getLibrary}>
    <Layout>
      <Component {...pageProps} />  
    </Layout>
  </Web3ReactProvider>
  );
}

export default MyApp;
