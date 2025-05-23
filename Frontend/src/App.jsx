import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import Collection from './pages/Collection';
import About from './pages/About';
import Cart from './pages/Cart';
import PlaceOrder from './pages/PlaceOrder';
import Product from './pages/Product';
import Login from './pages/Login';
import Orders from './pages/Orders';
import Contact from './pages/Contact';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Searchbar from './components/Searchbar';
import { BrowserRouter as Router } from 'react-router-dom';
import ShopContextProvider from './context/ShopContext';
import { ToastContainer, toast } from 'react-toastify';
import Chatbot from './pages/Chatbot';
import HomePage from './components/HomePage';
import 'react-toastify/dist/ReactToastify.css'
import StripePaymentForm from './components/StripePaymentForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PlaceOrderWrapper from './components/PlaceOderWrapper';
// ✅ 1. Define stripePromise using your Stripe publishable key
const stripePromise = loadStripe("pk_test_51QvMuX09qCkfsHlNf4rTigyhl9J5hUI7GZtjlItnVweNEnsswIGJM1iQabznqXrYPez1OZDuNNaol37M853NOI1X00HdMYauGz");




function App() {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
    
      <Navbar />
      <ToastContainer/>
      
      <Searchbar/>
   
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/collection' element={<Collection />} />
        <Route path='/about' element={<About />} />
        <Route path='/chatbot' element={<Chatbot />} />
        <Route path='/HomePage' element={<HomePage />} />
      
    
    

        <Route path='/cart' element={<Cart />} />
        <Route path="/place-order" element={<PlaceOrderWrapper />} />

      
        <Route path="/place-order" element={<Elements stripe={stripePromise}>
    <PlaceOrder />
  </Elements>
} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path='/product/:productid' element={<Product />} />
        <Route path='/login' element={<Login />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/contact' element={<Contact />} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
