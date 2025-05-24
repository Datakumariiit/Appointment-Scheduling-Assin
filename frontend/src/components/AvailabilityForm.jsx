import React, { useState } from 'react';
import axios from 'axios';

function AvailabilityForm() {
  const [form, setForm] = useState({ date: '', start_time: '', end_time: '' });

  const submit = async () => {
    try {
      await axios.post('https://appointment-scheduling-assin.onrender.com/availability', form);
      alert('Availability set');
    } catch (e) {
      alert('Failed to set availability');
    }
  };

  return (
    <div>
      <h3>Set Availability</h3>
      <input placeholder="Date (YYYY-MM-DD)" onChange={e => setForm({ ...form, date: e.target.value })} />
      <input placeholder="Start Time" onChange={e => setForm({ ...form, start_time: e.target.value })} />
      <input placeholder="End Time" onChange={e => setForm({ ...form, end_time: e.target.value })} />
      <button onClick={submit}>Submit</button>
    </div>
  );
}

export default AvailabilityForm;
