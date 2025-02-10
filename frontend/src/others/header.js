import React, { useState, useContext } from 'react';
import { Navbar, Nav, Container, Modal, Button, NavDropdown, Form, FormControl } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext
import LoginForm from '../components/LoginForm'; // Import the LoginForm component
import SignupForm from '../components/SignupForm'; // Import the SignupForm component
import '../App.css';

function Header() {
    const { isAuthenticated, user, logout } = useContext(AuthContext); // Access authentication state and logout function
    const [show, setShow] = useState(false); // Modal visibility state
    const [isLogin, setIsLogin] = useState(true); // State to toggle between login and signup
    const [message, setMessage] = useState(''); // Message to display (success or error)
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleClose = () => {
        setShow(false);
        setMessage(''); // Clear any displayed messages when closing the modal
    };

    const handleShow = () => setShow(true); // Function to open modal
    const toggleForm = () => setIsLogin(!isLogin); // Toggle between login and signup

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get('https://fakestoreapi.com/products'); // Fetch products
            const filteredProducts = response.data.filter((product) =>
                product.description.toLowerCase().includes(searchTerm.toLowerCase())
            ); // Filter by description

            navigate('/search-results', { state: { results: filteredProducts } }); // Navigate to SearchResults page
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    return (
        <header>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/">Fashion Store</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/">Home</Nav.Link>
                            <NavDropdown title="Shop" id="shop-dropdown">
                                <NavDropdown.Item as={Link} to="/shop/women">Women</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/shop/men">Men</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link as={Link} to="/help">Help</Nav.Link>
                        </Nav>

                        {/* Search Bar */}
                        <Form className="d-flex me-3" onSubmit={handleSearch}>
                            <FormControl
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{ borderRadius: '50px', padding: '10px 20px', backgroundColor: '#f8f9fa', border: '1px solid #ddd' }}
                            />
                        </Form>

                        {/* Account and Cart links aligned to the right */}
                        <Nav className="ms-auto">
                            {/* <Nav.Link as={Link} to="/cart">Cart</Nav.Link>*/}
                            <Nav.Link as={Link} to="/cart">
                                <FontAwesomeIcon icon={faShoppingCart} size="lg" />
                            </Nav.Link>
                            {isAuthenticated ? (
                                <>
                                    {/* Display user's name or email if logged in */}
                                    <Nav.Link disabled>Welcome, {user?.email || 'User'}</Nav.Link>
                                    <Nav.Link onClick={logout}>Logout</Nav.Link>
                                </>
                            ) : (
                                <Nav.Link onClick={handleShow}>
                                    <FontAwesomeIcon icon={faUser} size="lg" /> {/* Account Icon */}
                                </Nav.Link>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Modal for Login/Signup */}
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{isLogin ? 'Sign In' : 'Sign Up'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {message && (
                        <div className="alert alert-info text-center">{message}</div> // Display feedback messages
                    )}
                    {/* Show Login Form if isLogin is true, else show Signup Form */}
                    {isLogin ? (
                        <LoginForm handleClose={handleClose} setMessage={setMessage} />
                    ) : (
                        <SignupForm handleClose={handleClose} setMessage={setMessage} />
                    )}
                </Modal.Body>
                <Modal.Footer className="justify-content-center">
                    {/* Link for switching between login and signup */}
                    <Button variant="link" onClick={toggleForm}>
                        {isLogin ? 'New User? - Sign Up' : 'Already have an account? - Sign In'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </header>
    );
}

export default Header;
