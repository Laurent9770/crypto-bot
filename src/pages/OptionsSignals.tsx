import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CryptoPrices from '@/components/CryptoPrices';
import LiveChart from '@/components/LiveChart';
import { ThumbsUp, ThumbsDown, Bot } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

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

interface AiSignal {
  asset: string;
  trade_type: string;
  action: string;
  confidence_score: number;
  time_frame: string;
  entry_price: string;
  target_price: string;
  stop_loss: string;
  reasoning: string[];
  timestamp: string;
  source_urls: string[];
}

export default function OptionsSignals() {
  const [signals, setSignals] = useState<OptionSignal[]>([]);
  const [backtest, setBacktest] = useState<OptionBacktest | null>(null);
  const [backtestLoading, setBacktestLoading] = useState(true);
  const [symbol, setSymbol] = useState('BTCUSDT');
  const [aiSignals, setAiSignals] = useState<AiSignal[]>([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    setLoading(true);
    axios.get('/api/ai-signals')
      .then(res => setAiSignals(res.data.filter(s => s.trade_type === 'Option')))
      .catch(() => setAiSignals([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-[1800px] mx-auto space-y-6">
        <CryptoPrices />
        <div className="flex items-center justify-between mb-4">
          <SymbolSelector value={symbol} onChange={setSymbol} />
        </div>
        <LiveChart symbol={symbol} />
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
        <Card className="bg-gradient-card border-border/50 shadow-card mt-8">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Bot className="icon w-6 h-6 text-primary animate-pulse" />
              AI-Powered Options Signals
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div>Loading AI signals...</div>
            ) : (
              <div className="space-y-4">
                {aiSignals.map((signal, idx) => (
                  <div key={idx} className="p-4 rounded-lg border bg-muted/20">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={signal.action === 'Buy' ? 'bg-success' : 'bg-destructive'}>
                            {signal.action}
                          </Badge>
                          <span className="font-bold text-lg">{signal.asset}</span>
                          <span className="text-sm text-muted-foreground">({signal.time_frame})</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Confidence: {(signal.confidence_score * 100).toFixed(0)}%
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm"><ThumbsUp className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="sm"><ThumbsDown className="h-4 w-4" /></Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 my-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">Entry</div>
                        <div>{signal.entry_price}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Target</div>
                        <div>{signal.target_price}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Stop Loss</div>
                        <div>{signal.stop_loss}</div>
                      </div>
                    </div>
                    <div>
                      <div className="text-muted-foreground text-sm mb-1">Reasoning:</div>
                      <ul className="list-disc list-inside text-sm space-y-1">
                        {signal.reasoning.map((reason, i) => <li key={i}>{reason}</li>)}
                      </ul>
                    </div>
                    <div className="mt-4 text-xs text-muted-foreground">
                      Sources: {signal.source_urls.map((url, i) => (
                        <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="underline ml-2">
                          Source {i + 1}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 