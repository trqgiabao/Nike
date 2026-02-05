import { Outlet } from "react-router-dom";
import "../styles/index.css";
import Header from "../shared/components/organisms/Header.jsx";

function App() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default App;
