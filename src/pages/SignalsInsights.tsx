import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CryptoPrices from '@/components/CryptoPrices';
import LiveChart from '@/components/LiveChart';
import { SymbolSelector } from '@/components/SymbolSelector';

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

export default function SignalsInsights() {
  const [news, setNews] = useState([]);
  const [tweets, setTweets] = useState([]);
  const [options, setOptions] = useState([]);
  const [signals, setSignals] = useState<OptionSignal[]>([]);
  const [backtest, setBacktest] = useState<OptionBacktest | null>(null);
  const [backtestLoading, setBacktestLoading] = useState(true);
  const [symbol, setSymbol] = useState('BTCUSDT');

  useEffect(() => {
    axios.get('/api/insights/news').then(res => setNews(res.data));
    axios.get('/api/insights/twitter').then(res => setTweets(res.data));
    axios.get('/api/insights/tv_options').then(res => setOptions(res.data));
    axios.get('/api/options_signals').then(res => setSignals(res.data));
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
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-[1800px] mx-auto space-y-6">
        <CryptoPrices />
        <div className="flex items-center justify-between mb-4">
          <SymbolSelector value={symbol} onChange={setSymbol} />
        </div>
        <LiveChart symbol={symbol} />
        <h2 className="text-3xl font-bold mb-6 text-primary">📊 Options Insights Dashboard</h2>

        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-2 text-foreground">NewsAPI Articles</h3>
          <ul className="space-y-2">
            {news.map((n:any,i:number)=>(
              <li key={i} className="text-muted-foreground">
                <a href={n.url} target="_blank" rel="noopener noreferrer" className="text-primary underline">{n.title}</a> – {n.source}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-2 text-foreground">Twitter Mentions</h3>
          <ul className="space-y-2">
            {tweets.map((t:any,i:number)=>(
              <li key={i} className="text-muted-foreground">
                <span className="font-mono text-xs">{new Date(t.date).toLocaleString()}:</span> {t.content}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-2 text-foreground">TradingView Options Screener</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border text-sm">
              <thead>
                <tr className="bg-muted">
                  <th className="px-2 py-1">Ticker</th>
                  <th className="px-2 py-1">Close</th>
                  <th className="px-2 py-1">Volume</th>
                </tr>
              </thead>
              <tbody>
                {options.map((o:any,i:number)=>(
                  <tr key={i} className="border-t">
                    <td className="px-2 py-1">{o['ticker']}</td>
                    <td className="px-2 py-1">{o['close']}</td>
                    <td className="px-2 py-1">{o['volume']}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* AI Explanations for Option Signals */}
        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-2 text-foreground">AI Explanations for Option Signals</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border text-xs">
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
                    <td className="px-2 py-1 max-w-xs text-muted-foreground">
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
        </section>

        {/* Options Backtest Results */}
        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-2 text-foreground">Options Backtest Results</h3>
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
        </section>
      </div>
    </div>
  );
} 