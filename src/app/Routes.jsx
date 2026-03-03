import { Navigate, Route, Routes } from "react-router-dom";

import { HomePage } from "@/features/home";
import SignUp from "@/features/auth/pages/signUp/SignUp.jsx";
import SignIn from "@/features/auth/pages/signIn/SignIn.jsx";
import Profile from "@/features/profile/pages/Profile.jsx";
import SearchPage from "@/features/home/pages/SearchPage.jsx";
import CheckoutPage from "@/features/checkout/page/Checkout.jsx";
import NotFound from "@/shared/pages/NotFound.jsx";

import ProtectedRoute from "@/features/home/components/ProtectedRoute.jsx";
import BackofficeLayout from "@/shared/layouts/BackofficeLayout.jsx";

// Nếu các file dashboard vẫn nằm ở src/app/pages thì giữ như này.
// Nếu main đã đổi chỗ, bạn chỉnh lại path theo cấu trúc mới.
import AdminDashboard from "./pages/AdminDashboard.jsx";
import StaffDashboard from "./pages/StaffDashboard.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      {/* Auth */}
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/staff/signin" element={<SignIn portal="staff" />} />
      <Route path="/admin/signin" element={<SignIn portal="admin" />} />

      {/* User */}
      <Route path="/profile" element={<Profile />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />

      {/* Backoffice */}
      <Route element={<ProtectedRoute allowedRoles={["staff"]} />}>
        <Route
          path="/staff"
          element={<BackofficeLayout title="Staff Portal" />}
        >
          <Route index element={<StaffDashboard />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route
          path="/admin"
          element={<BackofficeLayout title="Admin Portal" />}
        >
          <Route index element={<AdminDashboard />} />
        </Route>
      </Route>

      {/* Fallback */}
      <Route path="/home" element={<Navigate to="/" replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
