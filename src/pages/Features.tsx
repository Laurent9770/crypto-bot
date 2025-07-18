import React, { useEffect, useState } from "react";
import { BarChart3, Cpu, Users, Shield } from "lucide-react";

const Features: React.FC = () => {
  const [signals, setSignals] = useState([]);
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/signals`)
      .then((res) => res.json())
      .then((data) => setSignals(data.slice(0, 3)));
    fetch(`${import.meta.env.VITE_API_URL}/api/crypto_prices`)
      .then((res) => res.json())
      .then((data) => setPrices(data.slice(0, 3)));
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-primary">CryptoBot Pro Features</h1>
      <p className="mb-8 text-muted-foreground text-lg">Dive into the powerful features that set CryptoBot Pro apart from other trading platforms. Whether you are a beginner or an experienced trader, we have the tools you need to succeed.</p>
      <div className="grid md:grid-cols-2 gap-8 mt-8">
        <div className="flex items-start gap-4 p-6 bg-card/60 rounded-xl shadow-md border border-border/40">
          <BarChart3 className="w-8 h-8 text-primary" />
          <div>
            <h2 className="text-xl font-bold mb-1">Live Charts</h2>
            <p className="text-muted-foreground">Integrated with TradingView for real-time price charts, technical analysis, and AI predictions.</p>
            {prices.length > 0 && (
              <div className="mt-2">
                <div className="font-semibold text-sm mb-1">Top Crypto Prices:</div>
                <ul className="text-xs text-muted-foreground">
                  {prices.map((p, i) => (
                    <li key={i}>{p.symbol}: ${p.price}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-start gap-4 p-6 bg-card/60 rounded-xl shadow-md border border-border/40">
          <Cpu className="w-8 h-8 text-accent" />
          <div>
            <h2 className="text-xl font-bold mb-1">AI-Powered Signals</h2>
            <p className="text-muted-foreground">Automatic signal generation using advanced AI algorithms for high-accuracy trading signals.</p>
            {signals.length > 0 && (
              <div className="mt-2">
                <div className="font-semibold text-sm mb-1">Recent Signals:</div>
                <ul className="text-xs text-muted-foreground">
                  {signals.map((s, i) => (
                    <li key={i}>{s.pair}: {s.type} ({s.confidence}%)</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-start gap-4 p-6 bg-card/60 rounded-xl shadow-md border border-border/40">
          <Users className="w-8 h-8 text-primary" />
          <div>
            <h2 className="text-xl font-bold mb-1">Copy Trading</h2>
            <p className="text-muted-foreground">Copy trades of top-performing users and automate your strategies with personalized settings.</p>
          </div>
        </div>
        <div className="flex items-start gap-4 p-6 bg-card/60 rounded-xl shadow-md border border-border/40">
          <Shield className="w-8 h-8 text-accent" />
          <div>
            <h2 className="text-xl font-bold mb-1">USDT Payments</h2>
            <p className="text-muted-foreground">Secure payments using USDT (TRC20, BEP20, ERC20) for seamless transactions and subscription management.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features; 