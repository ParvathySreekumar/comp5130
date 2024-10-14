import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const products = [
    { id: 1, name: "adidas X Pop Polo Shirt", price: "$69.99", image: "path_to_image" },
    { id: 2, name: "adidas X Pop TTX Vintage", price: "$89.99", image: "path_to_image" },
    { id: 3, name: "adidas X Pop Beckenbauer Track Jacket", price: "$120.00", image: "path_to_image" },
    // Add more products here
];

const NewArrivals = () => {
    return (
        <section className="new-arrivals">
            <Container>
                <h2 className="text-center my-5">New Arrivals</h2>
                <Row>
                    {products.map((product) => (
                        <Col md={4} sm={6} key={product.id} className="mb-4">
                            <Card>
                                <Card.Img variant="top" src={product.image} />
                                <Card.Body>
                                    <Card.Title>{product.name}</Card.Title>
                                    <Card.Text>{product.price}</Card.Text>
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
