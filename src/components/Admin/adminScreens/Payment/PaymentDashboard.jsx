import React, { useEffect, useState } from "react";

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const PaymentDashboard = () => {
    const [payments, setPayments] = useState([]);
    const [selectedPayment, setSelectedPayment] = useState(null);

    useEffect(() => {
        fetch(`${BACKEND_BASE_URL}/payments/get-payments`)
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setPayments(data.data);
                } else {
                    alert("Failed to load payments");
                }
            })
            .catch((error) => console.error("Error fetching payments:", error));
    }, []);

    const handleRefund = async (paymentId) => {
        if (!window.confirm("Are you sure you want to refund this payment?")) return;

        try {
            const response = await fetch("http://localhost:8080/payments/issue-refund", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ payment_id: paymentId }),
            });

            const data = await response.json();
            if (data.success) {
                alert("✅ Refund Issued Successfully!");
                setPayments(payments.map(payment =>
                    payment.id === paymentId ? { ...payment, status: "Refunded" } : payment
                ));
            } else {
                alert("❌ Refund Failed! Try again.");
            }
        } catch (error) {
            console.error("Refund Error:", error);
            alert("❌ Refund request failed.");
        }
    };

    const handleCapture = async (paymentId, amount) => {
        if (!window.confirm("Are you sure you want to capture this payment?")) return;

        try {
            const response = await fetch(`${BACKEND_BASE_URL}/payments/capture-payment`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ payment_id: paymentId, amount }),
            });

            const data = await response.json();
            if (data.success) {
                alert("✅ Payment Captured Successfully!");
                setPayments(payments.map(payment =>
                    payment.id === paymentId ? { ...payment, status: "Captured" } : payment
                ));
            } else {
                alert("❌ Capture Failed! Try again.");
            }
        } catch (error) {
            console.error("Capture Error:", error);
            alert("❌ Capture request failed.");
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Payment Transactions</h2>
            <table className="min-w-full bg-white border rounded-lg">
                <thead>
                    <tr className="bg-gray-200 text-left">
                        <th className="px-4 py-2">Payment ID</th>
                        <th className="px-4 py-2">Amount</th>
                        <th className="px-4 py-2">Status</th>
                        <th className="px-4 py-2">Date</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map((payment) => (
                        <tr key={payment.id} className="border-t">
                            <td className="px-4 py-2">{payment.id}</td>
                            <td className="px-4 py-2">₹{payment.amount}</td>
                            <td className={`px-4 py-2 ${payment.status === "Refunded" ? "text-red-500" : ""}`}>
                                {payment.status}
                            </td>
                            <td className="px-4 py-2">{payment.created_at}</td>
                            <td className="px-4 py-2 flex gap-2">
                                <button
                                    onClick={() => setSelectedPayment(payment)}
                                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    Details
                                </button>
                                {payment.status !== "Refunded" && payment.status !== "Captured" && (
                                    <button
                                        onClick={() => handleRefund(payment.id)}
                                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                    >
                                        Issue Refund
                                    </button>
                                )}
                                {payment.status === "Failed" && (
                                    <button
                                        onClick={() => handleCapture(payment.id, payment.amount)}
                                        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                                    >
                                        Capture Payment
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedPayment && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg w-[600px]">
                        <h2 className="text-xl font-bold mb-4">Payment Details</h2>
                        <p className="mb-2"><strong>Amount:</strong> ₹ {selectedPayment.amount}</p>
                        <p className="mb-2"><strong>Currency:</strong> INR</p>
                        <p className="mb-2"><strong>Status:</strong> {selectedPayment.status}</p>
                        <p className="mb-2"><strong>Created on:</strong> {selectedPayment.created_at}</p>

                        {selectedPayment.status === "Refunded" && (
                            <>
                                <h3 className="text-lg font-bold mt-4">Refund Details</h3>
                                <p className="mb-2"><strong>Refund ID:</strong> {selectedPayment.refund_id || "--"}</p>
                                <p className="mb-2"><strong>ARN/RRN:</strong> {selectedPayment.bank_rrn || "--"}</p>
                                <p className="mb-2"><strong>Refund Amount:</strong> ₹ {selectedPayment.amount}</p>
                                <p className="mb-2"><strong>Issued on:</strong> Mon Mar 24, 6:05 PM</p>
                            </>
                        )}

                        <h3 className="text-lg font-bold mt-4">Customer Details</h3>
                        <p className="mb-2"><strong>Name:</strong> {selectedPayment.customer.name}</p>
                        <p className="mb-2"><strong>Email:</strong> {selectedPayment.customer.email}</p>
                        <p className="mb-2"><strong>Phone:</strong> {selectedPayment.customer.contact}</p>

                        <h3 className="text-lg font-bold mt-4">Payment Info</h3>
                        <p className="mb-2"><strong>Payment ID:</strong> {selectedPayment.id}</p>
                        <p className="mb-2"><strong>Order ID:</strong> {selectedPayment.order_id || "--"}</p>
                        <p className="mb-2"><strong>Invoice ID:</strong> --</p>
                        <p className="mb-2"><strong>Payment Method:</strong> Visa (card-xxxx1111)</p>

                        <h3 className="text-lg font-bold mt-4">Transaction Fees</h3>
                        <p className="mb-2"><strong>Total Fee:</strong> ₹10.00</p>
                        <p className="mb-2"><strong>Razorpay Fee:</strong> ₹10.00</p>
                        <p className="mb-2"><strong>GST:</strong> ₹0.00</p>

                        <h3 className="text-lg font-bold mt-4">Settlement</h3>
                        <p className="mb-2"><strong>To be deposited by:</strong> Wed, Mar 26, 2025</p>

                        <button
                            onClick={() => setSelectedPayment(null)}
                            className="mt-4 px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PaymentDashboard;
