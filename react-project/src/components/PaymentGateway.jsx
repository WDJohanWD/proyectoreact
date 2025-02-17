import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

// Cargar la clave pública de Stripe
const stripePromise = loadStripe('pk_test_51QtU6ULNe2tfZXg1Vw39ucpbdWcAYpjfpDOarPwftjWuEvX2iUexOJHFoOSKoxBGJy0pSFqO2DGuYKhKiRrPRL7p000Dy81qLQ');

const CheckoutForm = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    // Aquí deberías enviar la información a tu backend
    console.log("PaymentMethod ID:", paymentMethod.id);
    console.log("Nombre:", name);
    console.log("Email:", email);
    console.log("Teléfono:", phone);

    setLoading(false);
    alert("Pago completado con éxito");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-xl">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Realiza tu pago
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Campo de nombre */}
          <div className="mb-4">
            <label htmlFor="name" className="text-gray-700 mb-2 block font-medium">
              Nombre Completo
            </label>
            <input
              id="name"
              type="text"
              className="w-full p-3 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Ingresa tu nombre completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Campo de correo electrónico */}
          <div className="mb-4">
            <label htmlFor="email" className="text-gray-700 mb-2 block font-medium">
              Correo Electrónico
            </label>
            <input
              id="email"
              type="email"
              className="w-full p-3 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="ejemplo@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Campo de teléfono */}
          <div className="mb-4">
            <label htmlFor="phone" className="text-gray-700 mb-2 block font-medium">
              Teléfono
            </label>
            <input
              id="phone"
              type="tel"
              className="w-full p-3 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="(XXX) XXX-XXXX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          {/* Campo de tarjeta */}
          <div className="mb-6">
            <label htmlFor="card-element" className="text-gray-700 mb-2 block font-medium">
              Información de la tarjeta
            </label>
            <CardElement
              id="card-element"
              className="p-3 border-2 border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Botón de pago */}
          <button
            disabled={!stripe}
            type="submit"
            className="w-full py-3 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200"
          >
            {loading ? "Cargando..." : "Pagar"}
          </button>
          
        </form>
      </div>
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
