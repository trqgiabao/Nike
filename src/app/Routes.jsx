import { Routes, Route } from 'react-router-dom';
import { HomePage } from '../features/home';
import NotFound from '../pages/NotFound';
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
export default AppRoutes;