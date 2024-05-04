function App() {
  return (
    <>

      <div className="container">
        <div className="hero min-h-screen" style={{backgroundImage: 'url(/bg.jpeg)'}}>
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="hero-content text-center text-neutral-content">
            <div className="max-w-md">
              <h1 className="mb-5 text-5xl font-bold">HealthChan</h1>
              <p className="mb-5">We aim to revolutionize how medical records are managed and shared, placing control firmly in the hands of the patient.</p>
              <a href="/register" className="btn btn-primary">Get Started</a>
            </div>
          </div>
        </div>
      </div>
        
    </>
  );
}

export default App;
