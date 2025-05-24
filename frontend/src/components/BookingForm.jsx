import React, { useState } from 'react';
import axios from 'axios';

function BookingForm() {
  const [form, setForm] = useState({ date: '', time: '', name: '' });
  const [availableSlots, setAvailableSlots] = useState([]);

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const fetchSlots = async () => {
    if (!form.date) {
      alert("Please enter a date first");
      return;
    }

    try {
      const res = await axios.get(`https://appointment-scheduling-assin.onrender.com/available-slots?date_str=${form.date}`);
      setAvailableSlots(res.data.slots);
    } catch (err) {
      alert("Failed to fetch slots");
    }
  };

  const selectSlot = (time) => {
    setForm({ ...form, time });
  };

  const submit = async () => {
    try {
      await axios.post('https://appointment-scheduling-assin.onrender.com/book', form);
      alert('Booked!');
    } catch (e) {
      alert(e.response?.data?.detail || 'Booking failed');
    }
  };

  return (
    <div>
      <h3>Book Appointment</h3>
      <input
        placeholder="Date (YYYY-MM-DD)"
        value={form.date}
        onChange={e => handleChange('date', e.target.value)}
      />
      <button onClick={fetchSlots}>Check Available Slots</button>

      {availableSlots.length > 0 && (
        <div>
          <h4>Available Slots</h4>
          {availableSlots.map((slot, i) => (
            <button key={i} onClick={() => selectSlot(slot)} style={{ margin: '4px' }}>
              {slot}
            </button>
          ))}
        </div>
      )}

      <br />
      <input
        placeholder="Time (HH:MM)"
        value={form.time}
        onChange={e => handleChange('time', e.target.value)}
      />
      <input
        placeholder="Your Name"
        value={form.name}
        onChange={e => handleChange('name', e.target.value)}
      />
      <button onClick={submit}>Book</button>
    </div>
  );
}

export default BookingForm;
