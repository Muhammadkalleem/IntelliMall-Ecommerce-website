import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const [search, setsearch] = useState("");
  const [showsearch, setshowsearch] = useState(false);
  const [cartitem, setcartitem] = useState({});
  const navigate = useNavigate();

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartitem) {
      for (const item in cartitem[items]) {
        try {
          if (cartitem[items][item] > 0) {
            totalCount += cartitem[items][item];
          }
        } catch (error) {
          console.error("Error in getCartCount:", error); // Added error logging
        }
      }
    }
    return totalCount;
  };

  const updataQuality = async (itemId, size, quality) => {
    let cartData = structuredClone(cartitem);
    cartData[itemId] = cartData[itemId] || {}; // Ensure itemId exists
    cartData[itemId][size] = quality;
    setcartitem(cartData);
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartitem) {
      let iteminfo = products.find((product) => product._id === items);
      if (!iteminfo) continue; // Ensure iteminfo exists
      for (const item in cartitem[items]) {
        try {
          if (cartitem[items][item] > 0) {
            totalAmount += iteminfo.price * cartitem[items][item];
          }
        } catch (error) {
          console.error("Error in getCartAmount:", error); // Added error logging
        }
      }
    }
    return totalAmount;
  };

  const addcart = async (itemId, size) => {
    let cartData = structuredClone(cartitem); // Corrected variable name to 'cartitem'
    if (!size) {
      toast.error("Select Product size"); // Replaced toast with console for this example
      return;
    }
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setcartitem(cartData);
  };

  useEffect(() => {
    console.log(cartitem);
  }, [cartitem]);

  useEffect(() => {
    console.log(addcart);
  }, [addcart]);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setsearch,
    showsearch,
    setshowsearch,
    cartitem,
    addcart,
    getCartCount,
    updataQuality,
    getCartAmount,
    navigate,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
