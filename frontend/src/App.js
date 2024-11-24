import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './others/header';
import HomePage from './components/HomePage'; // Import HomePage
import WomenPage from './components/WomenPage'; // Import WomenPage component
import MenPage from './components/MenPage'; // Import MenPage component
import ProductPage from './components/ProductPage';
import CartPage from './components/CartPage';
import { CartProvider } from './context/CartContext'; // Import CartProvider
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider

function App() {
  return (
    <AuthProvider> {/* Wrap with AuthProvider */}
      <CartProvider> {/* Wrap everything inside CartProvider */}
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} /> {/* Use HomePage here */}
            <Route path="/shop/women" element={<WomenPage />} /> {/* Route for Women's products */}
            <Route path="/shop/men" element={<MenPage />} /> {/* Route for Men's products */}
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
