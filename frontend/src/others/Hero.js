import React from 'react';
import { Button } from 'react-bootstrap';

const Hero = () => {
    return (
        <div className="hero-section" style={{ backgroundImage: 'url(path_to_your_image)', height: '70vh', backgroundSize: 'cover', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white' }}>
            <div className="text-center">
                <h1>Jackets for the Modern Man</h1>
                <Button variant="primary">Discover Now</Button>
            </div>
        </div>
    );
};

export default Hero;
