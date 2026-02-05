import { Outlet } from "react-router-dom";
import "../styles/index.css";
import Header from "../shared/components/organisms/Header.jsx";
import Footer from "../shared/components/organisms/Footer.jsx";

function App() {
  return (
    <div className="app-layout">
      <Header />
      <main className="app-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
