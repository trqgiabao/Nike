import { Routes, Route } from 'react-router-dom';
import { HomePage } from '../features/home';
import Signup from "./pages/Signup.jsx";
import Signin from "./pages/Signin.jsx";
import NotFound from './pages/NotFound.jsx';
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />     
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
export default AppRoutes;
