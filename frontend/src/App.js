// src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AppointmentForm from './components/AppointmentForm';

function Home() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetch('http://54.160.212.187:3001/api/doctors')
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
      <Link to="/appointment">
        <button>Book Appointment</button>
      </Link>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/appointment" element={<AppointmentForm />} />
      </Routes>
    </Router>
  );
}

export default App;
