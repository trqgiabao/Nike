import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCart } from "@/features/cart/services/CartService";
import { createOrder } from "@/features/order/services/OrderService";
import { createVNPayPayment } from "@/features/payment/services/PaymentService";
import { getCurrentUser } from "@/features/auth/session";
import { Header, Footer } from "@/shared/components/organisms";
import { Button, Input } from "@/shared/components/atoms";
import { Label } from "../components/ui/Label";
import "./NewCheckout.css";

const STORE_ID = "00000000-0000-0000-0000-000000000000";

const NewCheckoutPage = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const customerId = user?.id;

  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  const [formData, setFormData] = useState({
    shippingAddress: "",
    phoneNumber: "",
    notes: "",
    paymentMethod: "Online",
  });

  useEffect(() => {
    if (!customerId) {
      navigate("/signin");
      return;
    }
    loadCart();
  }, [customerId]);

  const loadCart = async () => {
    try {
      const data = await getCart(customerId);
      if (!data.items || data.items.length === 0) {
        alert("Your cart is empty");
        navigate("/cart");
        return;
      }
      setCart(data);
    } catch (err) {
      alert("Failed to load cart: " + err.message);
      navigate("/cart");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.shippingAddress || !formData.phoneNumber) {
      alert("Please fill in shipping address and phone number");
      return;
    }

    setProcessing(true);

    try {
      // Step 1: Create Order
      const orderData = {
        customerId,
        storeId: STORE_ID,
        shippingAddress: formData.shippingAddress,
        phoneNumber: formData.phoneNumber,
        notes: formData.notes,
        paymentMethod: formData.paymentMethod,
      };

      const orderResponse = await createOrder(orderData);
      
      const { orderId, orderNumber, totalAmount, paymentMethod } = orderResponse;

      // Step 2: If Online Payment, create VNPay payment
      if (paymentMethod === "Online") {
        const paymentData = {
          orderId: orderId,
          amount: Math.round(totalAmount),
          orderInfo: `Payment for ${orderNumber}`,
          returnUrl: "https://errable-amalia-uneventfully.ngrok-free.dev/payment-result",
        };

        const paymentResponse = await createVNPayPayment(paymentData);
        
        // Redirect to VNPay
        window.location.href = paymentResponse.paymentUrl;
      } else {
        // COD or Offline - go to success page
        navigate(`/order-success?orderNumber=${orderNumber}`);
      }
    } catch (err) {
      alert("Checkout failed: " + err.message);
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="page">
        <Header />
        <main className="checkout-container">
          <p>Loading...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!cart) {
    return null;
  }

  return (
    <div className="page">
      <Header />
      <main className="checkout-container">
        <h1>Checkout</h1>

        <div className="checkout-content">
          <form className="checkout-form" onSubmit={handleSubmit}>
            <section className="form-section">
              <h2>Shipping Information</h2>
              
              <div className="form-field">
                <Label htmlFor="shippingAddress">Shipping Address *</Label>
                <Input
                  id="shippingAddress"
                  name="shippingAddress"
                  value={formData.shippingAddress}
                  onChange={handleInputChange}
                  placeholder="Enter your full address"
                  required
                />
              </div>

              <div className="form-field">
                <Label htmlFor="phoneNumber">Phone Number *</Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  required
                />
              </div>

              <div className="form-field">
                <Label htmlFor="notes">Notes (Optional)</Label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Any special instructions?"
                  rows="3"
                />
              </div>
            </section>

            <section className="form-section">
              <h2>Payment Method</h2>
              <div className="payment-methods">
                <label className="payment-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Online"
                    checked={formData.paymentMethod === "Online"}
                    onChange={handleInputChange}
                  />
                  <span>Online Payment (VNPay)</span>
                </label>
                <label className="payment-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="COD"
                    checked={formData.paymentMethod === "COD"}
                    onChange={handleInputChange}
                  />
                  <span>Cash on Delivery</span>
                </label>
                <label className="payment-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Offline"
                    checked={formData.paymentMethod === "Offline"}
                    onChange={handleInputChange}
                  />
                  <span>Pay at Store</span>
                </label>
              </div>
            </section>

            <Button type="submit" size="large" disabled={processing}>
              {processing ? "Processing..." : "Place Order"}
            </Button>
          </form>

          <aside className="order-summary">
            <h2>Order Summary</h2>
            
            <div className="summary-items">
              {cart.items.map((item) => (
                <div key={item.id} className="summary-item">
                  <div>
                    <p className="item-name">{item.productName}</p>
                    <p className="item-details">
                      {item.size} - {item.color} × {item.quantity}
                    </p>
                  </div>
                  <p className="item-price">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="summary-total">
              <div className="total-row">
                <span>Total</span>
                <span className="total-amount">
                  ${cart.totalAmount?.toFixed(2) || "0.00"}
                </span>
              </div>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NewCheckoutPage;
