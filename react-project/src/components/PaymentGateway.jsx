import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Link } from "react-router-dom";

// Load Stripe public key
const stripePromise = loadStripe("pk_test_51QtU6ULNe2tfZXg1Vw39ucpbdWcAYpjfpDOarPwftjWuEvX2iUexOJHFoOSKoxBGJy0pSFqO2DGuYKhKiRrPRL7p000Dy81qLQ");

const CheckoutForm = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [msg, setMsg] = useState('');

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setMsg("");

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (error) {
      setMsg("Payment failed. Please check your details.");
      setLoading(false);
      return;
    }

    console.log("PaymentMethod ID:", paymentMethod.id);
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Phone:", phone);

    setLoading(false);
    setMsg("Payment successful!");
  };

  return (
    <div className="mx-auto my-20 p-6 bg-white rounded-lg shadow-md w-130 h-170">
      <h1 className="text-2xl font-bold text-center text-gray-800 mt-10">Complete Your Payment</h1>

      <form className="w-3/4 mx-auto py-10" onSubmit={handleSubmit}>

        {/* Name Field */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">Full Name</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Phone Field */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">Phone</label>
          <input
            type="tel"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
            placeholder="(XXX) XXX-XXXX"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        {/* Card Information */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-1">Card Details</label>
          <div className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none bg-white">
            <CardElement className="p-2" options={{ placeholder: "Card Number", style: { base: { fontSize: "16px", color: "#374151", "::placeholder": { color: "#9CA3AF", }, }, invalid: { color: "#EF4444", }, }, }} />
          </div>
        </div>

        {/* Error or Success Message */}
        {msg && (
          <div className={`p-3 text-center rounded-lg font-medium text-sm border-l-4 ${msg.includes("failed") ? "bg-red-100 text-red-700 border-red-700" : "bg-green-100 text-green-700 border-green-700"}`}>
            {msg.includes("failed") ? "⚠️" : "✅"} {msg}
          </div>
        )}
        <br />

        {/* Payment Button */}
        <button
          type="submit"
          disabled={!stripe || loading}
          className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition"
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
        <div className="justify-end mt-3 text-sm flex">
          <p className='mr-1'>Go back to </p>
          <Link to="/cart" className="text-teal-600 hover:underline">cart</Link>
        </div>
      </form>
    </div>
  );
};

const PaymentPage = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default PaymentPage;
