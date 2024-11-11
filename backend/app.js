require('dotenv').config({ path: '../.env' });
//require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors'); // If you're using CORS middleware

// Import your routes
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS to allow frontend to communicate with the backend
app.use(express.json());
app.use(morgan('dev'));


// Use the product routes
app.use('/api/products', productRoutes);

//Use the authentication routes
app.use('/api/auth', authRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

