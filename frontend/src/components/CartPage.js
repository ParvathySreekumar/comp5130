import React, { useEffect, useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { Container, Row, Col, Card, Button, Alert, InputGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CartPage.css'; // Import your custom CSS file


const OrderSummary = ({ totalPrice }) => {
    const taxRate = 0.05; // 5% tax rate
    const shippingCost = 5.0; // Flat shipping cost
    const taxes = (totalPrice * taxRate).toFixed(2);
    const finalTotal = (totalPrice + parseFloat(taxes) + shippingCost).toFixed(2);
    const navigate = useNavigate();

    const handleCheckout = () => {
        navigate('/checkout', { state: { totalPrice } }); // Pass total price as state
    };

    return (
        <div className="order-summary">
            <h3>Order Summary</h3>
            <div className="summary-line">
                <span>Subtotal:</span>
                <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="summary-line">
                <span>Taxes (5%):</span>
                <span>${taxes}</span>
            </div>
            <div className="summary-line">
                <span>Shipping:</span>
                <span>${shippingCost.toFixed(2)}</span>
            </div>
            <hr />
            <div className="summary-total">
                <span>Total:</span>
                <span>${finalTotal}</span>
            </div>
            <Button variant="success" className="checkout-button" onClick={handleCheckout}>
                Proceed to Checkout
            </Button>
        </div>
    );
};

const CartPage = () => {
    const { cart, loading, removeFromCart, updateCartQuantity } = useContext(CartContext); // Added updateCartQuantity
    const { isAuthenticated } = useContext(AuthContext); // Authentication status
    const [enrichedCart, setEnrichedCart] = useState([]); // State for enriched cart items
    const [loadingProducts, setLoadingProducts] = useState(true); // Loading state for product details


    // Debug: Log the cart state before useEffect
    console.log('Cart state:', cart);

    // Fetch product details for cart items
    useEffect(() => {
        console.log('useEffect triggered with cart:', cart); // Debug log inside useEffect
        const fetchProductDetails = async () => {
            setLoadingProducts(true);
            try {
                const enrichedItems = await Promise.all(
                    cart.map(async (item) => {
                        const productResponse = await axios.get(
                            `https://fakestoreapi.com/products/${item.productId}`
                        );
                        return {
                            ...item,
                            product: productResponse.data, // Add product details
                        };
                    })
                );
                setEnrichedCart(enrichedItems);
            } catch (error) {
                console.error('Error fetching product details:', error);
            } finally {
                setLoadingProducts(false);
            }
        };

        if (cart.length) {
            fetchProductDetails();
        }
        else {
            setLoadingProducts(false); // Add this to handle empty carts
        }
    }, [cart]);

    // Show login prompt if not authenticated
    if (!isAuthenticated) {
        return (
            <Container className="mt-5">
                <Alert variant="warning">Please login to access your cart.</Alert>
            </Container>
        );
    }

    // Show loading state
    if (loading || loadingProducts) {
        return <div>Loading cart...</div>;
    }

    // Calculate total price
    const totalPrice = enrichedCart.reduce(
        (acc, item) => acc + (item.product.price || 0) * item.quantity,
        0
    );

    // Handle increment quantity
    const handleIncrement = (productId) => {
        const updatedCart = enrichedCart.map((item) =>
            item.productId === productId
                ? { ...item, quantity: item.quantity + 1 }
                : item
        );
        setEnrichedCart(updatedCart); // Update UI instantly
        updateCartQuantity(productId, updatedCart.find(item => item.productId === productId).quantity); // Sync with backend
    };

    // Handle decrement quantity
    const handleDecrement = (productId) => {
        const updatedCart = enrichedCart.map((item) =>
            item.productId === productId && item.quantity > 1
                ? { ...item, quantity: item.quantity - 1 }
                : item
        );
        setEnrichedCart(updatedCart); // Update UI instantly
        updateCartQuantity(productId, updatedCart.find(item => item.productId === productId).quantity); // Sync with backend
    };


    return (
        <Container className="mt-5">
            <Row>
                <Col md={8}>
                    <h2>Your Cart</h2>
                    {enrichedCart.length === 0 ? (
                        <Alert variant="info">Your cart is empty</Alert>
                    ) : (
                        <>
                            {enrichedCart.map((item) => (
                                <div key={item.product.id} className="cart-item">
                                    {/* Product Image */}
                                    <div className="cart-item-image">
                                        <img
                                            src={item.product.image}
                                            alt={item.product.title}
                                            style={{
                                                width: '150px',
                                                height: '150px',
                                                objectFit: 'contain',
                                            }}
                                        />
                                    </div>

                                    {/* Product Details */}
                                    <div className="cart-item-details">
                                        <h4>{item.product.title}</h4>
                                        <p>Price: ${item.product.price.toFixed(2)}</p>

                                        {/* Quantity and Remove Section */}
                                        <div className="cart-item-quantity-remove">
                                            {/* Quantity Controls */}
                                            <div className="cart-item-quantity">
                                                <InputGroup>
                                                    <Button
                                                        variant="outline-secondary"
                                                        onClick={() => handleDecrement(item.productId)}
                                                        disabled={item.quantity === 1}
                                                    >
                                                        -
                                                    </Button>
                                                    <FormControl
                                                        readOnly
                                                        value={item.quantity}
                                                    />
                                                    <Button
                                                        variant="outline-secondary"
                                                        onClick={() => handleIncrement(item.productId)}
                                                    >
                                                        +
                                                    </Button>
                                                </InputGroup>
                                            </div>

                                            {/* Remove Button */}
                                            <div className="cart-item-remove mt-2">
                                                <Button
                                                    variant="danger"
                                                    onClick={() => removeFromCart(item.productId)}
                                                >
                                                    Remove
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                </Col>
                {enrichedCart.length > 0 && ( // Only show Order Summary if cart has items
                    <Col md={4}>
                        <OrderSummary totalPrice={totalPrice} />
                    </Col>
                )}
            </Row>

        </Container>
    );


};

export default CartPage;
