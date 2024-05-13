import Header from "./Header";
import Footer from "./Footer";
import { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { Toaster } from "react-hot-toast";

export default function Layout({ children }) {
  
  const context = useWeb3React<Web3Provider>();
  useEffect(() => {
    const refresh = async () => {
        const deactivated = window.localStorage.getItem("deactivated");
        if (deactivated === "true") {
          context.deactivate()
        }
    };

    refresh();
  }, [])
  return (
    <>
      <Header />
      <Toaster position="top-right"/>
      <main className="mt-3 min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  );
}