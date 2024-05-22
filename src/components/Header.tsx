import { Account } from "./Account";
import Link from "next/link";
import dynamic from "next/dynamic";

const ThemeToggle = dynamic(async () => import("./ThemeToggle"), {
  ssr: false,
});

export function Header() {
  return (
    <div>
      <div className="fixed rounded-t-md w-full z-50 top-0 shadow-lg navbar bg-neutral text-neutral-content">
        <div className="flex-1 px-2 mx-2 navbar-start">
          <Link href={"/"} className="flex gap-1 justify-center items-center">
            <img src="/logo.webp" height={'50px'} width={"50px"} className="p" alt="logo"/>
            <span className="text-lg font-bold">HealthChain</span>
          </Link>
        </div>
        <div className="flex navbar-end">
          <Account />
          <ThemeToggle />
        </div>
        
      </div>
      <div className="h-[65px]"></div>
    </div>
  );
}

export default Header;
