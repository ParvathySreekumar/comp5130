import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const NewArrivals = () => {
    const [products, setProducts] = useState([]); // State to store product data
    const [loading, setLoading] = useState(true); // State to handle loading

    // Fetch products from the Fake Store API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Fetch women's clothing
                const womenResponse = await axios.get(
                    "https://fakestoreapi.com/products/category/women's clothing"
                );
                // Fetch men's clothing
                const menResponse = await axios.get(
                    "https://fakestoreapi.com/products/category/men's clothing"
                );

                // Combine both results
                const combinedProducts = [...womenResponse.data, ...menResponse.data].slice(0, 8);
                setProducts(combinedProducts); // Limit to 12 products
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
                        <Col lg={3} md={4} sm={5} key={product.id} className="mb-4">
                            <div className="custom-card">
                                {/* Product Image Section */}
                                <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <div className="custom-card-image">
                                        <img src={product.image} alt={product.title} />
                                    </div>
                                </Link>

                                {/* Product Info Section */}
                                <div className="custom-card-info">
                                    <h4 className="custom-card-title">{product.title}</h4>
                                    <div className="custom-card-price">
                                        ${product.price.toFixed(2)}
                                    </div>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    );
};

export default NewArrivals;
