import { useState } from "react";
import {
  MOCK_CART_ITEMS,
  MOCK_STORE_ID,
  SHIPPING_FEE,
  DISCOUNT,
} from "@/shared/constants/CheckoutData.js";
import { CheckoutStepper } from "../components/checkout/CheckoutStepper";
import { ShippingForm } from "../components/checkout/ShippingForm";
import { PaymentMethodSelector } from "../components/checkout/PaymentMethodSelect";
import { OrderConfirm } from "../components/checkout/OrderConfirm";
import { PaymentResult } from "../components/checkout/PaymentResult";
import { OrderSummary } from "../components/checkout/OrderSumary";
import { DiscountCodeInput } from "../components/checkout/DiscountInput";
import { ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/Button";

const VALID_CODES = {
  NIKE10: 500000,
  NIKE20: 1000000,
  FREESHIP: 30000,
};

const Index = () => {
  const [step, setStep] = useState("shipping");

  const [shipping, setShipping] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    district: "",
    ward: "",
    notes: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("vnpay");
  const [order, setOrder] = useState(null);
  const [appliedCode, setAppliedCode] = useState(null);

  const subtotal = MOCK_CART_ITEMS.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const discount = appliedCode ? VALID_CODES[appliedCode] || 0 : 0;
  const total = subtotal + SHIPPING_FEE - discount;

  const handleApplyCode = (code) => {
    const upper = code.toUpperCase().trim();
    if (VALID_CODES[upper]) {
      setAppliedCode(upper);
      return null;
    }
    return "Invalid discount code";
  };

  const handleRemoveCode = () => setAppliedCode(null);

  const handleShippingSubmit = (data) => {
    setShipping(data);
    setStep("payment");
  };

  const handlePaymentSelect = (method) => {
    setPaymentMethod(method);
    setStep("confirm");
  };

  const handleConfirmOrder = () => {
    const newOrder = {
      id: `ORD-${Date.now()}`,
      storeId: MOCK_STORE_ID,
      items: MOCK_CART_ITEMS,
      shipping,
      paymentMethod,
      subtotal,
      shippingFee: SHIPPING_FEE,
      discount,
      total,
      status: paymentMethod === "cod" ? "confirmed" : "paid",
      createdAt: new Date().toISOString(),
    };

    setOrder(newOrder);
    setStep("result");
  };

  const handleBack = () => {
    if (step === "payment") setStep("shipping");
    else if (step === "confirm") setStep("payment");
  };

  const handleStepClick = (targetStep) => {
    const orderSteps = ["shipping", "payment", "confirm"];
    const currentIdx = orderSteps.indexOf(step);
    const targetIdx = orderSteps.indexOf(targetStep);

    if (targetIdx < currentIdx) {
      setStep(targetStep);
    }
  };

  const showBackButton = step === "payment" || step === "confirm";

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-md">
        <div className="container flex h-16 items-center gap-4">
          {showBackButton && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBack}
              className="shrink-0"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
          <h1 className="text-xl font-bold">Checkout</h1>
        </div>
      </header>

      <main className="container py-6">
        {step !== "result" && (
          <CheckoutStepper
            currentStep={step}
            onStepClick={handleStepClick}
          />
        )}

        <div className={step === "result" ? "" : "mt-8 grid gap-6 lg:grid-cols-3"}>
          <div className={step === "result" ? "" : "lg:col-span-2"}>
            {step === "shipping" && (
              <ShippingForm
                initialData={shipping}
                onSubmit={handleShippingSubmit}
              />
            )}

            {step === "payment" && (
              <PaymentMethodSelector
                selected={paymentMethod}
                onSelect={handlePaymentSelect}
              />
            )}

            {step === "confirm" && (
              <OrderConfirm
                shipping={shipping}
                paymentMethod={paymentMethod}
                items={MOCK_CART_ITEMS}
                subtotal={subtotal}
                shippingFee={SHIPPING_FEE}
                discount={discount}
                total={total}
                onConfirm={handleConfirmOrder}
                onBack={handleBack}
              />
            )}

            {step === "result" && order && (
              <PaymentResult order={order} />
            )}
          </div>

          {step !== "result" && (
            <div className="lg:col-span-1 space-y-4">
              <div className="sticky top-24 space-y-4">
                <OrderSummary
                  items={MOCK_CART_ITEMS}
                  subtotal={subtotal}
                  shippingFee={SHIPPING_FEE}
                  discount={discount}
                  total={total}
                />

                <DiscountCodeInput
                  appliedCode={appliedCode}
                  discountAmount={discount}
                  onApply={handleApplyCode}
                  onRemove={handleRemoveCode}
                />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;