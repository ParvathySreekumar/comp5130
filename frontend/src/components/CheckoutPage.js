import React from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
    // Retrieve state passed from CartPage
    const location = useLocation();
    const { totalPrice: cartTotalPrice = 0 } = location.state || {}; // Fallback to 0 if no state
    const navigate = useNavigate();

    // Calculate Taxes, Shipping, Promo, and Final Total
    const taxes = cartTotalPrice * 0.05; // 5% tax
    const shipping = 5.0; // Flat $5 shipping
    const promoDiscount = 0.0; // Promo discount
    const finalTotal = cartTotalPrice + taxes + shipping - promoDiscount;

    // Place Order Handler
    const handlePlaceOrder = () => {
        navigate('/order-confirmation'); // Navigate to the order confirmation page
    };

    // Calculate Estimated Delivery Date
    const estimatedDeliveryDate = new Date();
    estimatedDeliveryDate.setDate(estimatedDeliveryDate.getDate() + 5); // Add 5 days to current date
    const formattedDeliveryDate = estimatedDeliveryDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <Container className="mt-5">
            <h2>Checkout</h2>
            <Row>
                <Col md={8}>
                    <Card className="mb-4">
                        <Card.Body>
                            <h4>Shipping Details</h4>
                            <Form>
                                <Form.Group controlId="formName">
                                    <Form.Label>Full Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter your name" />
                                </Form.Group>
                                <Form.Group controlId="formAddress" className="mt-3">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control type="text" placeholder="Enter your address" />
                                </Form.Group>
                                <Form.Group controlId="formCity" className="mt-3">
                                    <Form.Label>City</Form.Label>
                                    <Form.Control type="text" placeholder="Enter your city" />
                                </Form.Group>
                                <Form.Group controlId="formPostalCode" className="mt-3">
                                    <Form.Label>Postal Code</Form.Label>
                                    <Form.Control type="text" placeholder="Enter your postal code" />
                                </Form.Group>
                                <Form.Group controlId="formCountry" className="mt-3">
                                    <Form.Label>Country</Form.Label>
                                    <Form.Control type="text" placeholder="Enter your country" />
                                </Form.Group>
                            </Form>
                        </Card.Body>
                    </Card>
                    {/* Payment Method */}
                    <Card className="mb-4">
                        <Card.Body>
                            <h4>Payment Method</h4>
                            <p>Cash on Delivery</p>
                            <h5>Estimated Delivery Date</h5>
                            <p>{formattedDeliveryDate}</p>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <h4>Order Summary</h4>
                            {/* Display order breakdown */}
                            <p>Items Total: ${cartTotalPrice.toFixed(2)}</p>
                            <p>Taxes (5%): ${taxes.toFixed(2)}</p>
                            <p>Shipping: ${shipping.toFixed(2)}</p>
                            <p>Promo: ${promoDiscount.toFixed(2)}</p>
                            <hr />
                            <h5>Total: ${finalTotal.toFixed(2)}</h5>
                            <Button
                                variant="success"
                                className="mt-3"
                                onClick={handlePlaceOrder} // Navigate on click
                            >
                                Place Order
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default CheckoutPage;
