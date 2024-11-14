import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const SignupForm = ({ handleClose, setMessage }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();

        if (password !== retypePassword) {
            setMessage("Passwords do not match");
            return;
        }

        try {
            // Send the email and password to the backend for signup
            const response = await axios.post('http://localhost:5000/api/auth/register', {
                email,
                password,
            });
            setMessage(response.data.message);
            handleClose(); // Close modal on successful signup
        } catch (error) {
            setMessage(error.response?.data?.message || 'Signup failed');
        }
    };

    return (
        <Form onSubmit={handleSignup}>
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

            <Form.Group controlId="formRetypePassword" className="mt-3">
                <Form.Label>Retype Password</Form.Label>
                <Form.Control
                    type="password"
                    value={retypePassword}
                    onChange={(e) => setRetypePassword(e.target.value)}
                    placeholder="Retype Password"
                    required
                />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mt-4">
                Register
            </Button>
        </Form>
    );
};

export default SignupForm;
