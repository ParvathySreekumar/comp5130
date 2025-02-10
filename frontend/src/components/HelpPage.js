import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './HelpPage.css'; // Import your custom CSS file

const HelpPage = () => {
    return (
        <Container className="mt-5 help-page">
            <h1 className="mb-4">Help & Support</h1>
            <Row>
                <Col>
                    <section className="help-section">
                        <h2>Refunds</h2>
                        <ul>
                            <li>If you return an item in its original condition or cancel your order, you are eligible for a refund.</li>
                            <li>Refunds will be processed back to your original payment method within the stated refund timeline.</li>
                            <li>
                                For orders paid with a gift card, refunds will be issued as a new digital gift card and sent to the email address associated with the order.
                            </li>
                            <li>
                                If your purchase was made using a combination of a gift card and another payment method, the gift card balance will be refunded first. <strong>Please note:</strong> gift card balances can only be refunded back to a gift card.
                            </li>
                            <li>
                                In special circumstances outlined in our <a href="/return-policy">Return Policy</a>, refunds may be issued through an alternate method, such as an e-gift card.
                            </li>
                            <li>
                                We reserve the right to charge a restocking fee in specific cases or deny refunds to resellers as per our <a href="/terms-and-conditions">Terms and Conditions</a>.
                            </li>
                        </ul>
                    </section>
                    <section className="help-section">
                        <h2>Returning an Item</h2>
                        <p>Items can be returned for free within 30 days of receiving your order.</p>
                        <p>If your order didn’t include a delivery fee, you can also return items at one of our physical store locations.</p>
                    </section>
                    <section className="help-section">
                        <h2>How to Return</h2>
                        <p>Ensure the item is in good condition, with tags attached and in its original packaging.</p>
                        <p>Pack the item securely to avoid any damage during the return process.</p>
                        <p>Refer to our return instructions provided with your order confirmation or visit our website for more details.</p>
                    </section>
                    <section className="help-section">
                        <h2>Exchanging an Item</h2>
                        <p>Ordered the wrong size or color? Exchanges are free within 30 days of receiving your order.</p>
                        <p>Items must be returned in their original condition and packaging for an exchange.</p>
                    </section>
                    <section className="help-section">
                        <h2>How to Exchange an Item</h2>
                        <p>Ensure the item is unused, with tags intact, and in the original packaging.</p>
                        <p>Start the exchange process via our website or app, where you'll get all the necessary details and instructions.</p>
                        <p>Ship the item to the designated drop-off point within 10 days of initiating the exchange.</p>
                        <p>Use the provided exchange label for free shipping.</p>
                    </section>
                </Col>
            </Row>
        </Container>
    );
};

export default HelpPage;
