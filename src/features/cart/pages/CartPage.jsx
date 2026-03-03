import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCart, updateCartItemQuantity, removeCartItem } from "../services/CartService";
import { getCurrentUser } from "@/features/auth/session";
import { Header, Footer } from "@/shared/components/organisms";
import { Button } from "@/shared/components/atoms";
import "./Cart.css";

const CartPage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = getCurrentUser();
  const customerId = user?.id;

  useEffect(() => {
    if (!customerId) {
      navigate("/signin");
      return;
    }
    loadCart();
  }, [customerId]);

  const loadCart = async () => {
    try {
      setLoading(true);
      const data = await getCart(customerId);
      setCart(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (cartItemId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      await updateCartItemQuantity(customerId, cartItemId, newQuantity);
      await loadCart();
    } catch (err) {
      alert("Failed to update quantity: " + err.message);
    }
  };

  const handleRemoveItem = async (cartItemId) => {
    if (!confirm("Remove this item from cart?")) return;
    try {
      await removeCartItem(customerId, cartItemId);
      await loadCart();
    } catch (err) {
      alert("Failed to remove item: " + err.message);
    }
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  if (loading) {
    return (
      <div className="page">
        <Header />
        <main className="cart-container">
          <p>Loading cart...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="page">
        <Header />
        <main className="cart-container">
          <p className="error">Error: {error}</p>
        </main>
        <Footer />
      </div>
    );
  }

  const isEmpty = !cart || !cart.items || cart.items.length === 0;

  return (
    <div className="page">
      <Header />
      <main className="cart-container">
        <div className="cart-header">
          <h1>Your Cart</h1>
          <Button onClick={() => navigate("/")} variant="secondary">
            Back to Products
          </Button>
        </div>

        {isEmpty ? (
          <div className="cart-empty">
            <p>Your cart is empty</p>
            <Button onClick={() => navigate("/")}>Shop Now</Button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.items.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-info">
                    <h3>{item.productName}</h3>
                    <p>SKU: {item.sku}</p>
                    <p>
                      {item.size} - {item.color}
                    </p>
                    <p className="cart-item-price">${item.price}</p>
                  </div>

                  <div className="cart-item-actions">
                    <input
                      type="number"
                      className="quantity-input"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        handleUpdateQuantity(item.id, parseInt(e.target.value))
                      }
                    />
                    <Button
                      variant="danger"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h3>Total: ${cart.totalAmount?.toFixed(2) || "0.00"}</h3>
              <Button onClick={handleCheckout} size="large">
                Checkout
              </Button>
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;
