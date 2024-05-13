function App() {
  return (
  <div className="container min-w-full">
    <div className="hero min-h-screen" style={{backgroundImage: 'url(/bg.webp)'}}>
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">HealthChain</h1>
          <p className="mb-5 text-lg">We aim to revolutionize how medical records are managed and shared, placing control firmly in the hands of the patient.</p>
          <a href="/login" className="btn btn-primary">Get Started</a>
        </div>
      </div>
    </div>
  </div>
        
  );
}

export default App;
