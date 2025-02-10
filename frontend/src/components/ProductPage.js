import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import { CartContext } from '../context/CartContext'; // Import the CartContext
import './ProductPage.css'; // Import your custom CSS file

const ProductPage = () => {
    const { id } = useParams(); // Get the product ID from the URL
    const [product, setProduct] = useState(null); // State to hold product details
    const { addToCart } = useContext(CartContext); // Access the addToCart function from CartContext
    const [selectedSize, setSelectedSize] = useState(null); // State for selected size

    useEffect(() => {
        // Fetch product details based on ID
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        fetchProduct();
    }, [id]);

    if (!product) {
        return <div>Loading...</div>; // Show a loading message until the product loads
    }

    const handleAddToCart = async () => {
        if (!selectedSize) {
            alert('Please select a size.');
            return;
        }
        try {
            await addToCart(product.id, 1); // Add 1 quantity of the current product to the cart
            alert('Product added to cart!');
        } catch (error) {
            console.error('Error adding product to cart:', error);
            alert('Failed to add product to cart.');
        }
    };

    // Determine the text above the product title
    const categoryText =
        product.category === "men's clothing"
            ? "Men's Originals"
            : "Women's Originals";

    const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']; // Size options

    return (
        <Container className="mt-5 product-page">
            <Row>
                {/* Image Section */}
                <Col md={6} className="product-image">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="product-image"
                    />
                </Col>

                {/* Details Section */}
                <Col md={6} className="product-details">
                    {/* Category Text */}
                    <p className="category-text">{categoryText}</p>
                    <h2 className="product-title">{product.title}</h2>
                    <h3 className="product-price">${product.price.toFixed(2)}</h3>

                    {/* Size Selector */}
                    <div className="size-selector">
                        <h4>Sizes</h4>
                        <div className="sizes">
                            {sizes.map((size) => (
                                <button
                                    key={size}
                                    className={`size-button ${selectedSize === size ? 'selected' : ''}`}
                                    onClick={() => setSelectedSize(size)}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Sizing Information Box */}
                    <div className="size-info-box">
                        <p>
                            <span className="info-icon">ℹ</span> <strong>True to size.</strong> We recommend ordering your usual size.
                        </p>
                    </div>

                    <p className="product-description"><strong>Details:</strong> {product.description}</p>

                    {/* Add to Cart Button */}
                    <Button variant="primary" className="mt-3" onClick={handleAddToCart}>
                        Add to Cart
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default ProductPage;
