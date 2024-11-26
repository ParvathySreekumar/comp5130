const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const authenticateToken = require('../middleware/authenticateToken'); // Authentication middleware

// Update the quantity of an item in the cart
router.put('/update', authenticateToken, async (req, res) => {
    const { productId, quantity } = req.body;

    if (!productId || quantity === undefined) {
        return res.status(400).json({ message: 'Product ID and quantity are required' });
    }

    try {
        // Find the user's cart
        const cart = await Cart.findOne({ userId: req.user.id });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Find the product in the cart
        const productIndex = cart.items.findIndex(item => item.productId.toString() === productId);

        if (productIndex >= 0) {
            if (quantity > 0) {
                // Update the quantity if it's greater than 0
                cart.items[productIndex].quantity = quantity;
            } else {
                // If quantity is 0 or less, remove the item from the cart
                cart.items.splice(productIndex, 1);
            }

            await cart.save();
            res.status(200).json({ message: 'Cart updated', cart });
        } else {
            res.status(404).json({ message: 'Product not found in cart' });
        }
    } catch (error) {
        console.error('Error updating cart:', error);
        res.status(500).json({ message: 'Failed to update cart' });
    }
});

// Remove an item from the cart
router.delete('/remove', authenticateToken, async (req, res) => {
    const { productId } = req.body;

    if (!productId) {
        return res.status(400).json({ message: 'Product ID is required' });
    }

    try {
        // Find the user's cart
        const cart = await Cart.findOne({ userId: req.user.id });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Find the index of the product in the cart
        const productIndex = cart.items.findIndex(item => item.productId.toString() === productId);

        if (productIndex >= 0) {
            cart.items.splice(productIndex, 1); // Remove the item
            await cart.save();
            res.status(200).json({ message: 'Item removed from cart', cart });
        } else {
            res.status(404).json({ message: 'Product not found in cart' });
        }
    } catch (error) {
        console.error('Error removing item from cart:', error);
        res.status(500).json({ message: 'Failed to remove item from cart' });
    }
});

module.exports = router;
