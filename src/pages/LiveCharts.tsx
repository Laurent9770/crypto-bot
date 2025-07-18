import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { SymbolSelector } from "@/components/SymbolSelector";

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

const LiveCharts: React.FC = () => {
  const container = useRef<HTMLDivElement>(null);
  const [latestSignal, setLatestSignal] = useState<Signal | null>(null);
  const [backtest, setBacktest] = useState<Backtest | null>(null);
  const [loading, setLoading] = useState(true);
  const [backtestLoading, setBacktestLoading] = useState(true);
  const [symbol, setSymbol] = useState("BTCUSDT");

  useEffect(() => {
    if (container.current && !container.current.querySelector("iframe")) {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/tv.js";
      script.async = true;
      script.onload = () => {
        // @ts-ignore
        if (window.TradingView) {
          // @ts-ignore
          new window.TradingView.widget({
            autosize: true,
            symbol: "BINANCE:BTCUSDT",
            interval: "60",
            timezone: "Etc/UTC",
            theme: "dark",
            style: "1",
            locale: "en",
            toolbar_bg: "#131722",
            enable_publishing: false,
            allow_symbol_change: true,
            container_id: container.current.id,
          });
        }
      };
      container.current.appendChild(script);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    axios.get(`/api/signals/${symbol}`)
      .then(res => {
        const sigs = res.data || [];
        setLatestSignal(sigs.length > 0 ? sigs[sigs.length - 1] : null);
      })
      .catch(() => setLatestSignal(null))
      .finally(() => setLoading(false));
    setBacktestLoading(true);
    axios.get(`/api/backtest/${symbol}`)
      .then(res => setBacktest(res.data))
      .catch(() => setBacktest(null))
      .finally(() => setBacktestLoading(false));
  }, [symbol]);

  return (
    <div style={{ display: "flex", flexDirection: "row", padding: 40, textAlign: "center" }}>
      <div style={{ flex: 1 }}>
        <div className="flex items-center justify-between mb-4">
          <SymbolSelector value={symbol} onChange={setSymbol} />
        </div>
        <h2>Live Charts</h2>
        <p>Real-time crypto charts will be displayed here.</p>
        <div
          id="tradingview-widget"
          ref={container}
          style={{ minHeight: 500, width: "100%", maxWidth: 900, margin: "40px auto" }}
        />
      </div>
      <div style={{ flex: 1, maxWidth: 400, marginLeft: 40, background: "#181A20", borderRadius: 12, padding: 24, boxShadow: "0 2px 16px #0002" }}>
        <h3 className="text-xl font-bold mb-4 text-primary">Latest AI Signal</h3>
        {loading ? (
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
        <h3 className="text-xl font-bold mt-8 mb-4 text-primary">Backtest Results</h3>
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
  );
};

export default LiveCharts; 