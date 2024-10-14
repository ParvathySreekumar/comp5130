import React from 'react';
import { useParams } from 'react-router-dom';

const ProductPage = () => {
    const { id } = useParams();

    return (
        <div>
            <header>
                <h1>Product Details</h1>
            </header>
            <main>
                <section>
                    <h2>Product ID: {id}</h2>
                    {/* Detailed info about the product will go here */}
                </section>
            </main>
        </div>
    );
};

export default ProductPage;
