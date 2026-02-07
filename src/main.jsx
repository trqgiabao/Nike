import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Routes from "./app/Routes.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes />
      <ToastContainer
        position="top-right"
        autoClose={4000}
        pauseOnHover={false}
        draggable={false}
        closeOnClick
        theme="light"
      />
    </BrowserRouter>
  </StrictMode>
);
