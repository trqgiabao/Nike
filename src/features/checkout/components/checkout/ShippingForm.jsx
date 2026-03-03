import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card.jsx";
import { Button } from "../ui/Button.jsx";
import { Input } from "../ui/Input.jsx";
import { Label } from "../ui/Label.jsx";
import { Textarea } from "../ui/Textarea.jsx";
import { MapPin } from "lucide-react";
import { useState } from "react";

export function ShippingForm({ initialData, onSubmit }) {
  const [form, setForm] = useState(initialData);
  const [errors, setErrors] = useState({});

  const update = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  };

  const validate = () => {
    const e = {};

    if (!form.fullName?.trim())
      e.fullName = "Please enter your full name";

    if (!form.phone?.trim())
      e.phone = "Please enter your phone number";
    else if (!/^(0|\+84)\d{9,10}$/.test(form.phone.replace(/\s/g, "")))
      e.phone = "Invalid phone number";

    if (!form.email?.trim())
      e.email = "Please enter your email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Invalid email address";

    if (!form.address?.trim())
      e.address = "Please enter your address";

    if (!form.city?.trim())
      e.city = "Please enter your city";

    if (!form.district?.trim())
      e.district = "Please enter your district";

    if (!form.ward?.trim())
      e.ward = "Please enter your ward";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(form);
    }
  };

  return (
    <Card className="checkout-shadow">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <MapPin className="h-5 w-5 text-primary" />
          Shipping Information
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full Name *" error={errors.fullName}>
              <Input
                placeholder="John Doe"
                value={form.fullName}
                onChange={(e) => update("fullName", e.target.value)}
                maxLength={100}
              />
            </Field>

            <Field label="Phone Number *" error={errors.phone}>
              <Input
                placeholder="0912 345 678"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                maxLength={15}
              />
            </Field>
          </div>

          <Field label="Email *" error={errors.email}>
            <Input
              type="email"
              placeholder="email@example.com"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              maxLength={255}
            />
          </Field>

          <Field label="Street Address *" error={errors.address}>
            <Input
              placeholder="House number, street name..."
              value={form.address}
              onChange={(e) => update("address", e.target.value)}
              maxLength={200}
            />
          </Field>

          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="City *" error={errors.city}>
              <Input
                placeholder="Ho Chi Minh City"
                value={form.city}
                onChange={(e) => update("city", e.target.value)}
                maxLength={50}
              />
            </Field>

            <Field label="District *" error={errors.district}>
              <Input
                placeholder="District 1"
                value={form.district}
                onChange={(e) => update("district", e.target.value)}
                maxLength={50}
              />
            </Field>

            <Field label="Ward *" error={errors.ward}>
              <Input
                placeholder="Ben Nghe Ward"
                value={form.ward}
                onChange={(e) => update("ward", e.target.value)}
                maxLength={50}
              />
            </Field>
          </div>

          <Field label="Order Notes">
            <Textarea
              placeholder="Special instructions for delivery (optional)"
              value={form.notes}
              onChange={(e) => update("notes", e.target.value)}
              maxLength={500}
              rows={3}
            />
          </Field>

          <Button
            type="submit"
            className="w-full text-base font-semibold"
            size="lg"
          >
            Continue to Payment
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

function Field({ label, error, children }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium">{label}</Label>
      {children}
      {error && (
        <p className="text-xs text-destructive">{error}</p>
      )}
    </div>
  );
}