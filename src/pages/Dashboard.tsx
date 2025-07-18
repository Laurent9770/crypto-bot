import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, TrendingDown, DollarSign, BarChart3, Users, Activity, Wallet, Bot, Target, Zap } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area } from "recharts";
import { useNavigate } from "react-router-dom";

// Mock data for charts
const portfolioData = [
  { time: "00:00", value: 10000, profit: 0 },
  { time: "04:00", value: 10250, profit: 250 },
  { time: "08:00", value: 10180, profit: 180 },
  { time: "12:00", value: 10420, profit: 420 },
  { time: "16:00", value: 10650, profit: 650 },
  { time: "20:00", value: 10800, profit: 800 },
  { time: "24:00", value: 11200, profit: 1200 },
];

const tradingPerformanceData = [
  { month: "Jan", wins: 65, losses: 35 },
  { month: "Feb", wins: 72, losses: 28 },
  { month: "Mar", wins: 68, losses: 32 },
  { month: "Apr", wins: 75, losses: 25 },
  { month: "May", wins: 78, losses: 22 },
  { month: "Jun", wins: 82, losses: 18 },
];

export default function Dashboard() {
  const [activeBot, setActiveBot] = useState(true);
  const navigate = useNavigate();

  const stats = [
    {
      title: "Total Balance",
      value: "$11,200.50",
      change: "+12.5%",
      changeType: "positive" as const,
      icon: DollarSign,
      description: "Last 24 hours"
    },
    {
      title: "Today's P&L", 
      value: "+$425.30",
      change: "+3.8%",
      changeType: "positive" as const,
      icon: TrendingUp,
      description: "Active trades"
    },
    {
      title: "Win Rate",
      value: "82%",
      change: "+5.2%",
      changeType: "positive" as const,
      icon: Target,
      description: "This month"
    },
    {
      title: "Active Signals",
      value: "12",
      change: "+2",
      changeType: "neutral" as const,
      icon: Activity,
      description: "Currently running"
    }
  ];

  const recentTrades = [
    { pair: "BTC/USDT", type: "BUY", amount: "0.5 BTC", price: "$67,340", pnl: "+$234.50", status: "Closed" },
    { pair: "ETH/USDT", type: "SELL", amount: "2.5 ETH", price: "$3,245", pnl: "+$89.25", status: "Open" },
    { pair: "ADA/USDT", type: "BUY", amount: "1000 ADA", price: "$0.58", pnl: "-$12.30", status: "Open" },
    { pair: "SOL/USDT", type: "BUY", amount: "10 SOL", price: "$142", pnl: "+$45.80", status: "Closed" },
  ];

  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Trading Dashboard</h1>
          <p className="text-muted-foreground">Monitor your portfolio and trading performance</p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant={activeBot ? "default" : "secondary"} className="bg-gradient-success">
            <Bot className="w-4 h-4 mr-1" />
            Bot {activeBot ? "Active" : "Inactive"}
          </Badge>
          <Button variant="premium" className="animate-glow">
            <Zap className="w-4 h-4 mr-2" />
            Upgrade Plan
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-gradient-card border-border/50 shadow-card hover:shadow-glow transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="flex items-center gap-2 mt-1">
                <Badge 
                  variant={stat.changeType === "positive" ? "default" : "secondary"}
                  className={stat.changeType === "positive" ? "bg-gradient-success" : ""}
                >
                  {stat.changeType === "positive" ? 
                    <TrendingUp className="w-3 h-3 mr-1" /> : 
                    <TrendingDown className="w-3 h-3 mr-1" />
                  }
                  {stat.change}
                </Badge>
                <span className="text-xs text-muted-foreground">{stat.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gradient-card border-border/50 shadow-card">
          <CardHeader>
            <CardTitle className="text-foreground">Portfolio Performance</CardTitle>
            <CardDescription>Your portfolio value over the last 24 hours</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={portfolioData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--chart-grid))" />
                <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--popover))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)"
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="hsl(var(--primary))" 
                  fill="url(#portfolioGradient)" 
                  strokeWidth={2}
                />
                <defs>
                  <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border/50 shadow-card">
          <CardHeader>
            <CardTitle className="text-foreground">Trading Performance</CardTitle>
            <CardDescription>Win/Loss ratio over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={tradingPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--chart-grid))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--popover))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)"
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="wins" 
                  stroke="hsl(var(--success))" 
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--success))", strokeWidth: 2, r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="losses" 
                  stroke="hsl(var(--destructive))" 
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--destructive))", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="trades" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 lg:w-[400px]">
          <TabsTrigger value="trades">Recent Trades</TabsTrigger>
          <TabsTrigger value="signals">Bot Signals</TabsTrigger>
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="trades" className="space-y-4">
          <Card className="bg-gradient-card border-border/50 shadow-card">
            <CardHeader>
              <CardTitle className="text-foreground">Recent Trades</CardTitle>
              <CardDescription>Your latest trading activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTrades.map((trade, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-border/50 bg-muted/20 hover:bg-muted/40 transition-colors">
                    <div className="flex items-center gap-4">
                      <Badge variant={trade.type === "BUY" ? "default" : "secondary"} 
                             className={trade.type === "BUY" ? "bg-gradient-success" : "bg-destructive"}>
                        {trade.type}
                      </Badge>
                      <div>
                        <p className="font-semibold text-foreground">{trade.pair}</p>
                        <p className="text-sm text-muted-foreground">{trade.amount} @ {trade.price}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${trade.pnl.startsWith('+') ? 'text-success' : 'text-destructive'}`}>
                        {trade.pnl}
                      </p>
                      <p className="text-sm text-muted-foreground">{trade.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="signals" className="space-y-4">
          <Card className="bg-gradient-card border-border/50 shadow-card">
            <CardHeader>
              <CardTitle className="text-foreground">Active Bot Signals</CardTitle>
              <CardDescription>AI-generated trading signals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg border border-border/50 bg-muted/20">
                  <div className="flex items-center gap-4">
                    <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                    <div>
                      <p className="font-semibold text-foreground">BTC/USDT - Strong Buy</p>
                      <p className="text-sm text-muted-foreground">Confidence: 92% • Target: $68,500</p>
                    </div>
                  </div>
                  <Button size="sm" variant="premium">Execute</Button>
                </div>
                
                <div className="flex items-center justify-between p-4 rounded-lg border border-border/50 bg-muted/20">
                  <div className="flex items-center gap-4">
                    <div className="w-3 h-3 bg-accent rounded-full animate-pulse"></div>
                    <div>
                      <p className="font-semibold text-foreground">ETH/USDT - Hold</p>
                      <p className="text-sm text-muted-foreground">Confidence: 78% • Wait for breakout</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => navigate("/monitor/ethusdt")}>Monitor</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="portfolio" className="space-y-4">
          <Card className="bg-gradient-card border-border/50 shadow-card">
            <CardHeader>
              <CardTitle className="text-foreground">Portfolio Allocation</CardTitle>
              <CardDescription>Your current asset distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-foreground font-medium">Bitcoin (BTC)</span>
                    <span className="text-foreground">45%</span>
                  </div>
                  <Progress value={45} className="h-2" />
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-foreground font-medium">Ethereum (ETH)</span>
                    <span className="text-foreground">30%</span>
                  </div>
                  <Progress value={30} className="h-2" />
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-foreground font-medium">Altcoins</span>
                    <span className="text-foreground">20%</span>
                  </div>
                  <Progress value={20} className="h-2" />
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-foreground font-medium">USDT (Cash)</span>
                    <span className="text-foreground">5%</span>
                  </div>
                  <Progress value={5} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card className="bg-gradient-card border-border/50 shadow-card">
            <CardHeader>
              <CardTitle className="text-foreground">Price Alerts</CardTitle>
              <CardDescription>Your active price notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg border border-border/50 bg-muted/20">
                  <div>
                    <p className="font-semibold text-foreground">BTC/USDT {">"} $70,000</p>
                    <p className="text-sm text-muted-foreground">Price alert • Currently: $67,340</p>
                  </div>
                  <Badge variant="outline">Active</Badge>
                </div>
                
                <div className="flex items-center justify-between p-4 rounded-lg border border-border/50 bg-muted/20">
                  <div>
                    <p className="font-semibold text-foreground">ETH/USDT {"<"} $3,000</p>
                    <p className="text-sm text-muted-foreground">Support level • Currently: $3,245</p>
                  </div>
                  <Badge variant="outline">Active</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}