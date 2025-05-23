import React from 'react';
import { assets } from '../assets/assets';
import  NewsletterBox  from '../components/NewsletterBox';

function About() {
  return (
    <div className="text-2xl text-center pt-8 border-t">
      <title text1={'ABOUT'} text2={'US'} />

      <div className="my-10 flex flex-col md:flex-row gap-10">
        <img className="w-full md:max-w-[450px]" src={assets.about_img} alt="" />
    
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Welcome to IntelliMall, your one-stop destination for a seamless and intelligent 
            shopping experience. At IntelliMall, we are dedicated to providing high-quality 
            products across diverse categories, ensuring convenience, affordability, 
            and innovation at your fingertips. Our mission is to redefine online shopping 
            by integrating advanced features like user-friendly interfaces, secure payment methods, 
            and exceptional customer service.
          </p>
          <p>
            Whether you’re searching for the latest trends or 
            everyday essentials, IntelliMall is here to make your shopping journey effortless 
            and enjoyable. We value your trust and strive to exceed your expectations with every visit. 
            Thank you for choosing IntelliMall, where shopping meets intelligence!
          </p>

          <b className="text-gray-800">Our Mission</b>
          <p>
            Our mission at IntelliMall is to make quality products 
            accessible to every corner of Pakistan. We are committed to breaking down geographical 
            barriers by providing a reliable, convenient, and efficient shopping platform that delivers 
            products nationwide. By leveraging cutting-edge technology, seamless logistics, and dedicated 
            customer support, we aim to ensure that customers across all regions of Pakistan can easily browse, 
            purchase, and receive their desired products, no matter where they are. At IntelliMall, we believe in empowering 
            every Pakistani with the convenience of online shopping, ensuring that everyone has access to the products they need, delivered right to their doorstep.
          </p>
        </div>
      </div>

      <div className="text-4xl py-4">
        <title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance</b>
          <p>We ensure the highest quality standards for all our products, giving you peace of mind with every purchase.</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience</b>
          <p>With our user-friendly platform and fast delivery, shopping has never been easier or more convenient.</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service</b>
          <p>Our dedicated support team is always here to help, ensuring a smooth and enjoyable shopping experience.</p>
        </div>
      </div>

      <NewsletterBox />
    </div>
  );
}

export default About;
