import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PlaceOrder from "../pages/PlaceOrder";

const stripePromise = loadStripe("pk_test_51QvMuX09qCkfsHlNf4rTigyhl9J5hUI7GZtjlItnVweNEnsswIGJM1iQabznqXrYPez1OZDuNNaol37M853NOI1X00HdMYauGz");

const PlaceOrderWrapper = () => {
  return (
    <Elements stripe={stripePromise}>
      <PlaceOrder />
    </Elements>
  );
};

export default PlaceOrderWrapper;
