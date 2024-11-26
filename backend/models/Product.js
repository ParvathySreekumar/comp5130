const mongoose = require('mongoose');

// Product Schema
const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Product name is required'],
            trim: true,
        },
        price: {
            type: Number,
            required: [true, 'Product price is required'],
            min: [0, 'Price must be a positive number'], // Price validation
        },
        description: {
            type: String,
            trim: true, // Remove extra spaces
        },
        image: {
            type: String,
            required: false, // Optional
        },
        stock: {
            type: Number,
            required: true,
            min: [0, 'Stock cannot be negative'],
            default: 0,
        },
        category: {
            type: String,
            enum: ['Men', 'Women', 'Kids', 'Accessories'], // Add valid categories
            required: true,
        },
    },
    { timestamps: true } // Automatically add createdAt and updatedAt fields
);

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
