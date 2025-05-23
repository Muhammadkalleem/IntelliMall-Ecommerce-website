import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductItem from './ProductItem';

export default function RelatedProduct({ productId }) {  // ✅ accept prop
    const [related, setRelated] = useState([]);

    useEffect(() => {
        const fetchRelatedProducts = async () => {
            try {
                const res = await axios.get(`http://localhost:4000/api/products/related/${productId}`);  // ✅ FIXED
                console.log('Related products fetched:', res.data);  // ✅ Debug
                setRelated(res.data);
            } catch (error) {
                console.error('Error fetching related products', error);
            }
        };

        if (productId) {  // ✅ FIXED
            fetchRelatedProducts();
        }
    }, [productId]);  // ✅ FIXED

    return (
        <div className='my-24'>
            <div className='text-center text-3xl py-2 '>
                <h2>RELATED PRODUCTS</h2>
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 '>
                {related && related.length > 0 ? (
                    related.map((item, index) => (
                        <ProductItem
                            key={item._id || index}
                            id={item._id}
                            image={item.image}
                            name={item.name}
                            price={item.price}
                        />
                    ))
                ) : (
                    <p className="text-center col-span-full">No related products found.</p>
                )}
            </div>
        </div>
    );
}
