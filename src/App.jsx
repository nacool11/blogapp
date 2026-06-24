import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import AppRoutes from './routes/AppRoutes';

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg)' }}>
          <Navbar />
          <AppRoutes />
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}
