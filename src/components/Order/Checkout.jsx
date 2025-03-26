import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();

  // Static product details
  const product = {
    name: "Wireless Headphones",
    price: 150,
    currency: "INR",
    description: "High-quality wireless headphones with noise cancellation."
  };

  const handleProceedToPayment = () => {
    // Redirect to payment page with product details
    navigate("/payment", { state: { product } });
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>🛒 Checkout</h2>
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <h2>💰 {product.currency} {product.price}</h2>
      <button 
        onClick={handleProceedToPayment} 
        style={{ padding: "10px 20px", fontSize: "18px", cursor: "pointer" }}
      >
        Proceed to Payment
      </button>
    </div>
  );
};

export default Checkout;
