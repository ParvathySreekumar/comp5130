import React from 'react';
import { Button } from 'react-bootstrap';

const Hero = () => {
    return (
        <div className="hero-section" style={{
            backgroundImage: 'url(https://media.istockphoto.com/id/1398610798/photo/young-woman-in-linen-shirt-shorts-and-high-heels-pointing-to-the-side-and-talking.jpg?s=612x612&w=0&k=20&c=JULY1xsUtiur9QPMxqrzgC2VbnhuT4dSnHWcpFQnuAQ=)',
            height: '70vh',
            backgroundSize: 'contain',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white'
        }}>
            <div className="text-center">
                <h1>Rediscover Fashion</h1>
                <Button variant="primary">Discover Now</Button>
            </div>
        </div>
    );
};

export default Hero;
