import { useState } from "react";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { OrderPlace } from "../lib/orderApi";
import StripePaymentForm from "../components/StripePaymentForm";

function PlaceOrder() {
  const [method, setMethod] = useState("cod");
  const [showStripeForm, setShowStripeForm] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const { cart } = location.state || { cart: [] };

  const cartData = cart?.map((item) => ({
    productid: item?._id,
    size: item?.size,
    quantity: item?.quality,
  }));

  console.log(cartData);

  const placeOrder = async () => {
    if (cart.length === 0) {
      toast.error("No products in cart");
      return;
    }
    try {
      const response = await OrderPlace(cartData);
      if (response.status === 200) {
        toast.success("Order placed successfully");
        navigate("/orders");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
      {/* Left Side */}
      <div className="flex flex-col w-full gap-4 sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <title />
        </div>

        <div className="flex gap-3">
          <input type="text" placeholder="First-name" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
          <input type="text" placeholder="Last-name" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
        </div>
        <input type="email" placeholder="Email address" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
        <input type="text" placeholder="Street number" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />

        <div className="flex gap-3">
          <input type="text" placeholder="City" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
          <input type="text" placeholder="State" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
        </div>

        <div className="flex gap-3">
          <input type="number" placeholder="Zipcode" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
          <input type="text" placeholder="Country" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
        </div>
        <input type="number" placeholder="Phone number" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
      </div>

      {/* Right Side */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>

        {/* Payment Method Selection */}
        <div className="mt-12">
          <div className="flex gap-3 flex-col lg:flex-row">
            {/* Stripe */}
            <div
              onClick={() => {
                setMethod("stripe");
                setShowStripeForm(true);
              }}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <div className="w-3.5 h-3.5 border rounded-full">
                {method === "stripe" && <div className="bg-green-400 w-full h-full rounded-full" />}
              </div>
              <img className="h-5 mx-4" src={assets.stripe_logo} alt="Stripe" />
            </div>

            {/* Easypaisa */}
            <div
              onClick={() => {
                setMethod("Easypaisa");
                setShowStripeForm(false);
              }}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p className={`w-3.5 h-3.5 border rounded-full ${method === "Easypaisa" ? "bg-green-400" : ""}`} />
              <img className="h-5 mx-4" src={assets.easypaisa} alt="Easypaisa" />
            </div>

            {/* COD */}
            <div
              onClick={() => {
                setMethod("cod");
                setShowStripeForm(false);
              }}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p className={`w-3.5 h-3.5 border rounded-full ${method === "cod" ? "bg-green-400" : ""}`} />
              <p className="text-gray-500 text-sm font-medium mx-4">CASH ON DELIVERY</p>
            </div>
          </div>
        </div>

        {/* ✅ Stripe Payment Form Display */}
        {showStripeForm && (
          <div className="mt-8">
            <StripePaymentForm
              cartData={cartData}
              onSuccess={() => {
                toast.success("✅ Payment Success. Placing order...");
                placeOrder();
              }}
            />
          </div>
        )}

        {/* PLACE ORDER BUTTON */}
        <div className="w-full text-end mt-8">
          <button
            onClick={method === "stripe" ? null : placeOrder}
            disabled={method === "stripe"}
            className={`px-16 py-3 text-sm ${method === "stripe" ? "bg-gray-400 cursor-not-allowed" : "bg-black text-white"}`}
          >
            PLACE ORDER
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrder;
