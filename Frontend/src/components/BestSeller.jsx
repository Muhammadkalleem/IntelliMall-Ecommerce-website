import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';


function BestSeller() {
    const { products } = useContext(ShopContext);
    const [latestProduct, setLatestProduct] = useState([]); // Fixed useState syntax

    useEffect(() => {
        if (products && products.length > 0) {
            setLatestProduct(products.slice(0, 5));
        }
    }, [products]); // Added dependency on products

    return (
        <div className='my-10'>
            <div className='text-center py-8 text-3xl'>
                <Title text1={'BEST'} text2={'SELLER'} />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                We are excited to launch a premium product in our IntelliMall store! This product boasts
                    exceptional quality, and we’re offering it at an exclusive discount. Don’t miss this opportunity
                    to grab the best at a great price!
                </p>
            </div>

            {/** Rendering Products */}
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {latestProduct.map((item, index) => (
                    <ProductItem
                        key={index}
                        id={item._id}
                        image={item.image}
                        name={item.name}
                        price={item.price}
                    />
                ))}
            </div>


        </div>
    );
}



export default BestSeller;
