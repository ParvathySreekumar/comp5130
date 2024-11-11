import React, { useState } from 'react';
import { Navbar, Nav, Container, Modal, Button, Form } from 'react-bootstrap';
import LoginForm from '../components/LoginForm'; // Import the LoginForm component

function Header() {
    const [show, setShow] = useState(false); // Modal visibility state
    const [message, setMessage] = useState(''); // Message to display

    const handleClose = () => setShow(false); // Function to close modal
    const handleShow = () => setShow(true);  // Function to open modal

    return (
        <header>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/">Fashion Store</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/shop">Shop</Nav.Link>
                            <Nav.Link href="/about">About Us</Nav.Link>
                            <Nav.Link href="/contact">Contact Us</Nav.Link>
                        </Nav>

                        {/* Account button aligned to the right */}
                        <Nav className="ms-auto">
                            <Nav.Link onClick={handleShow}>Account</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Modal for Login */}
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Sign In</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Here's where you include the LoginForm component */}
                    <LoginForm handleClose={handleClose} setMessage={setMessage} />
                </Modal.Body>
                <Modal.Footer className="justify-content-center">
                    {/* Link for sign up */}
                    <a href="/signup" style={{ textDecoration: 'none' }}>New User? - Sign Up</a>
                </Modal.Footer>
            </Modal>
        </header>
    );
}

export default Header;
