const mongoose = require('mongoose');

// Cart Item Schema
const cartItemSchema = new mongoose.Schema({
    productId: {
        type: String,
        ref: 'Product',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, 'Quantity must be at least 1'], // Minimum quantity validation
    },
});

// Cart Schema
const cartSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            unique: true, // Ensure one cart per user
        },
        items: [cartItemSchema],
    },
    { timestamps: true } // Automatically add createdAt and updatedAt fields
);

// Pre-save middleware to clean empty items (if necessary)
cartSchema.pre('save', function (next) {
    this.items = this.items.filter(item => item.quantity > 0); // Remove items with quantity <= 0
    next();
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
