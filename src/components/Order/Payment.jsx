import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import QRCode from "react-qr-code";


const razorPayId = import.meta.env.VITE_RAZORPAY_KEY_ID
const Payment = () => {
  const location = useLocation();
  const product = location.state?.product || {
    name: "Unknown Product",
    price: 0,
    currency: "INR"
  };

  const upiID = "merchant@upi"; 
  const upiURL = `upi://pay?pa=${upiID}&pn=Store&am=${product.price}&cu=${product.currency}`;

  const loadRazorpay = () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => {
      const options = {
        key: razorPayId,
        amount: product.price * 100,
        currency: product.currency,
        name: "KBK Store",
        description: product.name,
        handler: (response) => {
          alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
        },
        theme: { color: "#3399cc" }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    };
    document.body.appendChild(script);
  };

  return (
  
    <div style={{ display: "flex", justifyContent: "center", padding: "50px" }}>
      <div style={{ textAlign: "center", width: "50%" }}>
        <h3>Scan to Pay via UPI</h3>
        <QRCode value={upiURL} size={200} />
        <p>{upiID}</p>
      </div>

      <div style={{ textAlign: "center", width: "50%" }}>
        <h3>Or Pay via Card</h3>
        <button 
          onClick={loadRazorpay} 
          style={{ padding: "10px 20px", fontSize: "18px", cursor: "pointer" }}
        >
          Pay with Razorpay
        </button>
      </div>
    </div>
  );
};

export default Payment;
