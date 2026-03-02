import { Routes, Route } from 'react-router-dom';

import { HomePage } from '@/features/home';
import SignUp from "@/features/auth/pages/signUp/SignUp.jsx";
import SignIn from "@/features/auth/pages/signIn/SignIn.jsx";
import NotFound from '@/shared/pages/NotFound.jsx';
import Profile from "@/features/profile/pages/Profile.jsx";
import SearchPage from "@/features/home/pages/SearchPage.jsx";
import CheckoutPage from "@/features/checkout/page/Checkout.jsx";


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />     
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
export default AppRoutes;