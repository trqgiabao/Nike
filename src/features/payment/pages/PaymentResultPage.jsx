import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { verifyVNPayPayment } from "@/features/payment/services/PaymentService";
import { Header, Footer } from "@/shared/components/organisms";
import { Button } from "@/shared/components/atoms";
import "./PaymentResult.css";

const PaymentResultPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    verifyPayment();
  }, []);

  const verifyPayment = async () => {
    try {
      const queryString = searchParams.toString();
      const data = await verifyVNPayPayment(queryString);
      setResult(data);
    } catch (err) {
      setResult({
        success: false,
        message: err.message || "Verification failed",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="page">
        <Header />
        <main className="payment-result-container">
          <div className="result-card">
            <h1>Verifying Payment...</h1>
            <p>Please wait while we verify your payment.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="page">
      <Header />
      <main className="payment-result-container">
        <div className="result-card">
          {result?.success ? (
            <>
              <div className="result-icon success">✓</div>
              <h1>Payment Successful!</h1>
              <p>Your payment has been processed successfully.</p>
              {result.orderNumber && (
                <p className="order-info">
                  Order Number: <strong>{result.orderNumber}</strong>
                </p>
              )}
              <div className="result-actions">
                <Button
                  onClick={() =>
                    navigate(`/order-success?orderNumber=${result.orderNumber}`)
                  }
                  size="large"
                >
                  View Order Details
                </Button>
                <Button
                  onClick={() => navigate("/")}
                  variant="secondary"
                  size="large"
                >
                  Continue Shopping
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="result-icon error">✕</div>
              <h1>Payment Failed</h1>
              <p>{result?.message || "Something went wrong with your payment."}</p>
              <div className="result-actions">
                <Button onClick={() => navigate("/cart")} size="large">
                  Back to Cart
                </Button>
                <Button
                  onClick={() => navigate("/")}
                  variant="secondary"
                  size="large"
                >
                  Continue Shopping
                </Button>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentResultPage;
