import { Routes as RouterRoutes, Route } from "react-router-dom";
import App from "./App.jsx";
import Signup from "./pages/Signup.jsx";
import Signin from "./pages/Signin.jsx";

function Home() {
  return (
    <main style={{ padding: "2rem", minHeight: "60vh" }}>
      <h1>NikeSystem</h1>
      <p>Nội dung trang ở đây.</p>
    </main>
  );
}

export default function Routes() {
  return (
    <RouterRoutes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
      </Route>
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
    </RouterRoutes>
  );
}
