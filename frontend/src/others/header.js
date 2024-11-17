import React, { useState } from 'react';
import { Navbar, Nav, Container, Modal, Button, Form, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LoginForm from '../components/LoginForm'; // Import the LoginForm component
import SignupForm from '../components/SignupForm'; // Import the SignupForm component

function Header() {
    const [show, setShow] = useState(false); // Modal visibility state
    const [isLogin, setIsLogin] = useState(true); // State to toggle between login and signup
    const [message, setMessage] = useState(''); // Message to display

    const handleClose = () => setShow(false); // Function to close modal
    const handleShow = () => setShow(true);  // Function to open modal

    const toggleForm = () => setIsLogin(!isLogin); // Toggle between login and signup

    return (
        <header>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/">Fashion Store</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            {/*<Nav.Link href="/shop">Shop</Nav.Link>*/}
                            <NavDropdown title="Shop" id="shop-dropdown">
                                <NavDropdown.Item as={Link} to="/shop/women">Women</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/shop/men">Men</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href="/about">About Us</Nav.Link>
                            <Nav.Link href="/contact">Contact Us</Nav.Link>
                        </Nav>

                        {/* Account button aligned to the right */}
                        <Nav className="ms-auto">
                            <Nav.Link href="/cart">Cart</Nav.Link> {/* Add Cart link */}
                            <Nav.Link onClick={handleShow}>Account</Nav.Link>
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
