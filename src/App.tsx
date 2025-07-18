import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./pages/Dashboard";
import LiveCharts from "./pages/LiveCharts";
import CopyTrading from "./pages/CopyTrading";
import MobileApp from "./pages/MobileApp";
import APIAccess from "./pages/APIAccess";
import HelpCenter from "./pages/HelpCenter";
import TradingGuide from "./pages/TradingGuide";
import Documentation from "./pages/Documentation";
import Community from "./pages/Community";
import ContactUs from "./pages/ContactUs";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import Support from "./pages/Support";
import About from "./pages/About";
import Admin from "./pages/Admin";
import AdminDashboard from "./pages/AdminDashboard";
import Auth from "./pages/Auth";
import Portfolio from "./pages/Portfolio";
import Profile from "./pages/Profile";
import Trading from "./pages/Trading";
import SignalsInsights from "./pages/SignalsInsights";
import OptionsSignals from "./pages/OptionsSignals";
import Futures from "./pages/Futures";
import Spot from "./pages/Spot";
import Margin from "./pages/Margin";

const queryClient = new QueryClient();

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/dashboard", label: "Dashboard" },
  { path: "/options-signals", label: "Options Signals" },
  { path: "/insights", label: "Options Insights" },
  { path: "/trading", label: "Trading" },
  { path: "/portfolio", label: "Portfolio" },
  { path: "/profile", label: "Profile" },
  { path: "/admin", label: "Admin" },
  { path: "/admin-dashboard", label: "Admin Dashboard" },
  { path: "/features", label: "Features" },
  { path: "/pricing", label: "Pricing" },
  { path: "/support", label: "Support" },
  { path: "/about", label: "About" },
  { path: "/live-charts", label: "Live Charts" },
  { path: "/copy-trading", label: "Copy Trading" },
  { path: "/mobile-app", label: "Mobile App" },
  { path: "/api-access", label: "API Access" },
  { path: "/help-center", label: "Help Center" },
  { path: "/trading-guide", label: "Trading Guide" },
  { path: "/documentation", label: "Documentation" },
  { path: "/community", label: "Community" },
  { path: "/contact-us", label: "Contact Us" },
];

function Sidebar() {
  return (
    <aside className="fixed top-0 left-0 h-full w-56 bg-[#181A20] border-r border-[#222531] shadow-lg z-40 flex flex-col p-4 space-y-2 text-white">
      <div className="text-2xl font-bold mb-6 text-[#F0B90B] tracking-wide">CryptoBot Pro</div>
      <nav className="flex-1 space-y-1">
        {navLinks.map((link) => (
          <a
            key={link.path}
            href={link.path}
            className="block px-4 py-2 rounded-lg font-medium hover:bg-[#23262F] hover:text-[#F0B90B] transition-colors text-white"
            style={{
              marginBottom: 2,
            }}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </aside>
  );
}

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 ml-56 p-4 bg-background">
        <nav className="bg-background border-b border-border/50 px-4 py-2 flex gap-4 items-center">
          <Link to="/" className="font-bold text-primary">Home</Link>
          <Link to="/trading" className="text-foreground hover:text-primary">Trading</Link>
          <Link to="/futures" className="text-foreground hover:text-primary">Futures</Link>
          <Link to="/spot" className="text-foreground hover:text-primary">Spot</Link>
          <Link to="/margin" className="text-foreground hover:text-primary">Margin</Link>
          {/* ... other links ... */}
        </nav>
        {children}
      </main>
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/features" element={<Features />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/support" element={<Support />} />
            <Route path="/about" element={<About />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/live-charts" element={<LiveCharts />} />
            <Route path="/copy-trading" element={<CopyTrading />} />
            <Route path="/mobile-app" element={<MobileApp />} />
            <Route path="/api-access" element={<APIAccess />} />
            <Route path="/help-center" element={<HelpCenter />} />
            <Route path="/trading-guide" element={<TradingGuide />} />
            <Route path="/documentation" element={<Documentation />} />
            <Route path="/community" element={<Community />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/trading" element={<Trading />} />
            <Route path="/futures" element={<Futures />} />
            <Route path="/spot" element={<Spot />} />
            <Route path="/margin" element={<Margin />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/monitor/ethusdt" element={<div style={{padding:40, textAlign:'center'}}><h2>ETH/USDT Signal Monitoring</h2><p>Live monitoring and analytics for the ETH/USDT signal will appear here.</p></div>} />
            <Route path="/insights" element={<SignalsInsights />} />
            <Route path="/options-signals" element={<OptionsSignals />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
