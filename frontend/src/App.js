import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './others/header';
import HomePage from './components/HomePage'; // Import HomePage

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Use HomePage here */}
      </Routes>
    </Router>
  );
}

export default App;
