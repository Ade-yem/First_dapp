import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { useRouter } from "next/router";
import { useEffect } from "react";
import toast from "react-hot-toast";

const withAuth = (WrappedComponent: React.ComponentType<any>) => {
  const AuthComponent: React.FC<any> = (props) => {
    const router = useRouter();
    const { active } = useWeb3React<Web3Provider>();

    useEffect(() => {
      if (!active) {
        toast.error("You need to login to access this page")
        // If the user is not authenticated, redirect them to the login page
        router.push("/login");
      }
    }, [active, router]);

    // If the user is authenticated, render the wrapped component
    return active ? <WrappedComponent {...props} /> : null;
  };

  return AuthComponent;
};

export default withAuth;
