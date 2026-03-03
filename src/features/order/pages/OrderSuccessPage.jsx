import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Header, Footer } from "@/shared/components/organisms";
import { Button } from "@/shared/components/atoms";
import "./OrderSuccess.css";

const OrderSuccessPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderNumber = searchParams.get("orderNumber");

  if (!orderNumber) {
    return (
      <div className="page">
        <Header />
        <main className="order-success-container">
          <div className="success-card">
            <p>No order information found.</p>
            <Button onClick={() => navigate("/")}>Go to Home</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="page">
      <Header />
      <main className="order-success-container">
        <div className="success-card">
          <div className="success-icon">✓</div>
          <h1>Order Placed Successfully!</h1>
          <p>Thank you for your order.</p>
          
          <div className="order-details">
            <p className="order-number">
              Order Number: <strong>{orderNumber}</strong>
            </p>
            <p className="order-message">
              We'll send you a confirmation email with your order details shortly.
            </p>
          </div>

          <div className="success-actions">
            <Button onClick={() => navigate("/profile")} size="large">
              View Orders
            </Button>
            <Button
              onClick={() => navigate("/")}
              variant="secondary"
              size="large"
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderSuccessPage;
