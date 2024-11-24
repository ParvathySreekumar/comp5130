import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCart = async () => {
            setLoading(true);
            try {
                const response = await axios.get('/api/cart');
                setCart(response.data.items);
            } catch (error) {
                console.error('Error fetching cart:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCart();
    }, []);

    const addToCart = async (productId, quantity) => {
        try {
            const response = await axios.post('/api/cart/add', { productId, quantity });
            setCart(response.data.items);
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    return (
        <CartContext.Provider value={{ cart, loading, addToCart }}>
            {children}
        </CartContext.Provider>
    );
};
