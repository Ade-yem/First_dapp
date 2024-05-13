import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const withAuth = (WrappedComponent: React.ComponentType<any>) => {
  const AuthComponent: React.FC<any> = (props) => {
    const router = useRouter();
    const { active } = useWeb3React<Web3Provider>();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const checkAuth = async () => {
        // Simulate loading time
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setLoading(false);

        if (!active) {
          // If the user is not authenticated, redirect them to the login page
          router.push("/login");
        }
      };

      checkAuth();
    }, [active, router]);

    // Render the loading state while checking authentication
    if (loading) {
      return <div>Loading...</div>;
    }

    // If the user is authenticated, render the wrapped component
    return active ? <WrappedComponent {...props} /> : null;
  };

  return AuthComponent;
};

export default withAuth;
