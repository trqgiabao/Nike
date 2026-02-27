import { Routes, Route } from 'react-router-dom';
import { HomePage } from '@/features/home';
import SignUp from "@/features/auth/pages/signUp/SignUp.jsx";
import SignIn from "@/features/auth/pages/signIn/SignIn.jsx";
import NotFound from '@/shared/pages/NotFound.jsx';
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />     
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
export default AppRoutes;
