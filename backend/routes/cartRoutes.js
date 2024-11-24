const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Add an item to the cart
router.post('/add', async (req, res) => {
    const { userId, productId, quantity } = req.body;

    try {
        // Find if the user already has a cart
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            // If no cart exists, create a new cart
            cart = new Cart({
                userId,
                items: [{ productId, quantity }],
            });
        } else {
            // If cart exists, check if the product already exists in the cart
            const productIndex = cart.items.findIndex(item => item.productId.toString() === productId);

            if (productIndex >= 0) {
                // Update the quantity if product already exists in the cart
                cart.items[productIndex].quantity += quantity;
            } else {
                // If not, add the new product to the cart
                cart.items.push({ productId, quantity });
            }
        }

        await cart.save();
        res.status(200).json({ message: 'Item added to cart', cart });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a user-specific cart
router.get('/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const cart = await Cart.findOne({ userId }).populate('items.productId', 'name price image'); // Populate product details

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
