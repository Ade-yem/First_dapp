import Header from "./Header";
import Footer from "./Footer";
import { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";


export default function Layout({ children }) {
  
  const context = useWeb3React<Web3Provider>();
  useEffect(() => {
    const deactivated = window.localStorage.getItem("deactivated");
    if (deactivated) context.deactivate()
  }, [])
  return (
    <div>
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}