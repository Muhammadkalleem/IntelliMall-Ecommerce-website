import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";

const StripePaymentForm = ({ cartData, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  // Calculate total amount from cart
  const totalAmount = cartData.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Call backend to create payment intent
      const response = await fetch("http://localhost:4000/api/payment/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({  cartData }), // ✅ use real amount
      
      });
      console.log('Payment intent Response',response)

      const { clientSecret } = await response.json();
      if (!clientSecret) {
        alert("❌ clientSecret not found in backend response");
        setLoading(false);
        return;
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        alert("Payment failed: " + result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        alert("Payment successful");
        onSuccess(); // ✅ call order placement function
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed due to an error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handlePayment} className="mt-4 border p-4 rounded-md">
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#32325d",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#fa755a",
            },
          },
        }}
      />
      <button
        type="submit"
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
        disabled={!stripe || loading}
      >
        {loading ? "Processing..." : `Pay $${totalAmount.toFixed(2)}`}
      </button>
    </form>
  );
};

export default StripePaymentForm;
