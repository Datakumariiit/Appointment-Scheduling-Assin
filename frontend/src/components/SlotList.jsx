import React, { useEffect, useState } from 'react';
import axios from 'axios';

function SlotList() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/appointments').then(res => setAppointments(res.data));
  }, []);

  return (
    <div>
      <h3>Booked Appointments</h3>
      <ul>
        {appointments.map((a, i) => (
          <li key={i}>{a.date} at {a.time} - {a.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default SlotList;
