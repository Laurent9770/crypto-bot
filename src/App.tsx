import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Premium from './pages/Premium';
import Header from './components/Header';
import LoginPage from './pages/Login';
import Register from './pages/Register';
import Trading from './pages/Trading';
import Futures from './pages/Futures';
import Margin from './pages/Margin';
import Spot from './pages/Spot';
import OptionsSignals from './pages/OptionsSignals';
import Pricing from './pages/Pricing';
import CopyTrading from './pages/CopyTrading';
import Features from './pages/Features';
import Docs from './pages/Documentation';
import Support from './pages/Support';
import About from './pages/About';
import Contact from './pages/ContactUs';
import Profile from './pages/Profile';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/trading" element={<Trading />} />
          <Route path="/futures" element={<Futures />} />
          <Route path="/margin" element={<Margin />} />
          <Route path="/spot" element={<Spot />} />
          <Route path="/options-signals" element={<OptionsSignals />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/copy-trading" element={<CopyTrading />} />
          <Route path="/features" element={<Features />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/support" element={<Support />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/premium" element={<Premium />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
