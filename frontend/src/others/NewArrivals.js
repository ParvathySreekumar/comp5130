import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';

const NewArrivals = () => {
    const [products, setProducts] = useState([]); // State to store product data
    const [loading, setLoading] = useState(true); // State to handle loading

    // Fetch products from the Fake Store API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('https://fakestoreapi.com/products');
                setProducts(response.data.slice(0, 12)); // Limit to 12 products
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Show a loading message while fetching
    if (loading) {
        return (
            <section className="new-arrivals text-center my-5">
                <h2>New Arrivals</h2>
                <p>Loading products...</p>
            </section>
        );
    }

    return (
        <section className="new-arrivals">
            <Container>
                <h2 className="text-center my-5">New Arrivals</h2>
                <Row>
                    {products.map((product) => (
                        <Col md={4} sm={6} key={product.id} className="mb-4">
                            <Card>
                                <Card.Img
                                    variant="top"
                                    src={product.image}
                                    alt={product.title}
                                    style={{ height: '250px', objectFit: 'contain' }}
                                />
                                <Card.Body>
                                    <Card.Title className="text-truncate">{product.title}</Card.Title>
                                    <Card.Text>${product.price.toFixed(2)}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    );
};

export default NewArrivals;
