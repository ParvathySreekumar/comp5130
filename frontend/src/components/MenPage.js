import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const WomenPage = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Fetch products for Women's category
        fetch("https://fakestoreapi.com/products/category/men's clothing")
            .then((response) => response.json())
            .then((data) => setProducts(data))
            .catch((error) => console.error("Error fetching products:", error));
    }, []);

    return (
        <section className="new-arrivals">
            <Container>
                <h2 className="text-center my-5">Men's Clothing</h2>
                <Row>
                    {products.map((product) => (
                        <Col md={4} sm={6} key={product.id} className="mb-4">
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

export default WomenPage;
