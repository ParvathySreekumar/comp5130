import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext to check authentication
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';

const CartPage = () => {
    const { cart, loading, removeFromCart } = useContext(CartContext); // Destructure removeFromCart
    const { isAuthenticated } = useContext(AuthContext); // Get authentication status from AuthContext

    // Show login prompt if not authenticated
    if (!isAuthenticated) {
        return (
            <Container className="mt-5">
                <Alert variant="warning">Please login to access your cart.</Alert>
            </Container>
        );
    }

    if (loading) {
        return <div>Loading cart...</div>;
    }

    // Calculate the total price
    const totalPrice = cart.reduce(
        (acc, item) => acc + item.productId.price * item.quantity,
        0
    );

    return (
        <Container className="mt-5">
            <h2>Your Cart</h2>
            {cart.length === 0 ? (
                <Alert variant="info">Your cart is empty</Alert>
            ) : (
                <>
                    <Row>
                        {cart.map((item) => (
                            <Col md={4} key={item.productId._id}>
                                <Card className="mb-4">
                                    <Card.Img variant="top" src={item.productId.image} />
                                    <Card.Body>
                                        <Card.Title>{item.productId.title}</Card.Title>
                                        <Card.Text>Price: ${item.productId.price}</Card.Text>
                                        <p>Quantity: {item.quantity}</p>
                                        <Button
                                            variant="danger"
                                            onClick={() => removeFromCart(item.productId._id)}
                                        >
                                            Remove
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                    <div className="mt-4">
                        <h4>Total Price: ${totalPrice.toFixed(2)}</h4>
                        <Button variant="success">Proceed to Checkout</Button>
                    </div>
                </>
            )}
        </Container>
    );
};

export default CartPage;
