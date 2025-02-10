const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const authenticateToken = require('../middleware/authenticateToken'); // Middleware for authentication
const axios = require('axios');



// Add an item to the cart
router.post('/add', authenticateToken, async (req, res) => {
    const { productId, quantity } = req.body;
    if (!productId || quantity <= 0) {
        return res.status(400).json({ message: 'Invalid product ID or quantity' });
    }

    try {
        // Validate the product using the external API
        //const apiUrl = `https://fakestoreapi.com/products/${productId}`;
        const apiUrl = `https://fakestoreapi.com/products/${productId}`;

        const response = await axios.get(apiUrl);
        const product = response.data; // Assuming the API returns the product details

        if (!product) {
            return res.status(404).json({ message: 'Product not found in external API' });
        }

        // Find the user's cart or create a new one
        let cart = await Cart.findOne({ userId: req.user.userId });


        if (!cart) {
            cart = new Cart({
                userId: req.user.userId,
                items: [{ productId: productId.toString(), quantity }],
            });
        } else {
            // Check if the product already exists in the cart
            const productIndex = cart.items.findIndex(item => item.productId === productId.toString());

            if (productIndex >= 0) {
                // Update the quantity if product exists
                cart.items[productIndex].quantity += quantity;
            } else {
                // Add the new product to the cart
                cart.items.push({ productId: productId.toString(), quantity });
            }
        }

        await cart.save();
        res.status(200).json({ message: 'Item added to cart', cart });
    } catch (error) {
        console.error('Error adding to cart:', error.stack);
        res.status(500).json({ message: 'Failed to add item to cart' });
    }
});

// Get a user-specific cart
router.get('/', authenticateToken, async (req, res) => {
    try {
        //const cart = await Cart.findOne({ userId: req.user.userId }).populate('items.productId', 'name price image');
        const cart = await Cart.findOne({ userId: req.user.userId });

        if (!cart) {
            //return res.status(404).json({ message: 'Cart not found' });
            return res.status(200).json({ items: [] });
        }

        res.status(200).json(cart);
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({ message: 'Failed to retrieve cart' });
    }
});

module.exports = router;
