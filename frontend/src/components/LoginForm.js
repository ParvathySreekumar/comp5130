import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext
import { CartContext } from '../context/CartContext';

const LoginForm = ({ handleClose, setMessage }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setIsAuthenticated } = useContext(AuthContext); // Access AuthContext
    const { login } = useContext(AuthContext); // Access login function from context
    const { fetchCart } = useContext(CartContext); // Use fetchCart from CartContext

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                email,
                password,
            });
            console.log('Login Response:', response.data); // Log response
            login(response.data.token, { email }); // Pass token and user info
            localStorage.setItem('token', response.data.token); // Store JWT
            console.log('Token saved to localStorage'); // Log success
            fetchCart(); // Fetch the cart immediately after login
            setMessage(response.data.message);
            console.log('Message set successfully'); // Log success

            // Update global authentication state
            //setIsAuthenticated(true); commenting cuz login already updates this

            handleClose(); // Close modal on successful login
        } catch (error) {
            console.error('Login Error:', error.response?.data || error.message);
            console.error('Error Details:', error);
            console.error('Error Response:', error.response);
            setMessage(error.response?.data?.message || 'Login failed');
            console.log('Message set to error'); // Log success
        }
    };

    return (
        <Form onSubmit={handleLogin}>
            <Form.Group controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email"
                    required
                />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mt-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mt-4">
                Continue
            </Button>
        </Form>
    );
};

export default LoginForm;
