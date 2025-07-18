import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { TrendingUp, TrendingDown, BarChart3, Zap, Bot, Target, Clock, DollarSign } from "lucide-react";
import { SymbolSelector } from "@/components/SymbolSelector";

// TradingView Chart Placeholder
const TradingViewChart = () => (
  <div className="w-full h-[600px] bg-gradient-card border border-border/50 rounded-lg flex items-center justify-center">
    <div className="text-center space-y-4">
      <BarChart3 className="w-16 h-16 text-primary mx-auto animate-pulse" />
      <div>
        <h3 className="text-xl font-semibold text-foreground">TradingView Chart</h3>
        <p className="text-muted-foreground">Advanced charting with real-time data</p>
        <p className="text-sm text-muted-foreground mt-2">Chart integration requires TradingView library</p>
      </div>
    </div>
  </div>
);

const OrderBook = () => {
  const asks = [
    { price: 67450, amount: 0.125, total: 8.431 },
    { price: 67440, amount: 0.089, total: 6.002 },
    { price: 67430, amount: 0.234, total: 15.785 },
    { price: 67420, amount: 0.156, total: 10.518 },
    { price: 67410, amount: 0.078, total: 5.256 },
  ];

  const bids = [
    { price: 67390, amount: 0.234, total: 15.785 },
    { price: 67380, amount: 0.145, total: 9.770 },
    { price: 67370, amount: 0.089, total: 5.996 },
    { price: 67360, amount: 0.267, total: 17.985 },
    { price: 67350, amount: 0.123, total: 8.284 },
  ];

  return (
    <Card className="bg-gradient-card border-border/50 shadow-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm text-foreground">Order Book</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-1">
          {/* Header */}
          <div className="grid grid-cols-3 gap-2 px-4 py-2 text-xs text-muted-foreground bg-muted/20">
            <div>Price (USDT)</div>
            <div className="text-right">Amount (BTC)</div>
            <div className="text-right">Total</div>
          </div>
          
          {/* Asks */}
          <div className="space-y-1">
            {asks.map((ask, index) => (
              <div key={index} className="grid grid-cols-3 gap-2 px-4 py-1 text-xs hover:bg-destructive/10 transition-colors">
                <div className="text-destructive font-mono">{ask.price.toLocaleString()}</div>
                <div className="text-right text-foreground font-mono">{ask.amount.toFixed(3)}</div>
                <div className="text-right text-muted-foreground font-mono">{ask.total.toFixed(3)}</div>
              </div>
            ))}
          </div>
          
          {/* Spread */}
          <div className="px-4 py-2 bg-muted/30">
            <div className="text-center text-xs">
              <span className="text-muted-foreground">Spread: </span>
              <span className="text-foreground font-mono">60 USDT (0.09%)</span>
            </div>
          </div>
          
          {/* Bids */}
          <div className="space-y-1">
            {bids.map((bid, index) => (
              <div key={index} className="grid grid-cols-3 gap-2 px-4 py-1 text-xs hover:bg-success/10 transition-colors">
                <div className="text-success font-mono">{bid.price.toLocaleString()}</div>
                <div className="text-right text-foreground font-mono">{bid.amount.toFixed(3)}</div>
                <div className="text-right text-muted-foreground font-mono">{bid.total.toFixed(3)}</div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function Trading() {
  const [orderType, setOrderType] = useState("market");
  const [side, setSide] = useState("buy");
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("");
  const [leverage, setLeverage] = useState([1]);
  const [stopLoss, setStopLoss] = useState("");
  const [takeProfit, setTakeProfit] = useState("");
  const [autoBotEnabled, setAutoBotEnabled] = useState(true);

  // New: State for signals and backtest
  const [signals, setSignals] = useState([]);
  const [signalsLoading, setSignalsLoading] = useState(true);
  const [backtest, setBacktest] = useState(null);
  const [backtestLoading, setBacktestLoading] = useState(true);

  const [symbol, setSymbol] = useState("BTCUSDT");
  const currentPrice = 67340;
  const balance = 11200.50;

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

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-[1800px] mx-auto space-y-6">
        <div className="flex items-center justify-between mb-4">
          <SymbolSelector value={symbol} onChange={setSymbol} />
        </div>
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Trading Terminal</h1>
            <p className="text-muted-foreground">Professional cryptocurrency trading interface</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="default" className="bg-gradient-success">
              <TrendingUp className="w-4 h-4 mr-1" />
              BTC/USDT $67,340
            </Badge>
            <div className="flex items-center gap-2">
              <Switch 
                checked={autoBotEnabled} 
                onCheckedChange={setAutoBotEnabled}
                className="data-[state=checked]:bg-primary"
              />
              <span className="text-sm text-foreground">Auto Bot</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Chart - Takes up most space */}
          <div className="xl:col-span-3 space-y-6">
            <TradingViewChart />
            
            {/* Trading Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-gradient-card border-border/50 shadow-card">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">24h Change</p>
                      <p className="text-lg font-bold text-success">+3.45%</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-success" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-card border-border/50 shadow-card">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">24h Volume</p>
                      <p className="text-lg font-bold text-foreground">1.2M BTC</p>
                    </div>
                    <BarChart3 className="w-8 h-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-card border-border/50 shadow-card">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">24h High</p>
                      <p className="text-lg font-bold text-foreground">$68,450</p>
                    </div>
                    <Target className="w-8 h-8 text-accent" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-card border-border/50 shadow-card">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">24h Low</p>
                      <p className="text-lg font-bold text-foreground">$66,120</p>
                    </div>
                    <TrendingDown className="w-8 h-8 text-destructive" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* --- New: Trading Signals & Explanations Section --- */}
            <Card className="bg-gradient-card border-border/50 shadow-card">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Bot className="w-5 h-5 text-primary animate-pulse" />
                  AI Trading Signals & Explanations
                </CardTitle>
              </CardHeader>
              <CardContent>
                {signalsLoading ? (
                  <div className="text-muted-foreground">Loading signals...</div>
                ) : signals.length === 0 ? (
                  <div className="text-muted-foreground">No signals available.</div>
                ) : (
                  <div className="space-y-4">
                    {signals.map((sig, idx) => (
                      <div key={sig._id || idx} className="p-4 rounded-lg border border-border/50 bg-muted/20">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant={sig.signal === "BUY" ? "default" : sig.signal === "SELL" ? "destructive" : "secondary"} className={sig.signal === "BUY" ? "bg-gradient-success" : sig.signal === "SELL" ? "bg-destructive" : ""}>
                            {sig.signal}
                          </Badge>
                          <span className="font-mono text-sm text-foreground">{new Date(sig.open_time).toLocaleString()}</span>
                          <span className="text-xs text-muted-foreground ml-2">Close: ${sig.close}</span>
                        </div>
                        <div className="text-xs text-muted-foreground mb-1">RSI: {sig.rsi} | MACD: {sig.macd} | MACD Diff: {sig.macd_diff}</div>
                        <div className="text-sm text-foreground font-medium">{sig.explanation}</div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
            {/* --- New: Backtest Results Section --- */}
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
            {/* --- End New Sections --- */}
          </div>

          {/* Trading Panel */}
          <div className="space-y-6">
            {/* Order Book */}
            <OrderBook />
            
            {/* Trading Form */}
            <Card className="bg-gradient-card border-border/50 shadow-card">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary" />
                  Place Order
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Tabs value={side} onValueChange={setSide}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="buy" className="data-[state=active]:bg-success data-[state=active]:text-success-foreground">Buy</TabsTrigger>
                    <TabsTrigger value="sell" className="data-[state=active]:bg-destructive data-[state=active]:text-destructive-foreground">Sell</TabsTrigger>
                  </TabsList>
                </Tabs>

                <div className="space-y-3">
                  <div>
                    <Label htmlFor="orderType" className="text-foreground">Order Type</Label>
                    <Select value={orderType} onValueChange={setOrderType}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="market">Market</SelectItem>
                        <SelectItem value="limit">Limit</SelectItem>
                        <SelectItem value="stop">Stop Loss</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {orderType === "limit" && (
                    <div>
                      <Label htmlFor="price" className="text-foreground">Price (USDT)</Label>
                      <Input
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder={currentPrice.toString()}
                        className="font-mono"
                      />
                    </div>
                  )}

                  <div>
                    <Label htmlFor="amount" className="text-foreground">Amount (BTC)</Label>
                    <Input
                      id="amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.00"
                      className="font-mono"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-foreground">Leverage: {leverage[0]}x</Label>
                    <Slider
                      value={leverage}
                      onValueChange={setLeverage}
                      max={100}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="stopLoss" className="text-foreground">Stop Loss</Label>
                      <Input
                        id="stopLoss"
                        value={stopLoss}
                        onChange={(e) => setStopLoss(e.target.value)}
                        placeholder="Optional"
                        className="font-mono"
                      />
                    </div>
                    <div>
                      <Label htmlFor="takeProfit" className="text-foreground">Take Profit</Label>
                      <Input
                        id="takeProfit"
                        value={takeProfit}
                        onChange={(e) => setTakeProfit(e.target.value)}
                        placeholder="Optional"
                        className="font-mono"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Available Balance:</span>
                      <span className="text-foreground font-mono">${balance.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Estimated Cost:</span>
                      <span className="text-foreground font-mono">
                        ${amount ? (parseFloat(amount) * currentPrice).toLocaleString() : "0.00"}
                      </span>
                    </div>
                  </div>

                  <Button 
                    className={`w-full font-semibold ${
                      side === "buy" 
                        ? "bg-gradient-success hover:shadow-success" 
                        : "bg-destructive hover:bg-destructive/90"
                    }`}
                    size="lg"
                  >
                    {side === "buy" ? "Buy BTC" : "Sell BTC"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Bot Recommendations */}
            {autoBotEnabled && (
              <Card className="bg-gradient-card border-border/50 shadow-card">
                <CardHeader>
                  <CardTitle className="text-foreground flex items-center gap-2">
                    <Bot className="w-5 h-5 text-primary animate-pulse" />
                    Bot Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 rounded-lg bg-success/10 border border-success/20">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium text-success">Strong Buy Signal</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      AI confidence: 92% • Entry: $67,200-$67,400
                    </p>
                  </div>
                  
                  <Button variant="premium" size="sm" className="w-full animate-glow">
                    <Zap className="w-4 h-4 mr-2" />
                    Execute Bot Strategy
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}