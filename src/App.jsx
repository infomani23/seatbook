import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './Login';
import SeatBooking from './SeatBook';
import "./App.css"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/SeatBook" element={<SeatBooking />} />
        <Route path="/" element={<LoginForm />} />
      </Routes>
    </Router>
  );
};

export default App;
