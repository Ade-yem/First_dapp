import Script from "next/script";
import { Account } from "./Account";
import { Balance } from "./Balance";
import { ChainId } from "./ChainId";
import Link from "next/link";
import dynamic from "next/dynamic";

const ThemeToggle = dynamic(async () => import("./ThemeToggle"), {
  ssr: false,
});

export function Header() {
  return (
    <>
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

        <div className="flex-1 px-2 mx-2">
          <span className="text-lg font-bold">
            <Link href={"/"}>
              <img src="/logo.webp" height={'50px'} width={"50px"} className="p" alt="logo"/>
            </Link>
          </span>
        </div>
        <div className="flex navbar-start flex-none px-2 mx-2">
          <div className="flex items-stretch">
            {/* <ChainId /> */}
            <Account />
            {/* <Balance /> */}
          </div>
        </div>
        <ThemeToggle />
      </div>
      <div className="h-[65px]"></div>
    </>
  );
}

export default Header;
