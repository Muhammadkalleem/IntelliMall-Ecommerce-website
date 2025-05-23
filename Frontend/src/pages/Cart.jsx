import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";
import { GetProduct } from "../lib/productApi";

function Cart() {
  const { currency, cartitem, updataQuality, navigate } =
    useContext(ShopContext);

  const [cartdata, setcartdata] = useState([]);

  const [products, setProducts] = useState([]);

  const getProduct = async () => {
    try {
      const response = await GetProduct();
      setProducts(response?.data?.products);
    } catch (error) {
      console.error("Get Product failed:", error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  useEffect(() => {
    const tempdata = [];
    for (const items in cartitem) {
      for (const item in cartitem[items]) {
        if (cartitem[items][item] > 0) {
          tempdata.push({
            _id: items,
            size: item,
            quality: cartitem[items][item],
          });
        }
      }
    }
    setcartdata(tempdata);
  }, [cartitem]);

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <title />
      </div>

      <div>
        {cartdata?.map((item, index) => {
          // Added parentheses for `map`
          const productdata = products?.find(
            (product) => product?._id === item?._id
          );

          return (
            <div
              key={index + 1}
              className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
              <div className="flex items-start gap-6">
                <img
                  className="w-10 sm:w-20"
                  src={productdata?.image[0]}
                  alt=""
                />
              </div>
              <div>
                <p className="text-xs sm:text-lg font-medium">
                  {productdata?.name}
                </p>
                <div className="flex items-center gap-5 mt-2">
                  <p>
                    {currency}
                    {productdata?.price}
                  </p>
                  <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
                    {item.size}
                  </p>
                </div>
              </div>
              <input
                onChange={(e) =>
                  e.target.value === "" || e.target.value === "0"
                    ? null
                    : updataQuality(item._id, item.size, Number(e.target.value))
                }
                className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                type="number"
                min={1}
                defaultValue={item.quality}
              />
              <img
                onClick={() => updataQuality(item._id, item.size, 0)}
                className="cursor-pointer w-4 mr-4 sm:w-5"
                src={assets.bin_icon}
                alt=""
              />
            </div>
          );
        })}
      </div>
      <div className="flex  justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button
              onClick={() =>
                navigate("/place-order", { state: { cart: cartdata } })
              }
              className="bg-black text-white text-sm px-8 py-3 mt-3"
              disabled={products.length === 0}
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
