import React from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../App.css';

const SearchResults = () => {
    const location = useLocation();
    const { results } = location.state || { results: [] };

    if (!results.length) {
        return <Container className="mt-5"><h3>No products match your search.</h3></Container>;
    }

    return (
        <section className="new-arrivals">
            <Container>
                <h3 className="text-center my-5">Search Results</h3>
                <Row>
                    {results.map((product) => (
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

export default SearchResults;
