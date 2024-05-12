import type { AppProps } from "next/app";
import Layout from "../components/layout";
import "../index.css";
import { Web3ReactProvider } from "@web3-react/core";
import getLibrary from "../provider/Web3Provider";
import Head from "next/head";


function MyApp({ Component, pageProps }: AppProps) {
  return (
  <Web3ReactProvider getLibrary={getLibrary}>
    <Head>
      <link rel="icon" href="/logo.webp"></link>
    </Head>
    <Layout>
      <Component {...pageProps} />  
    </Layout>
  </Web3ReactProvider>
  );
}

export default MyApp;
