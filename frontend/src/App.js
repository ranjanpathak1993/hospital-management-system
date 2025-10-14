import React, { useEffect, useState } from 'react';

function App() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetch('http://54.160.212.187:3001/api/doctors') // ✅ Correct IP here
      .then(res => res.json())
      .then(data => setDoctors(data))
      .catch(err => console.error('Error fetching doctors:', err));
  }, []);

  return (
    <div>
      <h1>Welcome to Hospital Management System</h1>
      <h2>Doctor List</h2>
      <ul>
        {doctors.map(doc => (
          <li key={doc.id}>
            {doc.name} - {doc.specialization}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
