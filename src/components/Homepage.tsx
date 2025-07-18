import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Homepage: React.FC = () => (
  <div className="min-h-screen flex flex-col justify-between bg-background">
    {/* Hero Section */}
    <section className="flex flex-col items-center justify-center py-24 px-4 text-center">
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow">
          <span className="text-2xl font-bold text-primary-foreground">🚀</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          CryptoBot Pro
        </h1>
      </div>
      <p className="max-w-2xl text-lg md:text-xl text-muted-foreground mb-8">
        Advanced cryptocurrency trading platform with AI-powered signals, TradingView integration, and secure USDT payments.
      </p>
      <h2 className="text-2xl font-bold mb-4">Welcome to CryptoBot Pro!</h2>
      <p className="max-w-xl text-base md:text-lg text-muted-foreground mb-8">
        Unlock the full potential of your cryptocurrency trading experience with <span className="text-primary font-semibold">AI-powered signals</span>, <span className="text-primary font-semibold">live charts</span> via <span className="text-primary font-semibold">TradingView</span>, and secure <span className="text-primary font-semibold">USDT payments</span>. Our platform provides a seamless and automated trading experience for traders of all levels.
      </p>
      <div className="flex flex-col md:flex-row gap-4 justify-center mb-12">
        <Button asChild size="lg" variant="premium">
          <Link to="/register">Get Started</Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link to="/features">Learn More</Link>
        </Button>
      </div>
    </section>

    {/* Features Section */}
    <section className="bg-card/40 py-16 px-4">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="rounded-xl bg-card/60 p-6 shadow-md border border-border/40">
          <h3 className="text-lg font-bold mb-2 text-primary">Trading Dashboard</h3>
          <p className="text-muted-foreground text-sm">A user-friendly dashboard that offers a complete overview of your trades, portfolio, and market data.</p>
        </div>
        <div className="rounded-xl bg-card/60 p-6 shadow-md border border-border/40">
          <h3 className="text-lg font-bold mb-2 text-primary">Live Charts</h3>
          <p className="text-muted-foreground text-sm">Integrated with TradingView, offering real-time price charts, technical analysis, and AI predictions for better trading decisions.</p>
        </div>
        <div className="rounded-xl bg-card/60 p-6 shadow-md border border-border/40">
          <h3 className="text-lg font-bold mb-2 text-primary">Copy Trading</h3>
          <p className="text-muted-foreground text-sm">Copy the trades of top-performing users and automate your strategies with personalized settings.</p>
        </div>
        <div className="rounded-xl bg-card/60 p-6 shadow-md border border-border/40">
          <h3 className="text-lg font-bold mb-2 text-primary">USDT Payments</h3>
          <p className="text-muted-foreground text-sm">Secure payments using USDT (TRC20, BEP20, ERC20) for seamless transactions and subscription management.</p>
        </div>
      </div>
    </section>

    {/* Testimonials Section */}
    <section className="py-16 px-4 bg-background">
      <div className="max-w-4xl mx-auto text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary">What Our Users Say</h2>
        <p className="text-muted-foreground mb-8">Hear from real traders who use CryptoBot Pro to automate and enhance their trading experience.</p>
      </div>
      <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
        <div className="rounded-xl bg-card/60 p-6 shadow-md border border-border/40 flex flex-col items-center">
          <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Jane D." className="w-16 h-16 rounded-full mb-3" />
          <h3 className="font-semibold text-lg mb-1">Jane D.</h3>
          <p className="text-muted-foreground text-sm mb-2">"CryptoBot Pro helped me automate my trades and increase my profits! The AI signals are spot on."</p>
        </div>
        <div className="rounded-xl bg-card/60 p-6 shadow-md border border-border/40 flex flex-col items-center">
          <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Alex T." className="w-16 h-16 rounded-full mb-3" />
          <h3 className="font-semibold text-lg mb-1">Alex T.</h3>
          <p className="text-muted-foreground text-sm mb-2">"The TradingView integration is a game changer. I can see live charts and act instantly."</p>
        </div>
        <div className="rounded-xl bg-card/60 p-6 shadow-md border border-border/40 flex flex-col items-center">
          <img src="https://randomuser.me/api/portraits/men/85.jpg" alt="Samuel K." className="w-16 h-16 rounded-full mb-3" />
          <h3 className="font-semibold text-lg mb-1">Samuel K.</h3>
          <p className="text-muted-foreground text-sm mb-2">"Copy trading lets me follow the best traders. My portfolio has never looked better!"</p>
        </div>
      </div>
    </section>
  </div>
);

export default Homepage; 