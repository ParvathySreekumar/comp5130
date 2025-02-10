import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]); // State to store cart items
    const [loading, setLoading] = useState(false); // Loading state for cart
    const [error, setError] = useState(null); // Error state for handling API errors

    // Fetch the cart from the backend
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
            if (error.response && error.response.status === 404) {
                // Handle 404 as an empty cart
                setCart([]);
            } else {
                console.error('Error fetching cart:', error);
                setError(error.response?.data?.message || 'Failed to fetch cart');
            }
        } finally {
            setLoading(false);
        }
    };

    // Call fetchCart when the component mounts
    useEffect(() => {
        console.log('useEffect triggered: fetchCart called'); // Log when this useEffect is triggered
        fetchCart();
    }, []);

    const addToCart = async (productId, quantity) => {
        const token = localStorage.getItem('token'); // Get user's JWT token
        if (!token) {
            alert('Please log in to add products to your cart.'); // Notify if not logged in
            return;
        }

        try {
            const response = await axios.post(
                'http://localhost:5000/api/cart/add',
                { productId, quantity },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Pass the token in the header
                    },
                }
            );
            setCart(response.data.cart.items); // Update cart with the response
        } catch (error) {
            console.error('Error adding to cart:', error);
            setError(error.response?.data?.message || 'Failed to add product to cart');
        }
    };

    // Remove a product from the cart
    const removeFromCart = async (productId) => {
        const token = localStorage.getItem('token'); // Get user's JWT token
        if (!token) {
            alert('Please log in to modify your cart.'); // Notify if not logged in
            return;
        }

        try {
            // Pass `data` explicitly in the `config` object
            const response = await axios.delete(
                'http://localhost:5000/api/cart/update/remove',
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Pass the token in the header
                    },
                    data: { productId }, // Include productId in the request body
                }
            );

            setCart(response.data.cart.items); // Update cart state after item is removed
        } catch (error) {
            console.error('Error removing item from cart:', error);
            setError(error.response?.data?.message || 'Failed to remove product from cart');
        }
    };

    const updateCartQuantity = async (productId, quantityChange) => {
        const token = localStorage.getItem('token'); // Get user's JWT token
        if (!token) {
            alert('Please log in to modify your cart.');
            return;
        }

        try {
            const response = await axios.put(
                'http://localhost:5000/api/cart/update/update',
                { productId, quantity: quantityChange }, // Send productId and new quantity
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Pass token in the header
                    },
                }
            );
            setCart(response.data.cart.items); // Update the cart state with the response
        } catch (error) {
            console.error('Error updating cart quantity:', error);
            setError(error.response?.data?.message || 'Failed to update cart quantity');
        }
    };



    return (
        <CartContext.Provider
            value={{
                cart,
                loading,
                error,
                fetchCart,
                addToCart,
                removeFromCart,
                updateCartQuantity,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

