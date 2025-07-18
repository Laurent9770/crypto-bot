import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
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
          <Route path="/premium" element={<div style={{padding:40, textAlign:'center'}}><h2>Premium Features Coming Soon</h2></div>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
