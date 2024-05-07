export default function footer() {
  return (
    <footer className="p-10 footer bg-base-200 text-base-content">
      <div>
        <p>
          HealthChain
        </p>
      </div>
      <div>
        <span className="footer-title">Document</span>
        <a
          href="https://nextjs.org/docs/getting-started"
          target="_blank"
          rel="noopener noreferrer"
          className="link link-hover"
        >
          Nextjs Docs
        </a>
        <a
          href="https://hardhat.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="link link-hover"
        >
          Hardhat
        </a>
        <a
          href="https://daisyui.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="link link-hover"
        >
          daisyUI
        </a>
        <a
          href="https://github.com/NoahZinsmeister/web3-react"
          target="_blank"
          rel="noopener noreferrer"
          className="link link-hover"
        >
          Web3 React
        </a>
      </div>
      <div>
        <span className="footer-title">1-click Deployment</span>
      </div>
    </footer>
  )
}