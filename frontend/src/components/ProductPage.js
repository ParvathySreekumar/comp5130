import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';
import axios from 'axios';
import { CartContext } from '../context/CartContext'; // Import the CartContext

const ProductPage = () => {
    const { id } = useParams(); // Get the product ID from the URL
    const [product, setProduct] = useState(null); // State to hold product details
    const { addToCart } = useContext(CartContext); // Access the addToCart function from CartContext

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
        try {
            await addToCart(product.id, 1); // Add 1 quantity of the current product to the cart
            alert('Product added to cart!');
        } catch (error) {
            console.error('Error adding product to cart:', error);
            alert('Failed to add product to cart.');
        }
    };

    return (
        <Container className="mt-5">
            <Card>
                <Card.Img variant="top" src={product.image} alt={product.title} />
                <Card.Body>
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text>{product.description}</Card.Text>
                    <h5>Price: ${product.price}</h5>
                    <Button variant="primary" onClick={handleAddToCart}>
                        Add to Cart
                    </Button>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default ProductPage;
