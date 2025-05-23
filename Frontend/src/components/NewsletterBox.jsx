import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function NewsletterBox() {
  const [email, setEmail] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/api/subscription',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Thank you sir for subscription");
        setEmail(''); // clear input
      } else {
        toast.error(data.error || "This email is already subscribed");
      }
    } catch (error) {
      toast.error("Network error, please try again");
    }
  };

  return (
    <div className='text-center'>
      <p className='font-medium text-2xl text-gray-800'>Subscribe Now & get 10% off</p>
      <p className='text-gray-400 mt-3'>Subscribe Our IntelliMall website</p>

      <form onSubmit={onSubmit} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Enter Your Email'
          className='w-full sm:flex-1 outline-none'
        />
        <button className='bg-black text-white text-xs px-10 py-4' type='submit'>
          Subscribe
        </button>
      </form>

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}

export default NewsletterBox;
