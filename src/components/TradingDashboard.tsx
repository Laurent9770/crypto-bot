import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Activity, 
  BarChart3, 
  Wallet,
  Settings,
  Bell,
  User,
  Crown
} from "lucide-react";
import { SymbolSelector } from "@/components/SymbolSelector";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import ReactMarkdown from "react-markdown";

const USER_ID = localStorage.getItem("user_id") || "demo"; // Replace with real auth

const SymbolDashboardCard = ({ symbol, onRemove, onSimTrade }) => {
  const [signals, setSignals] = useState([]);
  const [backtest, setBacktest] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    Promise.all([
      axios.get(`/api/signals/${symbol}`),
      axios.get(`/api/backtest/${symbol}`)
    ]).then(([sigRes, btRes]) => {
      setSignals(sigRes.data || []);
      setBacktest(btRes.data || null);
    }).finally(() => setLoading(false));
  }, [symbol]);
  // Find latest overlays if present
  const latestOverlay = signals.length > 0 ? signals[0].chart_overlays : null;
  return (
    <Card className="relative animate-fade-in">
      <Button size="icon" variant="ghost" className="absolute top-2 right-2 z-10" onClick={() => onRemove(symbol)}>
        ✕
      </Button>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-primary" />
          {symbol}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? <div>Loading...</div> : (
          <>
            <div className="mb-2">
              <div className="font-bold text-lg">Signals</div>
              {signals.length === 0 ? <div className="text-muted-foreground">No signals</div> : (
                <ul className="space-y-1">
                  {signals.map((sig, i) => (
                    <li key={i} className="text-xs border-b border-border/30 pb-1">
                      <Badge variant={sig.signal === "BUY" ? "default" : sig.signal === "SELL" ? "destructive" : "secondary"}>{sig.signal}</Badge>
                      <span className="ml-2 font-mono">{new Date(sig.open_time).toLocaleString()}</span>
                      <span className="ml-2 text-muted-foreground">Close: ${sig.close}</span>
                      <div className="text-muted-foreground text-xs">
                        {sig.explanation ? <ReactMarkdown>{sig.explanation}</ReactMarkdown> : sig.explanation}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {/* Chart overlays can be passed to the chart component here if needed */}
            {/* Example: <TradingViewChart overlays={latestOverlay} /> */}
            <div className="mb-2">
              <div className="font-bold text-lg">Backtest</div>
              {backtest ? (
                <>
                  <div>Final Balance: ${backtest.final_balance?.toLocaleString()}</div>
                  <div>Total Trades: {backtest.trades?.length}</div>
                  <img src="/equity_curve.png" alt="Equity Curve" className="w-full max-w-xs rounded border mt-2" />
                </>
              ) : <div className="text-muted-foreground">No backtest</div>}
            </div>
            <Button size="sm" variant="outline" onClick={() => onSimTrade(symbol)}>Simulate Trade</Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};

const WatchlistSidebar = ({ open, onClose, watchlist, onAdd, onRemove, allSymbols }) => {
  const [input, setInput] = useState("");
  return (
    <div className={`fixed top-0 right-0 h-full w-80 bg-background border-l border-border shadow-lg z-50 transition-transform ${open ? "translate-x-0" : "translate-x-full"}`}>
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h2 className="text-lg font-bold">Watchlist</h2>
        <Button size="icon" variant="ghost" onClick={onClose}>✕</Button>
      </div>
      <div className="p-4">
        <div className="flex gap-2 mb-4">
          <Input value={input} onChange={e => setInput(e.target.value.toUpperCase())} placeholder="Add symbol (e.g. BTCUSDT)" />
          <Button size="sm" onClick={() => { if(input) { onAdd(input); setInput(""); } }}>Add</Button>
        </div>
        <ul className="space-y-2">
          {watchlist.map(sym => (
            <li key={sym} className="flex items-center justify-between border-b border-border/20 pb-1">
              <span>{sym}</span>
              <Button size="icon" variant="ghost" onClick={() => onRemove(sym)}>✕</Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const TradeSimModal = ({ open, onClose, symbol, onSimulated }) => {
  const [side, setSide] = useState("buy");
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    setLoading(true);
    await axios.post("/api/sim_trades", {
      user_id: USER_ID,
      symbol,
      side,
      amount: parseFloat(amount),
      price: parseFloat(price),
      timestamp: Date.now(),
    });
    setLoading(false);
    onSimulated();
    onClose();
  };
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Simulate Trade for {symbol}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Select value={side} onValueChange={setSide}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="buy">Buy</SelectItem>
              <SelectItem value="sell">Sell</SelectItem>
            </SelectContent>
          </Select>
          <Input value={amount} onChange={e => setAmount(e.target.value)} placeholder="Amount" type="number" />
          <Input value={price} onChange={e => setPrice(e.target.value)} placeholder="Price" type="number" />
          <Button onClick={handleSubmit} disabled={loading || !amount || !price} className="w-full">Simulate Trade</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const SimTradesTable = ({ trades, onCloseTrade }) => {
  let pnl = 0;
  const rows = trades.map(trade => {
    let tradePnl = 0;
    if (trade.status === "closed") {
      tradePnl = (trade.close_price - trade.price) * trade.amount * (trade.side === "buy" ? 1 : -1);
      pnl += tradePnl;
    }
    return { ...trade, tradePnl };
  });
  return (
    <div className="mt-10">
      <h2 className="text-xl font-bold mb-2">Simulated Trades & P&L</h2>
      <table className="w-full text-sm border">
        <thead>
          <tr className="bg-muted/30">
            <th>Symbol</th><th>Side</th><th>Amount</th><th>Entry</th><th>Status</th><th>Exit</th><th>P&L</th><th></th>
          </tr>
        </thead>
        <tbody>
          {rows.map(trade => (
            <tr key={trade.timestamp} className="border-b">
              <td>{trade.symbol}</td>
              <td>{trade.side}</td>
              <td>{trade.amount}</td>
              <td>{trade.price}</td>
              <td>{trade.status}</td>
              <td>{trade.status === "closed" ? trade.close_price : "-"}</td>
              <td className={trade.tradePnl > 0 ? "text-success" : trade.tradePnl < 0 ? "text-destructive" : ""}>{trade.status === "closed" ? trade.tradePnl.toFixed(2) : "-"}</td>
              <td>
                {trade.status === "open" && (
                  <Button size="sm" variant="outline" onClick={() => onCloseTrade(trade)}>Close</Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-2 font-bold">Total P&L: <span className={pnl > 0 ? "text-success" : pnl < 0 ? "text-destructive" : ""}>{pnl.toFixed(2)}</span></div>
    </div>
  );
};

const TradingDashboard = () => {
  const [dashboardSymbols, setDashboardSymbols] = useState(["BTCUSDT"]);
  const [watchlist, setWatchlist] = useState([]);
  const [showWatchlist, setShowWatchlist] = useState(false);
  // Fetch watchlist on mount
  useEffect(() => {
    axios.get(`/api/watchlist?user_id=${USER_ID}`).then(res => setWatchlist(res.data || []));
  }, []);
  // Add to dashboard and watchlist
  const addSymbol = (symbol) => {
    if (!dashboardSymbols.includes(symbol)) setDashboardSymbols([...dashboardSymbols, symbol]);
    if (!watchlist.includes(symbol)) {
      axios.post("/api/watchlist", { user_id: USER_ID, symbol }).then(() => setWatchlist([...watchlist, symbol]));
    }
  };
  // Remove from dashboard
  const removeSymbol = (symbol) => {
    setDashboardSymbols(dashboardSymbols.filter(s => s !== symbol));
  };
  // Remove from watchlist
  const removeFromWatchlist = (symbol) => {
    axios.delete("/api/watchlist", { data: { user_id: USER_ID, symbol } }).then(() => setWatchlist(watchlist.filter(s => s !== symbol)));
  };
  // Add from watchlist to dashboard
  const addFromWatchlist = (symbol) => {
    if (!dashboardSymbols.includes(symbol)) setDashboardSymbols([...dashboardSymbols, symbol]);
  };
  // Simulate trade (placeholder)
  const handleSimTrade = (symbol) => {
    // TODO: Open trade simulation modal
    alert(`Simulate trade for ${symbol}`);
  };
  const [simModal, setSimModal] = useState({ open: false, symbol: null });
  const [simTrades, setSimTrades] = useState([]);
  // Fetch simulated trades
  const fetchSimTrades = () => {
    axios.get(`/api/sim_trades?user_id=${USER_ID}`).then(res => setSimTrades(res.data || []));
  };
  useEffect(() => { fetchSimTrades(); }, []);
  // Simulate trade
  const handleSimulated = () => {
    fetchSimTrades();
  };
  // Close trade
  const handleCloseTrade = (trade) => {
    const close_price = prompt("Enter close price:", trade.price);
    if (!close_price) return;
    axios.delete("/api/sim_trades", { data: { user_id: USER_ID, trade_id: trade.timestamp, close_price: parseFloat(close_price), close_time: Date.now() } })
      .then(() => fetchSimTrades());
  };
  const { toast } = useToast();
  // Real-time WebSocket updates
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:6789");
    ws.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        if (msg.type === "signal" && msg.data && msg.data.symbol) {
          toast({ title: `New Signal for ${msg.data.symbol}`, description: msg.data.signal_type });
          // Optionally, update the UI in real time (force refresh or update state)
          // For now, just refetch simTrades and let SymbolDashboardCard refetch on symbol change
        }
      } catch {}
    };
    return () => ws.close();
  }, []);
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary/80 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              SignalFlow
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={() => setShowWatchlist(true)}>
              <BarChart3 className="w-5 h-5" />
            </Button>
            <Button variant="outline" className="flex items-center space-x-2">
              <span>Login</span>
            </Button>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6 flex gap-4 items-center">
          <SymbolSelector value="" onChange={addSymbol} />
          <Button variant="outline" onClick={() => setShowWatchlist(true)}>Manage Watchlist</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {dashboardSymbols.map(symbol => (
            <SymbolDashboardCard key={symbol} symbol={symbol} onRemove={removeSymbol} onSimTrade={handleSimTrade} />
          ))}
        </div>
        <TradeSimModal open={simModal.open} onClose={() => setSimModal({ open: false, symbol: null })} symbol={simModal.symbol} onSimulated={handleSimulated} />
        <SimTradesTable trades={simTrades} onCloseTrade={handleCloseTrade} />
      </main>
      <WatchlistSidebar open={showWatchlist} onClose={() => setShowWatchlist(false)} watchlist={watchlist} onAdd={addSymbol} onRemove={removeFromWatchlist} allSymbols={dashboardSymbols} />
    </div>
  );
};

export default TradingDashboard;