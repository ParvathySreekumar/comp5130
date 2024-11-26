const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const authenticateToken = require('../middleware/authenticateToken'); // Middleware for authentication
const axios = require('axios');



// Add an item to the cart
router.post('/add', authenticateToken, async (req, res) => {
    console.log('Add to cart route hit');
    const { productId, quantity } = req.body;
    console.log('Request body:', req.body); // Log incoming request
    console.log('i am here')
    if (!productId || quantity <= 0) {
        return res.status(400).json({ message: 'Invalid product ID or quantity' });
    }

    try {
        // Validate the product using the external API
        const apiUrl = `https://fakestoreapi.com/products/${productId}`;
        console.log('Fetching product from Fake Store API:', apiUrl);

        const response = await axios.get(apiUrl);
        const product = response.data; // Assuming the API returns the product details
        console.log('Product found:', product); // Log product details

        if (!product) {
            return res.status(404).json({ message: 'Product not found in external API' });
        }

        // Find the user's cart or create a new one
        console.log('Reached hereeee!'); // Log the current cart
        console.log('User ID:cartRoutes', req.user.userId);
        let cart = await Cart.findOne({ userId: req.user.userId });
        console.log('Cart found:', cart); // Log the current cart


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
        const cart = await Cart.findOne({ userId: req.user.userId }).populate('items.productId', 'name price image');

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        res.status(200).json(cart);
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({ message: 'Failed to retrieve cart' });
    }
});

module.exports = router;
