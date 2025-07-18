import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart3, Zap, Bot } from "lucide-react";
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

export default function Spot() {
  const [signals, setSignals] = useState<Signal[]>([]);
  const [signalsLoading, setSignalsLoading] = useState(true);
  const [backtest, setBacktest] = useState<Backtest | null>(null);
  const [backtestLoading, setBacktestLoading] = useState(true);
  const [symbol, setSymbol] = useState("BTCUSDT");

  useEffect(() => {
    setSignalsLoading(true);
    axios.get(`/api/signals/${symbol}`)
      .then(res => setSignals(res.data || []))
      .catch(() => setSignals([]))
      .finally(() => setSignalsLoading(false));
    setBacktestLoading(true);
    axios.get(`/api/backtest/${symbol}`)
      .then(res => setBacktest(res.data))
      .catch(() => setBacktest(null))
      .finally(() => setBacktestLoading(false));
  }, [symbol]);

  const getSignalColor = (type: string) => {
    return type === "BUY" ? "text-success" : type === "SELL" ? "text-destructive" : "text-muted-foreground";
  };

  const getSignalBg = (type: string) => {
    return type === "BUY"
      ? "bg-success/10 border-success/20"
      : type === "SELL"
      ? "bg-destructive/10 border-destructive/20"
      : "bg-muted/10 border-border/20";
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between mb-4">
          <SymbolSelector value={symbol} onChange={setSymbol} />
        </div>
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">Spot Trading</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Trade spot markets with AI-powered signals and backtesting.
          </p>
        </div>
        <Card className="bg-gradient-card border-border/50 shadow-card">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Bot className="w-6 h-6 text-primary animate-pulse" />
              Live Spot Signals
            </CardTitle>
          </CardHeader>
          <CardContent>
            {signalsLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <span className="ml-2 text-muted-foreground">Loading signals...</span>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {signals.map((signal, idx) => (
                  <div key={signal._id || idx} className={`p-4 rounded-lg border ${getSignalBg(signal.signal)}`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${signal.signal === "BUY" ? "bg-success" : signal.signal === "SELL" ? "bg-destructive" : "bg-muted-foreground"} animate-pulse`}></div>
                        <span className="font-semibold text-foreground">{signal.symbol}</span>
                      </div>
                      <Badge variant={signal.signal === "BUY" ? "default" : signal.signal === "SELL" ? "destructive" : "secondary"} className={signal.signal === "BUY" ? "bg-gradient-success" : signal.signal === "SELL" ? "bg-destructive" : ""}>
                        {signal.signal}
                      </Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Close:</span>
                        <span className="font-mono text-foreground">${signal.close}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">RSI:</span>
                        <span className="font-mono text-foreground">{signal.rsi}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">MACD:</span>
                        <span className="font-mono text-foreground">{signal.macd}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">MACD Diff:</span>
                        <span className="font-mono text-foreground">{signal.macd_diff}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Bollinger Bands:</span>
                        <span className="font-mono text-foreground">{signal.boll_lower} - {signal.boll_upper}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Time:</span>
                        <span className="font-mono text-foreground">{new Date(signal.open_time).toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-muted-foreground">
                      {signal.explanation ? (
                        <span title={signal.explanation}>{signal.explanation.length > 80 ? signal.explanation.slice(0, 80) + '…' : signal.explanation}</span>
                      ) : (
                        <span className="italic text-muted-foreground">No explanation</span>
                      )}
                    </div>
                    <Button size="sm" className="w-full mt-3" variant="premium">
                      <Zap className="w-4 h-4 mr-2" />
                      Execute Signal
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
        <Card className="bg-gradient-card border-border/50 shadow-card">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              Backtest Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            {backtestLoading ? (
              <div className="text-muted-foreground">Loading backtest...</div>
            ) : !backtest ? (
              <div className="text-muted-foreground">No backtest results available.</div>
            ) : (
              <div className="space-y-2">
                <div className="text-sm text-foreground font-semibold">Final Balance: ${backtest.final_balance?.toLocaleString(undefined, {maximumFractionDigits:2})}</div>
                <div className="text-xs text-muted-foreground">Total Trades: {backtest.trades?.length}</div>
                <img src="/equity_curve.png" alt="Equity Curve" className="w-full max-w-xl rounded-lg border mt-2" />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 