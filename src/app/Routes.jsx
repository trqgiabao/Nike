import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "../features/home";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import NotFound from "./pages/NotFound.jsx";
import Signin from "./pages/Signin.jsx";
import Signup from "./pages/Signup.jsx";
import StaffDashboard from "./pages/StaffDashboard.jsx";
import BackofficeLayout from "../shared/layouts/BackofficeLayout.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin portal="member" />} />
      <Route path="/staff/signin" element={<Signin portal="staff" />} />
      <Route path="/admin/signin" element={<Signin portal="admin" />} />

      <Route element={<ProtectedRoute allowedRoles={["staff"]} />}>
        <Route path="/staff" element={<BackofficeLayout title="Staff Portal" />}>
          <Route index element={<StaffDashboard />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route path="/admin" element={<BackofficeLayout title="Admin Portal" />}>
          <Route index element={<AdminDashboard />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
      <Route path="/home" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
