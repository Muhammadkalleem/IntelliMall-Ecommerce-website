import React from 'react'
import { assets } from '../assets/assets'

function Footer() {
  return (
    <div className='flex flex-col sm:grid  grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        <div>
            <img className='mb-5 w-32 'src={assets.logo} alt="" />
            <p className='w-full md:w-2/3 text-gray-600'>
            "Welcome to IntelliMall, your trusted destination for a seamless online shopping experience.
             We are dedicated to providing high-quality products, exceptional customer service, 
             and secure transactions. Explore a world of convenience and reliability, backed by
              our commitment to making your shopping journey enjoyable.
             Stay connected with us and discover exclusive deals, updates, and more

            </p>
        </div>

        <div>
            <p className='text-xl font-medium mb-5 '> COMPANY </p>
            <ul className='flex flex-col gap-1 text-gray-600'> 
             <li>Home</li>
             <li>About us</li>
             <li>Delivery</li>
             <li>Privacy policy</li>
           </ul>
      </div>


       <div>
       <p className='text-xl font-medium mb-5 '> GET IN TOUCH </p>
       <ul className='flex flex-col gap-1 text-gray-600'>
         <li>+92-321-1773514</li>
         <li>kaleemburhan@7gmail.com</li> </ul>
       </div>


       <div className=' px-20 flex items-center justify-center '>
        <hr />
        <p className='py-5 text-sm text-center justify-center'>
            Copyright 2025@IntelliMall.com-All Right Reserved 

        </p>

       </div>

    </div>

  )
}

export default Footer