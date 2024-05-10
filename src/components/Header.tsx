import Script from "next/script";
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
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5337133458846513"
          crossOrigin="anonymous"
        />
        <Script
          async
          defer
          src="https://analytics.umami.is/script.js"
          data-website-id="2b85d47b-5bd9-407e-b64d-61f1181a0860"
        />

        <div className="flex-1 px-2 mx-2 navbar-start">
          <Link href={"/"} className="flex gap-1 justify-center items-center">
            <img src="/logo.webp" height={'50px'} width={"50px"} className="p" alt="logo"/>
            <span className="text-lg font-bold">HealthChain</span>
          </Link>
        </div>
        <div className="flex navbar-end flex-none px-2 mx-2">
          <Account />
          <ThemeToggle />
        </div>
        
      </div>
      <div className="h-[65px]"></div>
    </div>
  );
}

export default Header;
