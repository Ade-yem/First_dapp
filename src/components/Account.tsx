import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import Link from "next/link"
import { useRouter } from "next/router";
import useLocalStorage from "../hooks/useLocalStorage";


export function Account() {
  const { account, active } = useWeb3React();
  const context = useWeb3React<Web3Provider>();
  const router = useRouter();
  const [deactivated, setDeactivated] = useLocalStorage<true | false>("theme", false);
  const Disconnect = async () => {
    await context.deactivate();
    setDeactivated(true)
    router.push("/login");
  }

  return (
    <div className="dropdown">
      <div className="btn btn-ghost btn-sm rounded-btn" tabIndex={0} role="button" >
        <span>&or; Account</span>
        <span role="img" aria-label="robot">
          
        </span>
        <span>
          {account === null
            ? "-"
            : account
              ? `${account.substring(0, 6)}...${account.substring(
                  account.length - 4,
                )}`
              : ""}
        </span>
      </div>

      <div tabIndex={0} className="dropdown-content cursor-pointer z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
      {active ? (
        <ul>
      <li className="hover:bg-black/50 text-black"><Link href={"/profile"}>Profile</Link></li>
      <li className="hover:bg-black/50 text-black" onClick={Disconnect}><Link href={"/"}>Logout</Link></li>
      </ul>) : 
      <Link href={"/login"}><span className="p-2 hover:bg-black/50 text-black">Login with wallet</span></Link>
      }
      
    </div>
    </div>
  );
}
