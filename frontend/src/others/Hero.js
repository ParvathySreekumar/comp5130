import React from 'react';
import { Button } from 'react-bootstrap';
import image1 from '../images/Coats.jpg'; // Imp
import image2 from '../images/sale.jpg'; // Imp
import image3 from '../images/download.jpg'; // Imp

const Hero = () => {
    return (
        <div
            className="hero-section"
            style={{
                display: 'flex',
                height: '70vh',
                margin: '0 auto', // Center the content

            }}
        >
            {/* Image 1 */}
            <div
                style={{
                    flex: 1, // Take 1/3 of the width
                    backgroundImage: `url(${image1})`, // Use the imported image
                    //backgroundSize: 'cover',
                    backgroundSize: 'contain', // Ensure the entire image fits
                    backgroundRepeat: 'no-repeat', // Avoid repeating the image
                    backgroundPosition: 'center',
                    //height: '100%',
                }}
            ></div>

            {/* Image 2 */}
            <div
                style={{
                    flex: 1, // Take 1/3 of the width
                    backgroundImage: `url(${image2})`, // Replace with your image URL
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '100%',
                }}
            ></div>

            {/* Image 3 */}
            <div
                style={{
                    flex: 1, // Take 1/3 of the width
                    backgroundImage: `url(${image3})`, // Replace with your image URL
                    //backgroundSize: 'cover',
                    backgroundSize: 'contain', // Ensure the entire image fits
                    backgroundRepeat: 'no-repeat', // Avoid repeating the image
                    backgroundPosition: 'center',
                    //height: '100%',
                }}
            ></div>
        </div>
    );
};


export default Hero;
