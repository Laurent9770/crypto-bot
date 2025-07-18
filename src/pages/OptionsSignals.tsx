import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface OptionSignal {
  symbol: string;
  type: string;
  strike_price: number;
  expiry: string;
  confidence: string;
  sentiment: string;
  source: string;
  timestamp: string;
  explanation?: string;
}

interface OptionBacktest {
  final_balance: number;
  trades: any[];
}

export default function OptionsSignals() {
  const [signals, setSignals] = useState<OptionSignal[]>([]);
  const [backtest, setBacktest] = useState<OptionBacktest | null>(null);
  const [backtestLoading, setBacktestLoading] = useState(true);
  const symbol = signals[0]?.symbol || 'BTCUSDT';

  useEffect(() => {
    axios.get('/api/options_signals')
      .then(res => setSignals(res.data))
      .catch(err => console.error('Failed to load options signals:', err));
  }, []);

  useEffect(() => {
    if (!symbol) return;
    setBacktestLoading(true);
    axios.get(`/api/options_backtest/${symbol}`)
      .then(res => setBacktest(res.data))
      .catch(() => setBacktest(null))
      .finally(() => setBacktestLoading(false));
  }, [symbol]);

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <h2 className="text-3xl font-bold mb-6 text-primary">📈 Options Trading Signals</h2>
      <div className="overflow-x-auto mb-8">
        <table className="min-w-full border text-sm">
          <thead>
            <tr className="bg-muted">
              <th className="px-2 py-1">Symbol</th>
              <th className="px-2 py-1">Type</th>
              <th className="px-2 py-1">Strike</th>
              <th className="px-2 py-1">Expiry</th>
              <th className="px-2 py-1">Confidence</th>
              <th className="px-2 py-1">Sentiment</th>
              <th className="px-2 py-1">Source</th>
              <th className="px-2 py-1">Time</th>
              <th className="px-2 py-1">AI Explanation</th>
            </tr>
          </thead>
          <tbody>
            {signals.map((sig, index) => (
              <tr key={index} className="border-t">
                <td className="px-2 py-1">{sig.symbol}</td>
                <td className="px-2 py-1">{sig.type}</td>
                <td className="px-2 py-1">{sig.strike_price}</td>
                <td className="px-2 py-1">{sig.expiry}</td>
                <td className="px-2 py-1">{sig.confidence}</td>
                <td className="px-2 py-1">{sig.sentiment}</td>
                <td className="px-2 py-1">{sig.source}</td>
                <td className="px-2 py-1">{new Date(sig.timestamp).toLocaleString()}</td>
                <td className="px-2 py-1 max-w-xs text-xs text-muted-foreground">
                  {sig.explanation ? (
                    <span title={sig.explanation}>{sig.explanation.length > 80 ? sig.explanation.slice(0, 80) + '…' : sig.explanation}</span>
                  ) : (
                    <span className="italic text-muted-foreground">No explanation</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Backtest Results Section */}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-2 text-foreground flex items-center gap-2">
          <span role="img" aria-label="chart">📊</span> Options Backtest Results
        </h3>
        {backtestLoading ? (
          <div className="text-muted-foreground">Loading backtest...</div>
        ) : !backtest ? (
          <div className="text-muted-foreground">No backtest results available.</div>
        ) : (
          <div className="space-y-2">
            <div className="text-sm text-foreground font-semibold">Final Balance: ${backtest.final_balance?.toLocaleString(undefined, {maximumFractionDigits:2})}</div>
            <div className="text-xs text-muted-foreground">Total Trades: {backtest.trades?.length}</div>
            <img src="/options_equity_curve.png" alt="Options Equity Curve" className="w-full max-w-xl rounded-lg border mt-2" />
          </div>
        )}
      </div>
    </div>
  );
} 