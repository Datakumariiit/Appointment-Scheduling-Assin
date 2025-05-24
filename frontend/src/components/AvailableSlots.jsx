import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AvailableSlots({ selectedDate }) {
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    if (selectedDate) {
      axios
        .get(`https://appointment-scheduling-assin.onrender.com/available-slots?date_str=${selectedDate}`)
        .then(res => setSlots(res.data.slots))
        .catch(err => console.error(err));
    }
  }, [selectedDate]);

  return (
    <div>
      <h3>Available Slots for {selectedDate}</h3>
      <ul>
        {slots.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ul>
    </div>
  );
}

export default AvailableSlots;
