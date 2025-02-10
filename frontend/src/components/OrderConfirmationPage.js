import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const OrderConfirmationPage = () => {
    const navigate = useNavigate();

    return (
        <Container className="text-center mt-5">
            <div className="celebration-icon">
                🎉 {/* Celebration symbol */}
            </div>
            <h2>Order Placed Successfully!</h2>
            <p>Your order has been placed and is being processed.</p>
            <Button
                variant="primary"
                className="mt-4"
                onClick={() => navigate('/')} // Navigate to homepage
            >
                Click to Continue Shopping
            </Button>
        </Container>
    );
};

export default OrderConfirmationPage;
