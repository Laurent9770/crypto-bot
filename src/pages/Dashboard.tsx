import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, TrendingDown, DollarSign, Bot, Target, Activity, Zap } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area } from "recharts";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import CryptoPrices from '@/components/CryptoPrices';
import LiveChart from '@/components/LiveChart';

// Mock data
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
  const { toast } = useToast();
  const [showBotsModal, setShowBotsModal] = useState(false);
  const [showSignalsModal, setShowSignalsModal] = useState(false);
  const [showExecuteModal, setShowExecuteModal] = useState(false);
  const [showMonitorModal, setShowMonitorModal] = useState(false);

  const stats = [
    {
      title: "Total Balance",
      value: "$11,200.50",
      change: "+12.5%",
      changeType: "positive",
      icon: DollarSign,
      description: "Last 24 hours"
    },
    {
      title: "Today's P&L",
      value: "+$425.30",
      change: "+3.8%",
      changeType: "positive",
      icon: TrendingUp,
      description: "Active trades"
    },
    {
      title: "Win Rate",
      value: "82%",
      change: "+5.2%",
      changeType: "positive",
      icon: Target,
      description: "This month"
    },
    {
      title: "Active Signals",
      value: "12",
      change: "+2",
      changeType: "default", // changed from neutral to default
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
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-[1800px] mx-auto space-y-6">
        <CryptoPrices />
        <LiveChart symbol="BTCUSDT" />
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Trading Dashboard</h1>
            <p className="text-muted-foreground">Monitor your portfolio and trading performance</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant={activeBot ? "default" : "secondary"} className="bg-gradient-success cursor-pointer" onClick={() => setShowBotsModal(true)}>
              <Bot className="icon h-4 w-4 mr-1" />
              Bot {activeBot ? "Active" : "Inactive"}
            </Badge>
            <Dialog open={showBotsModal} onOpenChange={setShowBotsModal}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Active Bots</DialogTitle>
                </DialogHeader>
                <div>List of active bots and their status will appear here.</div>
              </DialogContent>
            </Dialog>
            <Button 
              variant="default"  /* changed from premium to default */
              size="sm" 
              onClick={() => navigate('/pricing')}
            >
              <Zap className="icon h-4 w-4 mr-2" />
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
                <stat.icon className="icon h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="flex items-center gap-2 mt-1">
                  <Badge 
                    variant={stat.changeType === "positive" ? "default" : "secondary"}
                    className={stat.changeType === "positive" ? "bg-gradient-success" : ""}
                  >
                    {stat.changeType === "positive" ? 
                      <TrendingUp className="icon h-3 w-3 mr-1" /> : 
                      <TrendingDown className="icon h-3 w-3 mr-1" />
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
        {/* ...rest of your code remains unchanged */}

      </div>
    </div>
  );
}
