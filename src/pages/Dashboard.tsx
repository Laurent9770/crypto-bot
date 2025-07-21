import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, DollarSign, Target, Zap, Activity, ArrowUpRight, ArrowDownRight } from "lucide-react";
// import { SignalCard, type TradingSignal } from "@/components/trading/SignalCard";
// import { mockSignals } from "@/lib/mockData";

// Temporary mock data and SignalCard for demonstration
const mockSignals = [
  { id: 1, asset: "BTC/USDT", action: "Buy", confidence: 0.93, entry: 67000, target: 69000, stop: 66000 },
  { id: 2, asset: "ETH/USDT", action: "Sell", confidence: 0.91, entry: 3500, target: 3200, stop: 3600 },
  { id: 3, asset: "SOL/USDT", action: "Hold", confidence: 0.88, entry: 150, target: 170, stop: 140 },
  { id: 4, asset: "ADA/USDT", action: "Buy", confidence: 0.90, entry: 0.45, target: 0.55, stop: 0.40 },
  { id: 5, asset: "XRP/USDT", action: "Sell", confidence: 0.87, entry: 0.60, target: 0.50, stop: 0.65 },
  { id: 6, asset: "BNB/USDT", action: "Buy", confidence: 0.92, entry: 320, target: 350, stop: 310 },
];

function SignalCard({ signal }: any) {
  return (
    <Card className="border-primary/20">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium">{signal.asset}</CardTitle>
        <Badge className={signal.action === "Buy" ? "bg-success" : signal.action === "Sell" ? "bg-destructive" : "bg-muted-foreground"}>{signal.action}</Badge>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <span>Confidence:</span>
          <span className="font-bold">{(signal.confidence * 100).toFixed(0)}%</span>
        </div>
        <div className="flex justify-between text-xs">
          <div>Entry: <span className="font-mono">{signal.entry}</span></div>
          <div>Target: <span className="font-mono">{signal.target}</span></div>
          <div>Stop: <span className="font-mono">{signal.stop}</span></div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Dashboard() {
  const topSignals = mockSignals.slice(0, 6);
  
  const stats = {
    totalSignals: 247,
    accuracy: 89.5,
    profit: 12750,
    activePositions: 8
  };

  const recentPerformance = [
    { asset: "BTC/USDT", profit: 1250, percentage: 12.5, type: "profit" },
    { asset: "ETH/USDT", profit: 850, percentage: 8.3, type: "profit" },
    { asset: "SOL/USDT", profit: -320, percentage: -3.2, type: "loss" },
    { asset: "ADA/USDT", profit: 420, percentage: 4.1, type: "profit" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Trading Dashboard
        </h1>
        <p className="text-muted-foreground mt-2">
          AI-powered trading signals and market intelligence
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-success/10 border-success/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Signals</CardTitle>
            <Activity className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{stats.totalSignals}</div>
            <p className="text-xs text-muted-foreground">
              +12 from yesterday
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-primary/10 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Accuracy Rate</CardTitle>
            <Target className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stats.accuracy}%</div>
            <p className="text-xs text-muted-foreground">
              +2.3% this week
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-warning/10 border-warning/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
            <DollarSign className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">${stats.profit.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +15.2% this month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-danger/10 border-danger/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Positions</CardTitle>
            <Zap className="h-4 w-4 text-danger" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-danger">{stats.activePositions}</div>
            <p className="text-xs text-muted-foreground">
              3 profitable, 2 pending
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Signals */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Top Signals Today</h2>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>
          
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            {topSignals.map((signal) => (
              <SignalCard key={signal.id} signal={signal} />
            ))}
          </div>
        </div>

        {/* Recent Performance */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Recent Performance</h2>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Position History</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentPerformance.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      item.type === "profit" ? "bg-success/10" : "bg-danger/10"
                    }`}>
                      {item.type === "profit" ? (
                        <ArrowUpRight className="h-4 w-4 text-success" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 text-danger" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{item.asset}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.type === "profit" ? "Closed" : "Stop Loss"}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-medium text-sm ${
                      item.type === "profit" ? "text-success" : "text-danger"
                    }`}>
                      {item.profit > 0 ? "+" : ""}${item.profit}
                    </p>
                    <p className={`text-xs ${
                      item.type === "profit" ? "text-success" : "text-danger"
                    }`}>
                      {item.percentage > 0 ? "+" : ""}{item.percentage}%
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full bg-gradient-primary">
                <TrendingUp className="h-4 w-4 mr-2" />
                View All Signals
              </Button>
              <Button variant="outline" className="w-full">
                <Target className="h-4 w-4 mr-2" />
                Portfolio Analysis
              </Button>
              <Button variant="outline" className="w-full">
                <Activity className="h-4 w-4 mr-2" />
                Market Overview
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
