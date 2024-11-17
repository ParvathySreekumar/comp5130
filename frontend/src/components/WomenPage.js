import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const WomenPage = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Fetch products for Women's category
        fetch("https://fakestoreapi.com/products/category/women's clothing")
            .then((response) => response.json())
            .then((data) => setProducts(data))
            .catch((error) => console.error("Error fetching products:", error));
    }, []);

    return (
        <Container>
            <h2 className="text-center my-5">Women's Clothing</h2>
            <Row>
                {products.map((product) => (
                    <Col md={4} sm={6} key={product.id} className="mb-4">
                        <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <Card>
                                <Card.Img variant="top" src={product.image} />
                                <Card.Body>
                                    <Card.Title>{product.title}</Card.Title>
                                    <Card.Text>{product.price}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default WomenPage;
