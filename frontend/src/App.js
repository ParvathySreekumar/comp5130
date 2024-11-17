import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './others/header';
import HomePage from './components/HomePage'; // Import HomePage
import WomenPage from './components/WomenPage'; // Import WomenPage component
import MenPage from './components/MenPage'; // Import MenPage component

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Use HomePage here */}
        <Route path="/shop/women" element={<WomenPage />} /> {/* Route for Women's products */}
        <Route path="/shop/men" element={<MenPage />} /> {/* Route for Men's products */}
      </Routes>
    </Router>
  );
}

export default App;
