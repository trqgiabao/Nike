import { formatCurrency } from "@/shared/constants/CheckoutData.js"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card.jsx";
import { Button } from "../ui/Button.jsx";
import { Separator } from "../ui/Separator.jsx";
import { MapPin, CreditCard, Truck, ShieldCheck } from "lucide-react";

export function OrderConfirm({
  shipping,
  paymentMethod,
  items,
  subtotal,
  shippingFee,
  discount,
  total,
  onConfirm,
}) {
  return (
    <div className="space-y-4">
      <Card className="checkout-shadow">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <MapPin className="h-4 w-4 text-primary" />
            Shipping Address
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-1">
          <p className="font-semibold">
            {shipping.fullName} — {shipping.phone}
          </p>
          <p className="text-muted-foreground">
            {shipping.address}, {shipping.ward},{" "}
            {shipping.district}, {shipping.city}
          </p>
          {shipping.email && (
            <p className="text-muted-foreground">
              {shipping.email}
            </p>
          )}
          {shipping.notes && (
            <p className="text-muted-foreground italic">
              Notes: {shipping.notes}
            </p>
          )}
        </CardContent>
      </Card>

      <Card className="checkout-shadow">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            {paymentMethod === "vnpay" ? (
              <CreditCard className="h-4 w-4 text-primary" />
            ) : (
              <Truck className="h-4 w-4 text-primary" />
            )}
            Payment Method
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm">
          <p className="font-medium">
            {paymentMethod === "vnpay"
              ? "Online Payment (VNPay)"
              : "Cash on Delivery (COD)"}
          </p>
        </CardContent>
      </Card>

      <Card className="checkout-shadow">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">
            Order Items
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-12 w-12 rounded-md border object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm">
                  {item.name}
                </p>
                <span className="text-xs text-muted-foreground">
                  x{item.quantity}
                </span>
              </div>
              <span className="text-sm font-semibold">
                {formatCurrency(item.price * item.quantity)}
              </span>
            </div>
          ))}

          <Separator />

          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                Subtotal
              </span>
              <span>{formatCurrency(subtotal)}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">
                Shipping
              </span>
              <span>{formatCurrency(shippingFee)}</span>
            </div>

            {discount > 0 && (
              <div className="flex justify-between text-accent">
                <span>Discount</span>
                <span>-{formatCurrency(discount)}</span>
              </div>
            )}
          </div>

          <Separator />

          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span className="text-primary">
              {formatCurrency(total)}
            </span>
          </div>
        </CardContent>
      </Card>

      <Button
        onClick={onConfirm}
        className="w-full text-base font-semibold"
        size="lg"
      >
        <ShieldCheck className="mr-2 h-5 w-5" />
        {paymentMethod === "vnpay"
          ? "Confirm & Pay"
          : "Place Order"}
      </Button>
    </div>
  );
}