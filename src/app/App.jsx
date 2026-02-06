import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './Routes.jsx';
import '../styles/Main.css';
const App = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};
export default App;