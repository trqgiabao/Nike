// CartItem shape
export const CartItem = {
  id: "",
  name: "",
  image: "",
  price: 0,
  quantity: 0,
  variant: undefined, // optional
};

// ShippingInfo shape
export const ShippingInfo = {
  fullName: "",
  phone: "",
  email: "",
  address: "",
  city: "",
  district: "",
  ward: "",
  notes: "",
};

// PaymentMethod enum
export const PaymentMethod = {
  VNPAY: "vnpay",
  COD: "cod",
};

// Order shape
export const Order = {
  id: "",
  storeId: "",
  items: [], // array of CartItem
  shipping: { ...ShippingInfo },
  paymentMethod: PaymentMethod.COD,
  subtotal: 0,
  shippingFee: 0,
  discount: 0,
  total: 0,
  status: "pending", // pending | confirmed | paid | failed
  createdAt: "",
};

// CheckoutStep enum
export const CheckoutStep = {
  SHIPPING: "shipping",
  PAYMENT: "payment",
  CONFIRM: "confirm",
  RESULT: "result",
};