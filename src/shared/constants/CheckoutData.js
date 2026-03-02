export const MOCK_CART_ITEMS = [
  {
    id: "1",
    name: "Nike Air Max 90",
    image:
      "https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=120&h=120&fit=crop",
    price: 3890000,
    quantity: 1,
    variant: "White/Black — Size 42",
  },
  {
    id: "2",
    name: "Nike Dunk Low Retro",
    image:
      "https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=120&h=120&fit=crop",
    price: 2990000,
    quantity: 1,
    variant: "Panda — Size 41",
  },
  {
    id: "3",
    name: "Nike Air Force 1 '07",
    image:
      "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=120&h=120&fit=crop",
    price: 2690000,
    quantity: 1,
    variant: "Triple White — Size 43",
  },
];

export const MOCK_STORE_ID = "nike_store_001";
export const SHIPPING_FEE = 30000;
export const DISCOUNT = 500000;

export function formatCurrency(amount) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}