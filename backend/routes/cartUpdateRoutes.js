const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

// Update the quantity of an item in the cart
router.put('/update', async (req, res) => {
    const { userId, productId, quantity } = req.body;

    try {
        // Find the user's cart
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Find the product in the cart and update the quantity
        const productIndex = cart.items.findIndex(item => item.productId.toString() === productId);

        if (productIndex >= 0) {
            cart.items[productIndex].quantity = quantity; // Update the quantity
            await cart.save();
            res.status(200).json({ message: 'Cart updated', cart });
        } else {
            res.status(404).json({ message: 'Product not found in cart' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Remove an item from the cart
router.delete('/remove', async (req, res) => {
    const { userId, productId } = req.body;

    try {
        // Find the user's cart
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Find the index of the product in the cart and remove it
        const productIndex = cart.items.findIndex(item => item.productId.toString() === productId);

        if (productIndex >= 0) {
            cart.items.splice(productIndex, 1); // Remove the item
            await cart.save();
            res.status(200).json({ message: 'Item removed from cart', cart });
        } else {
            res.status(404).json({ message: 'Product not found in cart' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
