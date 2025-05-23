import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price }) => {
    const { currency } = useContext(ShopContext);

    // Handle both array and string image types
    const displayImage = Array.isArray(image) ? image[0] : image;

    return (
        <Link to={`/product/${id}`} className='text-gray-700 cursor-pointer'>
            <div className='overflow-hidden'>
                <img
                    className='hover:scale-110 transition ease-in-out'
                    src={displayImage || '/placeholder.jpg'} // fallback image if missing
                    alt={name}
                />
            </div>
            <p className='pt-3 pb-1 text-sm'>
                {name}
            </p>
            <p className='font-medium text-sm'>
                {currency}{price}
            </p>
        </Link>
    );
};

export default ProductItem;
