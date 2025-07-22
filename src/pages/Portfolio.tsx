import React from "react";
import { useEffect } from "react";
import { create } from "zustand";
import { io } from "socket.io-client";

interface PortfolioState {
  allocation: { asset: string; percent: number }[];
  pnl: { date: string; value: number }[];
  risk: { value: number } | null;
  setPortfolio: (data: Partial<PortfolioState>) => void;
}

const usePortfolioStore = create<PortfolioState>((set) => ({
  allocation: [],
  pnl: [],
  risk: null,
  setPortfolio: (data) => set(data),
}));

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://flask-backend.onrender.com';

export function usePortfolio() {
  const setPortfolio = usePortfolioStore((s) => s.setPortfolio);
  useEffect(() => {
    // Initial fetch
    fetch("/api/portfolio").then((res) => res.json()).then((data) => setPortfolio(data));
    // WebSocket for real-time updates
    const socket = io(VITE_BACKEND_URL, {
      transports: ["websocket"],
      withCredentials: true,
    });
    socket.on("portfolio_update", (data) => setPortfolio(data));
    return () => { socket.disconnect(); };
  }, [setPortfolio]);
  return usePortfolioStore();
}

const Portfolio: React.FC = () => {
  const { allocation, pnl, risk } = usePortfolio();
  const loading = allocation.length === 0 && pnl.length === 0 && !risk;

  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-primary chart-glow">Portfolio Analytics</h1>
      <p className="mb-8 text-muted-foreground text-lg">Analyze your portfolio allocation, P&L, and risk metrics in real time.</p>
      {loading ? (
        <div className="text-center text-muted-foreground">Loading portfolio data...</div>
      ) : (
        <div className="space-y-8">
          <div className="bg-card/80 rounded-xl shadow-lg border-2 border-primary/40 chart-glow p-6">
            <h2 className="text-xl font-bold mb-4 text-primary">Allocation</h2>
            <div className="space-y-4">
              {allocation.map((a, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="font-semibold text-foreground">{a.asset}</span>
                  <div className="flex-1 mx-4">
                    <div className="h-3 rounded-full bg-muted/30 overflow-hidden">
                      <div className="h-3 rounded-full bg-gradient-to-r from-primary to-primary/60 animate-pulse" style={{ width: `${a.percent}%` }} />
                    </div>
                  </div>
                  <span className="pill-shaped bg-primary/20 text-primary px-3 py-1 rounded-full font-mono">{a.percent}%</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-card/80 rounded-xl shadow-lg border-2 border-primary/40 chart-glow p-6">
            <h2 className="text-xl font-bold mb-4 text-primary">P&L Over Time</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-xs">
                <thead>
                  <tr className="text-muted-foreground">
                    <th>Date</th>
                    <th>P&L</th>
                  </tr>
                </thead>
                <tbody>
                  {pnl.map((p, i) => (
                    <tr key={i}>
                      <td className="font-mono">{p.date}</td>
                      <td className={p.value >= 0 ? "text-success" : "text-destructive"}>{p.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {risk && (
            <div className="bg-card/80 rounded-xl shadow-lg border-2 border-primary/40 chart-glow p-6">
              <h2 className="text-xl font-bold mb-4 text-primary">Risk</h2>
              <div className="text-2xl font-bold text-foreground">{risk.value}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Portfolio; 