import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart3, Cpu, Users, Shield, TrendingUp, TrendingDown, Target, Zap, Bot, Activity } from "lucide-react";
import { SymbolSelector } from "@/components/SymbolSelector";
import analyticsBg from '@/assets/backgrounds/analytics.jpeg';
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import CryptoPrices from '@/components/CryptoPrices';
import LiveChart from '@/components/LiveChart';

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

const Features: React.FC = () => {
  const [symbol, setSymbol] = useState("BTCUSDT");
  const [signals, setSignals] = useState<Signal[]>([]);
  const [signalsLoading, setSignalsLoading] = useState(true);
  const [backtest, setBacktest] = useState<Backtest | null>(null);
  const [backtestLoading, setBacktestLoading] = useState(true);
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const [showChartsModal, setShowChartsModal] = useState(false);
  const [showSignalsModal, setShowSignalsModal] = useState(false);
  const [showLearnMoreModal, setShowLearnMoreModal] = useState(false);
  const [showTradersModal, setShowTradersModal] = useState(false);

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
    // Optionally fetch live prices if needed
    setLoading(false);
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
    <>
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-[1800px] mx-auto space-y-6">
          <CryptoPrices />
          <div className="flex items-center justify-between mb-4">
            <SymbolSelector value={symbol} onChange={setSymbol} />
          </div>
          <LiveChart symbol={symbol} />
            {/* Header */}
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold text-foreground">CryptoBot Pro Features</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Dive into the powerful features that set CryptoBot Pro apart from other trading platforms. 
                Whether you are a beginner or an experienced trader, we have the tools you need to succeed.
              </p>
            </div>

            {/* Live Trading Signals Section */}
            <Card className="bg-gradient-card border-border/50 shadow-card">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Bot className="icon w-6 h-6 text-primary animate-pulse" />
                  Live Trading Signals
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
                        <Button size="sm" className="w-full mt-3" variant="premium" onClick={() => toast({ title: 'Signal Executed', description: `Executing ${signal.signal} for ${signal.symbol}` })}>
                          <Zap className="w-4 h-4 mr-2" />
                          Execute Signal
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Backtest Results Section */}
            <Card className="bg-gradient-card border-border/50 shadow-card">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <BarChart3 className="icon w-5 h-5 text-primary" />
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

            {/* Live Crypto Prices (optional, can be re-enabled if live endpoint available) */}
            <Card className="bg-gradient-card border-border/50 shadow-card">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <BarChart3 className="icon w-6 h-6 text-primary" />
                  Live Market Prices
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {prices.map((price, index) => (
                    <div key={index} className="p-4 rounded-lg bg-muted/20 border border-border/50">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-foreground">{price.symbol}/USDT</span>
                        <div className={`flex items-center gap-1 ${price.change >= 0 ? "text-success" : "text-destructive"}`}>
                          {price.change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                          <span className="text-sm font-semibold">{price.change >= 0 ? "+" : ""}{price.change}%</span>
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-foreground mb-1">${price.price.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">Volume: {price.volume}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-gradient-card border-border/50 shadow-card">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <BarChart3 className="icon w-8 h-8 text-primary" />
                    <div>
                      <h2 className="text-xl font-bold mb-2 text-foreground">Live Charts</h2>
                      <p className="text-muted-foreground mb-4">
                        Integrated with TradingView for real-time price charts, technical analysis, and AI predictions.
                      </p>
                      <Button variant="outline" size="sm" onClick={() => setShowChartsModal(true)}>
                        <Target className="w-4 h-4 mr-2" />
                        View Charts
                      </Button>
                      <Dialog open={showChartsModal} onOpenChange={setShowChartsModal}>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Charts</DialogTitle>
                          </DialogHeader>
                          <div>Placeholder for charts content.</div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-border/50 shadow-card">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Cpu className="icon w-8 h-8 text-accent" />
                    <div>
                      <h2 className="text-xl font-bold mb-2 text-foreground">AI-Powered Signals</h2>
                      <p className="text-muted-foreground mb-4">
                        Automatic signal generation using advanced AI algorithms for high-accuracy trading signals.
                      </p>
                      <Button variant="outline" size="sm" onClick={() => setShowSignalsModal(true)}>
                        <Bot className="icon w-4 h-4 mr-2" />
                        View Signals
                      </Button>
                      <Dialog open={showSignalsModal} onOpenChange={setShowSignalsModal}>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Signals</DialogTitle>
                          </DialogHeader>
                          <div>Placeholder for signals content.</div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-border/50 shadow-card">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Users className="icon w-8 h-8 text-primary" />
                    <div>
                      <h2 className="text-xl font-bold mb-2 text-foreground">Copy Trading</h2>
                      <p className="text-muted-foreground mb-4">
                        Copy trades of top-performing users and automate your strategies with personalized settings.
                      </p>
                      <Button variant="outline" size="sm" onClick={() => setShowTradersModal(true)}>
                        <Activity className="w-4 h-4 mr-2" />
                        Browse Traders
                      </Button>
                      <Dialog open={showTradersModal} onOpenChange={setShowTradersModal}>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Browse Traders</DialogTitle>
                          </DialogHeader>
                          <div>Placeholder for top traders content.</div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-border/50 shadow-card">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Shield className="icon w-8 h-8 text-accent" />
                    <div>
                      <h2 className="text-xl font-bold mb-2 text-foreground">USDT Payments</h2>
                      <p className="text-muted-foreground mb-4">
                        Secure payments using USDT (TRC20, BEP20, ERC20) for seamless transactions and subscription management.
                      </p>
                      <Button variant="outline" size="sm" onClick={() => setShowLearnMoreModal(true)}>
                        <Shield className="w-4 h-4 mr-2" />
                        Learn More
                      </Button>
                      <Dialog open={showLearnMoreModal} onOpenChange={setShowLearnMoreModal}>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Learn More</DialogTitle>
                          </DialogHeader>
                          <div>Placeholder for learn more content.</div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </>
    );
};

export default Features; 