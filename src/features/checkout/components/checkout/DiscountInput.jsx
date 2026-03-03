import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card.jsx";
import { Input } from "../ui/Input.jsx";
import { Button } from "../ui/Button.jsx";
import { Tag, X, Check } from "lucide-react";
import { formatCurrency } from "@/shared/constants/CheckoutData.js";

export function DiscountCodeInput({
  appliedCode,
  discountAmount,
  onApply,
  onRemove,
}) {
  const [code, setCode] = useState("");
  const [error, setError] = useState(null);

  const handleApply = () => {
    if (!code.trim()) return;

    const err = onApply(code);

    if (err) {
      setError(err);
    } else {
      setError(null);
      setCode("");
    }
  };

  return (
    <Card className="checkout-shadow">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Tag className="h-4 w-4 text-primary" />
          Discount Code
        </CardTitle>
      </CardHeader>

      <CardContent>
        {appliedCode ? (
          <div className="flex items-center justify-between rounded-lg border-2 border-accent/30 bg-accent/5 px-4 py-3">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-accent" />
              <div>
                <span className="font-semibold text-accent">
                  {appliedCode}
                </span>
                <p className="text-xs text-muted-foreground">
                  -{formatCurrency(discountAmount)}
                </p>
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={onRemove}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex gap-2">
              <Input
                placeholder="Enter code (e.g. NIKE10)"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                  setError(null);
                }}
                onKeyDown={(e) =>
                  e.key === "Enter" && handleApply()
                }
                maxLength={20}
              />

              <Button
                onClick={handleApply}
                variant="outline"
                className="shrink-0"
              >
                Apply
              </Button>
            </div>

            {error && (
              <p className="text-xs text-destructive">
                {error}
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}