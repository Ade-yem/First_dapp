import { useState } from "react";

export default function MedicalReport () {
  const medicalRecords = [
    { id: 1, date: '2023-05-10', diagnosis: 'Common cold' },
    { id: 2, date: '2023-04-20', diagnosis: 'Sprained ankle' },
    // Add more records as needed
  ];
  const [records, setRecords] = useState(medicalRecords)
  return (
    <div className="container mx-auto min-h-screen">
      <h2>Your Medical Records</h2>
      <ul>
        {medicalRecords.map((record) => (
          <li key={record.id}>
            <strong>Date:</strong> {record.date} | <strong>Diagnosis:</strong> {record.diagnosis}
          </li>
        ))}
      </ul>
    </div>
  )
}