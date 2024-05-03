export default function HealthcareProvider() {
  return (
    <div className="flex flex-col h-screen">
      <main className="flex-1">
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-4xl font-bold">Healthcare Provider</h1>
          <p className="mt-4 text-lg">
            Welcome to the Healthcare Provider page.
          </p>
          <div>
            Request access for patients data
          </div>
          <div>
            Update patient medical data
          </div>
          <div>
            View patient consent form
          </div>
        </div>
      </main>
    </div>
  );
}