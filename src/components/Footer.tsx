import { TrendingUp, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-card/30 backdrop-blur-sm border-t border-border/50 py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow">
                <TrendingUp className="icon w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                CryptoBot Pro
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Advanced cryptocurrency trading platform with AI-powered signals, 
              TradingView integration, and secure USDT payments.
            </p>
          </div>

          {/* Platform */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Platform</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/dashboard" className="text-muted-foreground hover:text-primary transition-colors">Trading Dashboard</Link></li>
              <li><Link to="/copy" className="text-muted-foreground hover:text-primary transition-colors">Copy Trading</Link></li>
              <li><Link to="/api-access" className="text-muted-foreground hover:text-primary transition-colors">API Access</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/help-center" className="text-muted-foreground hover:text-primary transition-colors">Help Center</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="icon w-4 h-4" />
                <span>support@cryptobotpro.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="icon w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="icon w-4 h-4" />
                <span>Global Support 24/7</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Networks */}
        <div className="mt-12 pt-8 border-t border-border/50">
          <div className="text-center mb-6">
            <h4 className="font-semibold mb-4">Supported Payment Networks</h4>
            <div className="flex justify-center gap-6">
              <div className="flex items-center gap-2 bg-card/50 px-4 py-2 rounded-lg border border-border/50">
                <div className="w-3 h-3 bg-success rounded-full" />
                <span className="text-sm font-medium">TRC20 (TRON)</span>
              </div>
              <div className="flex items-center gap-2 bg-card/50 px-4 py-2 rounded-lg border border-border/50">
                <div className="w-3 h-3 bg-accent rounded-full" />
                <span className="text-sm font-medium">BEP20 (BSC)</span>
              </div>
              <div className="flex items-center gap-2 bg-card/50 px-4 py-2 rounded-lg border border-border/50">
                <div className="w-3 h-3 bg-primary rounded-full" />
                <span className="text-sm font-medium">ERC20 (ETH)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 CryptoBot Pro. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Risk Disclosure</a>
          </div>
        </div>
      </div>
    </footer>
  );
};