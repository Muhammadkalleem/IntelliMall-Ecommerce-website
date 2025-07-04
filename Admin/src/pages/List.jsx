import React, { useEffect, useState } from 'react';
import { backendurl, currency } from '../App';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function List({ token }) {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendurl + "/api/product/list", {
        headers: { token }, // Added token in headers
      });
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendurl + "/api/product/remove",
        { id },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        // Optimistically remove the product without re-fetching the list
        setList((prevList) => prevList.filter((item) => item._id !== id));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className='mb-2'>All Products List</p>
      <div className='flex flex-col gap-2'>
        {/* List Table Title */}
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-small'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>

        {/* Product List */}
        {list.map((item, index) => (
          <div
            className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-small'
            key={index}
          >
            <img src={item.image?.[0] || 'fallback_image_url'} alt={item.name} className='w-16 h-16 object-cover' />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>
              {currency} {item.price}
            </p>
            <p
              onClick={() => removeProduct(item._id)}
              className='text-right md:text-center cursor-pointer text-lg text-red-500 hover:text-red-700'
            >
              X
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
