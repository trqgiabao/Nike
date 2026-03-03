import { formatCurrency } from "@/shared/constants/CheckoutData.js"
import { Card, CardContent } from "../ui/Card.jsx";
import { Button } from "../ui/Button.jsx";
import { Separator } from "../ui/Separator.jsx";
import { CheckCircle2, Package, ArrowRight } from "lucide-react";
import { format } from "date-fns";

export function PaymentResult({ order }) {
  const isSuccess = order.status === "paid" || order.status === "confirmed";

  return (
    <div className="mx-auto max-w-lg py-8">
      <div className="mb-8 flex flex-col items-center text-center">
        <div
          className={`mb-4 flex h-20 w-20 items-center justify-center rounded-full animate-check-bounce ${
            isSuccess ? "bg-accent/15" : "bg-destructive/15"
          }`}
        >
          {isSuccess ? (
            <CheckCircle2 className="h-10 w-10 text-accent" />
          ) : (
            <Package className="h-10 w-10 text-destructive" />
          )}
        </div>

        <h2 className="text-2xl font-bold">
          {isSuccess ? "Order Placed Successfully!" : "Payment Failed"}
        </h2>

        <p className="mt-2 text-muted-foreground">
          {isSuccess
            ? order.paymentMethod === "vnpay"
              ? "Your payment has been confirmed. Your order is being processed."
              : "Your order has been created. You will pay upon delivery."
            : "Something went wrong. Please try again."}
        </p>
      </div>

      <Card className="checkout-shadow">
        <CardContent className="space-y-4 pt-6">
          <div className="space-y-2 text-sm">
            <Row label="Order ID" value={order.id} bold />
            <Row label="Store ID" value={order.storeId} />
            <Row
              label="Date"
              value={format(new Date(order.createdAt), "HH:mm — dd/MM/yyyy")}
            />
            <Row
              label="Payment"
              value={
                order.paymentMethod === "vnpay"
                  ? "VNPay Online"
                  : "COD"
              }
            />
            <Row
              label="Status"
              value={
                order.status === "paid"
                  ? "Paid"
                  : order.status === "confirmed"
                  ? "Awaiting Delivery"
                  : "Failed"
              }
              className={isSuccess ? "text-accent" : "text-destructive"}
            />
          </div>

          <Separator />

          <div className="space-y-2 text-sm">
            <Row label="Subtotal" value={formatCurrency(order.subtotal)} />
            <Row label="Shipping" value={formatCurrency(order.shippingFee)} />
            {order.discount > 0 && (
              <Row
                label="Discount"
                value={`-${formatCurrency(order.discount)}`}
                className="text-accent"
              />
            )}
          </div>

          <Separator />

          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span className="text-primary">
              {formatCurrency(order.total)}
            </span>
          </div>

          <Separator />

          <div className="text-sm">
            <p className="font-medium">Deliver to:</p>
            <p className="text-muted-foreground">
              {order.shipping.fullName} — {order.shipping.phone}
            </p>
            <p className="text-muted-foreground">
              {order.shipping.address}, {order.shipping.ward},{" "}
              {order.shipping.district}, {order.shipping.city}
            </p>
          </div>
        </CardContent>
      </Card>

      <Button
        className="mt-6 w-full text-base font-semibold"
        size="lg"
        onClick={() => window.location.reload()}
      >
        Continue Shopping <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </div>
  );
}

function Row({ label, value, bold, className }) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span
        className={`${bold ? "font-bold" : "font-medium"} ${
          className || ""
        }`}
      >
        {value}
      </span>
    </div>
  );
}