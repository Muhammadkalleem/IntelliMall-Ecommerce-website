import React from 'react';
import { assets } from '../assets/assets';

function Contact() {
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t">
        <title text1={'CONTACT'} text2={'US'} />
      </div>

      <div className="my-10 flex flex-col md:flex-row justify-between items-center gap-10 mb-28">
        {/* Image Section */}
        <img className="w-full md:max-w-[480px]" src={assets.contact_img} alt="" />

        {/* Text Section */}
        <div className="flex flex-col justify-center items-start gap-6 md:w-1/2">
          <p className="font-semibold text-xl text-gray-600">Our Store</p>
          <p className="text-gray-500">Tel: (+92) 321 1773514 <br /> Email: kaleemburhan7@gmail.com</p>
          <p className="text-gray-500">Visit to Our IntelliMall store <br /> 4 block Jauharabad</p>
          <p className="font-semibold text-xl text-gray-600">Careers at Forever</p>
          <p className="font-semibold text-xl text-gray-600">Learn More about our Teams</p>
          <button className="bg-black text-white px-6 py-2 rounded-md transition-transform hover:bg-gray-700 hover:scale-105">
            Explore Jobs
          </button>
        </div>
      </div>
    </div>
  );
}

export default Contact;
