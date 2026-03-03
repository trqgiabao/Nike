import { formatCurrency } from "@/shared/constants/CheckoutData.js"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card.jsx";
import { Separator } from "../ui/Separator.jsx";
import { ShoppingBag } from "lucide-react";

export function OrderSummary({
  items,
  subtotal,
  shippingFee,
  discount,
  total,
}) {
  return (
    <Card className="checkout-shadow">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <ShoppingBag className="h-5 w-5 text-primary" />
          Order Summary (
          {items.reduce((s, i) => s + i.quantity, 0)} items)
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex gap-3">
            <img
              src={item.image}
              alt={item.name}
              className="h-16 w-16 shrink-0 rounded-lg border bg-muted object-cover"
            />

            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-medium">
                {item.name}
              </p>

              {item.variant && (
                <p className="text-xs text-muted-foreground">
                  {item.variant}
                </p>
              )}

              <div className="mt-1 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  x{item.quantity}
                </span>
                <span className="text-sm font-semibold text-primary">
                  {formatCurrency(item.price * item.quantity)}
                </span>
              </div>
            </div>
          </div>
        ))}

        <Separator />

        <div className="space-y-2 text-sm">
          <Row label="Subtotal" value={formatCurrency(subtotal)} />
          <Row label="Shipping" value={formatCurrency(shippingFee)} />
          {discount > 0 && (
            <Row
              label="Discount"
              value={`-${formatCurrency(discount)}`}
              className="text-accent"
            />
          )}
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <span className="text-base font-semibold">
            Total
          </span>
          <span className="text-xl font-bold text-primary">
            {formatCurrency(total)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

function Row({ label, value, className }) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">
        {label}
      </span>
      <span className={`font-medium ${className || ""}`}>
        {value}
      </span>
    </div>
  );
}