import React, { useContext, useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Searchbar = () => {
    const { search, setsearch, showsearch, setshowsearch, setProducts } = useContext(ShopContext);
    const [visible, setVisible] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setVisible(location.pathname.includes('collection') && showsearch);
    }, [location, showsearch]);

    const handleSearch = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("User not authenticated.");
                return;
            }

            const { data } = await axios.post(
                'http://localhost:4000/api/search/search',
                { query: search }, 
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setProducts(data.product ? [data.product] : []);
        } catch (error) {
            console.error("Error searching products:", error);
        }
    };

    const handleVoiceSearch = async () => {
        try {
            // Check for browser compatibility for SpeechRecognition
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (!SpeechRecognition) {
                console.error("Speech Recognition API is not supported in this browser.");
                return;
            }

            const recognition = new SpeechRecognition();
            recognition.lang = 'en-US';
            recognition.start();

            recognition.onresult = async (event) => {
                const voiceText = event.results[0][0].transcript;
                console.log('Voice input:', voiceText);
                setsearch(voiceText); // Set the voice input to search

                // Call your voice-search API
                const token = localStorage.getItem("token");
                if (!token) {
                    console.error("User not authenticated.");
                    return;
                }

                const { data } = await axios.post(
                    'http://localhost:4000/api/products/voice-search', // Assuming voice-search endpoint
                    { query: voiceText },
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                setProducts(data.products || []); // Update the products state with the results
            };

            recognition.onerror = (error) => {
                console.error("Voice recognition error:", error);
            };
        } catch (error) {
            console.error("Voice Search Error:", error);
        }
    };

    return showsearch && visible ? (
        <div className="border-t border-b bg-gray-50 text-center">
            <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
                <input
                    value={search}
                    onChange={(e) => setsearch(e.target.value)}
                    type="text"
                    placeholder="Search"
                    className="flex-1 outline-none bg-inherit text-sm"
                />
                <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-1 rounded">
                    Search
                </button>

                {/* 🔥 Voice Search Button */}
                <button onClick={handleVoiceSearch} className="bg-green-500 text-white px-2 py-1 ml-2 rounded">
                    🎤
                </button>

                <img className="w-4 ml-2" src={assets.search_icon} alt="Search" />
            </div>
            <img
                src={assets.cross_icon}
                className="inline w-3 cursor-pointer"
                onClick={() => setshowsearch(false)}
                alt="Close"
            />
        </div>
    ) : null;
};

export default Searchbar;
