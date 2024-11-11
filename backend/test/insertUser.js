const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Replace this with your MongoDB connection string if needed
mongoose.connect('mongodb://localhost:27017/ecommerce', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Could not connect to MongoDB', err));

const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

async function insertUser() {
    const hashedPassword = await bcrypt.hash('hwassgn777', 10);  // Hash the password

    const newUser = new User({
        email: 'testuser2@example.com',
        password: hashedPassword,
        name: 'Test User',
    });

    await newUser.save();
    console.log('User inserted with hashed password');
    mongoose.connection.close(); // Close the connection
}

insertUser().catch((err) => {
    console.error(err);
    mongoose.connection.close();
});
