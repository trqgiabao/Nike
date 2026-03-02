import { MapPin, CreditCard, CheckCircle2 } from "lucide-react";

const steps = [
  { key: "shipping", label: "Shipping", icon: MapPin },
  { key: "payment", label: "Payment", icon: CreditCard },
  { key: "confirm", label: "Confirm", icon: CheckCircle2 },
];

const stepOrder = ["shipping", "payment", "confirm"];

export function CheckoutStepper({ currentStep, onStepClick }) {
  const currentIndex = stepOrder.indexOf(currentStep);

  return (
    <div className="flex items-center justify-center gap-0">
      {steps.map((s, i) => {
        const isActive = i === currentIndex;
        const isDone = i < currentIndex;
        const isClickable = isDone && onStepClick;
        const Icon = s.icon;

        return (
          <div key={s.key} className="flex items-center">
            <button
              type="button"
              disabled={!isClickable}
              onClick={() => isClickable && onStepClick(s.key)}
              className={`flex flex-col items-center gap-1.5 transition-transform ${
                isClickable
                  ? "cursor-pointer hover:scale-105"
                  : "cursor-default"
              }`}
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                  isDone
                    ? "border-primary bg-primary"
                    : isActive
                    ? "border-primary bg-primary/10"
                    : "border-muted bg-muted"
                }`}
              >
                <Icon
                  className={`h-5 w-5 transition-colors ${
                    isDone
                      ? "text-primary-foreground"
                      : isActive
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                />
              </div>

              <span
                className={`text-xs font-medium transition-colors ${
                  isActive || isDone
                    ? "text-primary"
                    : "text-muted-foreground"
                } ${
                  isClickable
                    ? "underline decoration-dotted underline-offset-2"
                    : ""
                }`}
              >
                {s.label}
              </span>
            </button>

            {i < steps.length - 1 && (
              <div
                className={`mx-3 mb-6 h-0.5 w-12 rounded-full transition-colors sm:w-20 ${
                  isDone ? "bg-primary" : "bg-muted"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}