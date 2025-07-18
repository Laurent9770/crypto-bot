import React, { useEffect, useState } from "react";
import axios from "axios";
import { SymbolSelector } from "@/components/SymbolSelector";

interface Trader {
  nickName: string;
  pnl: number;
  roi: number;
  rank: number;
}

interface Signal {
  _id?: string;
  symbol: string;
  signal: string;
  rsi: number;
  macd: number;
  macd_diff: number;
  boll_upper: number;
  boll_lower: number;
  close: number;
  open_time: string;
  explanation?: string;
}

interface Backtest {
  final_balance: number;
  trades: any[];
}

export default function CopyTrading() {
  const [traders, setTraders] = useState<Trader[]>([]);
  const [loading, setLoading] = useState(true);
  const [latestSignal, setLatestSignal] = useState<Signal | null>(null);
  const [backtest, setBacktest] = useState<Backtest | null>(null);
  const [signalLoading, setSignalLoading] = useState(true);
  const [backtestLoading, setBacktestLoading] = useState(true);
  const [symbol, setSymbol] = useState("BTCUSDT");

  useEffect(() => {
    async function fetchTraders() {
      try {
        const res = await axios.get("/api/copy-trading/binance-leaderboard");
        setTraders(res.data.data?.otherLeaderboardBaseVoList || []);
      } catch (err) {
        console.error("Failed to fetch traders:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchTraders();
  }, []);

  useEffect(() => {
    setSignalLoading(true);
    axios.get(`/api/signals/${symbol}`)
      .then(res => {
        const sigs = res.data || [];
        setLatestSignal(sigs.length > 0 ? sigs[sigs.length - 1] : null);
      })
      .catch(() => setLatestSignal(null))
      .finally(() => setSignalLoading(false));
    setBacktestLoading(true);
    axios.get(`/api/backtest/${symbol}`)
      .then(res => setBacktest(res.data))
      .catch(() => setBacktest(null))
      .finally(() => setBacktestLoading(false));
  }, [symbol]);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="flex items-center justify-between mb-4">
          <SymbolSelector value={symbol} onChange={setSymbol} />
        </div>
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">🔥 Top Copy Trading Experts (Binance Leaderboard)</h1>
        </div>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <span className="ml-2 text-muted-foreground">Loading live data...</span>
          </div>
        ) : (
          <ul className="space-y-4">
            {traders.map((trader, idx) => (
              <li key={idx} className="p-4 rounded-lg border bg-muted/20 border-border/50 flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex flex-col md:flex-row md:items-center gap-2">
                  <span className="font-semibold text-lg text-foreground">{trader.nickName}</span>
                  <span className="text-sm text-muted-foreground">Rank #{trader.rank}</span>
                </div>
                <div className="flex flex-col md:flex-row md:items-center gap-4 mt-2 md:mt-0">
                  <span className="text-success font-semibold">PnL: ${trader.pnl}</span>
                  <span className="text-accent font-semibold">ROI: {trader.roi}%</span>
                </div>
              </li>
            ))}
          </ul>
        )}
        <p className="text-xs text-muted-foreground mt-4">
          The information displayed here is for educational purposes only and does not constitute financial advice.
        </p>

        {/* AI Signal/Explanation Section */}
        <div className="mt-10 p-6 rounded-lg border bg-gradient-card border-border/50 shadow-card max-w-xl mx-auto">
          <h3 className="text-xl font-bold mb-4 text-primary">Latest AI Signal for {symbol}</h3>
          {signalLoading ? (
            <div className="text-muted-foreground">Loading signal...</div>
          ) : !latestSignal ? (
            <div className="text-muted-foreground">No signal available.</div>
          ) : (
            <div className="space-y-2 text-left">
              <div className="flex items-center gap-2 mb-1">
                <span className={`font-bold ${latestSignal.signal === "BUY" ? "text-success" : latestSignal.signal === "SELL" ? "text-destructive" : "text-muted-foreground"}`}>{latestSignal.signal}</span>
                <span className="font-mono text-xs text-muted-foreground">{new Date(latestSignal.open_time).toLocaleString()}</span>
              </div>
              <div className="text-xs text-muted-foreground">Close: ${latestSignal.close}</div>
              <div className="text-xs text-muted-foreground">RSI: {latestSignal.rsi} | MACD: {latestSignal.macd} | MACD Diff: {latestSignal.macd_diff}</div>
              <div className="text-xs text-muted-foreground">Bollinger: {latestSignal.boll_lower} - {latestSignal.boll_upper}</div>
              <div className="text-sm text-foreground font-medium mt-2">
                {latestSignal.explanation ? (
                  <span title={latestSignal.explanation}>{latestSignal.explanation.length > 80 ? latestSignal.explanation.slice(0, 80) + '…' : latestSignal.explanation}</span>
                ) : (
                  <span className="italic text-muted-foreground">No explanation</span>
                )}
              </div>
            </div>
          )}
        </div>
        {/* Backtest Results Section */}
        <div className="mt-6 p-6 rounded-lg border bg-gradient-card border-border/50 shadow-card max-w-xl mx-auto">
          <h3 className="text-xl font-bold mb-4 text-primary">Backtest Results for {symbol}</h3>
          {backtestLoading ? (
            <div className="text-muted-foreground">Loading backtest...</div>
          ) : !backtest ? (
            <div className="text-muted-foreground">No backtest results available.</div>
          ) : (
            <div className="space-y-2">
              <div className="text-sm text-foreground font-semibold">Final Balance: ${backtest.final_balance?.toLocaleString(undefined, {maximumFractionDigits:2})}</div>
              <div className="text-xs text-muted-foreground">Total Trades: {backtest.trades?.length}</div>
              <img src="/equity_curve.png" alt="Equity Curve" className="w-full max-w-xs rounded-lg border mt-2" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 