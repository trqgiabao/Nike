import shoe1 from '@/assets/shoe-1.png';
import shoe2 from '@/assets/shoe-2.png';
import shoe3 from '@/assets/shoe-3.png';
import shoe4 from '@/assets/shoe-4.png';
import shoe5 from '@/assets/shoe-5.png';
import shoe6 from '@/assets/shoe-6.png';
import shoe7 from '@/assets/shoe-7.png';
import shoe8 from '@/assets/shoe-8.png';

export const PRODUCTS = [
  {
    id: 1,
    name: "Nike Air Max 90",
    category: "Men's Shoes",
    price: 139,
    originalPrice: 169,
    image: shoe1,
    isNew: true,
    colors: 8
  },
  {
    id: 2,
    name: "Nike Air Force 1 '07",
    category: "Men's Shoes",
    price: 115,
    image: shoe2,
    isNew: false,
    colors: 12
  },
  {
    id: 3,
    name: "Nike Dunk Low Retro",
    category: "Men's Shoes",
    price: 125,
    image: shoe3,
    isNew: true,
    colors: 5
  },
  {
    id: 4,
    name: "Nike Air Jordan 1 Mid",
    category: "Men's Shoes",
    price: 145,
    image: shoe4,
    isNew: false,
    colors: 9
  },
  {
    id: 5,
    name: "Nike ZoomX Vaporfly",
    category: "Running Shoes",
    price: 259,
    originalPrice: 289,
    image: shoe5,
    isNew: true,
    colors: 4
  },
  {
    id: 6,
    name: "Nike Blazer Mid '77",
    category: "Lifestyle",
    price: 105,
    image: shoe6,
    isNew: false,
    colors: 7
  },
  {
    id: 7,
    name: "Nike Air Max 270",
    category: "Men's Shoes",
    price: 169,
    image: shoe7,
    isNew: false,
    colors: 10
  },
  {
    id: 8,
    name: "Nike Pegasus 40",
    category: "Running Shoes",
    price: 139,
    originalPrice: 159,
    image: shoe8,
    isNew: true,
    colors: 6
  }
];

export const FILTER_OPTIONS = ['All', 'Men', 'Women', 'Running'];