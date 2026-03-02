import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card.jsx";
import { CreditCard, Truck, ChevronRight } from "lucide-react";

const methods = [
  {
    key: "vnpay",
    label: "Online Payment (VNPay)",
    desc: "Pay via ATM, Visa, MasterCard, or QR Code",
    icon: CreditCard,
    badge: "Fast",
  },
  {
    key: "cod",
    label: "Cash on Delivery (COD)",
    desc: "Pay with cash when you receive the order",
    icon: Truck,
    badge: null,
  },
];

export function PaymentMethodSelector({ selected, onSelect }) {
  return (
    <Card className="checkout-shadow">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <CreditCard className="h-5 w-5 text-primary" />
          Payment Method
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {methods.map((m) => {
          const isSelected = selected === m.key;
          const Icon = m.icon;

          return (
            <button
              key={m.key}
              onClick={() => onSelect(m.key)}
              className={`flex w-full items-center gap-4 rounded-lg border-2 p-4 text-left transition-all duration-200 hover:checkout-shadow-hover ${
                isSelected
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/30"
              }`}
            >
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg transition-colors ${
                  isSelected
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                <Icon className="h-6 w-6" />
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">
                    {m.label}
                  </span>

                  {m.badge && (
                    <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold uppercase text-accent-foreground">
                      {m.badge}
                    </span>
                  )}
                </div>

                <p className="mt-0.5 text-sm text-muted-foreground">
                  {m.desc}
                </p>
              </div>

              <div
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                  isSelected
                    ? "border-primary bg-primary"
                    : "border-muted-foreground/30"
                }`}
              >
                {isSelected && (
                  <div className="h-2.5 w-2.5 rounded-full bg-primary-foreground" />
                )}
              </div>

              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </button>
          );
        })}
      </CardContent>
    </Card>
  );
}