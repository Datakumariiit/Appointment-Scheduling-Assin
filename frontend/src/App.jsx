import React from 'react';
import AvailabilityForm from './components/AvailabilityForm';
import BookingForm from './components/BookingForm';
import SlotList from './components/SlotList';

function App() {
  return (
    <div className="App">
      <h1>Appointment Scheduler</h1>
      <AvailabilityForm />
      <BookingForm />
      <SlotList />
    </div>
  );
}

export default App;
