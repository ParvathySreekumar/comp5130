import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]); // State to store cart items
    const [loading, setLoading] = useState(false); // Loading state for cart
    const [error, setError] = useState(null); // Error state for handling API errors

    useEffect(() => {
        const fetchCart = async () => {
            setLoading(true); // Start loading
            const token = localStorage.getItem('token'); // Get user's JWT token
            if (!token) {
                setLoading(false);
                return; // No token, skip fetching
            }

            try {
                const response = await axios.get('http://localhost:5000/api/cart', {
                    headers: {
                        Authorization: `Bearer ${token}`, // Pass the token in the header
                    },
                });
                setCart(response.data.items); // Update the cart state
            } catch (error) {
                console.error('Error fetching cart:', error);
                setError(error.response?.data?.message || 'Failed to fetch cart');
            } finally {
                setLoading(false); // End loading
            }
        };

        fetchCart();
    }, []);

    const addToCart = async (productId, quantity) => {
        const token = localStorage.getItem('token'); // Get user's JWT token
        if (!token) {
            alert('Please log in to add products to your cart.'); // Notify if not logged in
            return;
        }

        try {
            console.log('Entering try with :', productId);
            console.log('Token:', token);
            const response = await axios.post(
                'http://localhost:5000/api/cart/add',
                { productId, quantity },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Pass the token in the header
                    },
                }
            );
            console.log('Reaching here!?');
            setCart(response.data.cart.items); // Update cart with the response
            console.log('Cart updated:', response.data.cart.items);
        } catch (error) {
            console.error('Error adding to cart:', error);
            setError(error.response?.data?.message || 'Failed to add product to cart');
        }
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                loading,
                error,
                addToCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

