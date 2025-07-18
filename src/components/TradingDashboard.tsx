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

const TradingDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [marketData, setMarketData] = useState([]);
  const [signals, setSignals] = useState([]);
  const [loadingMarkets, setLoadingMarkets] = useState(true);
  const [loadingSignals, setLoadingSignals] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/crypto_prices`)
      .then((res) => res.json())
      .then((data) => {
        setMarketData(data);
        setLoadingMarkets(false);
      });
    fetch(`${import.meta.env.VITE_API_URL}/api/signals`)
      .then((res) => res.json())
      .then((data) => {
        setSignals(data);
        setLoadingSignals(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
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
            <Button variant="ghost" size="icon">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="w-5 h-5" />
            </Button>
            <Button variant="outline" className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>Login</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          {/* Portfolio Overview Cards */}
          <Card className="animate-fade-in">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$12,345.67</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's P&L</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">+$456.23</div>
              <p className="text-xs text-muted-foreground">
                +3.7% today
              </p>
            </CardContent>
          </Card>

          <Card className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Trades</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">
                3 winning, 2 losing
              </p>
            </CardContent>
          </Card>

          <Card className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">73.2%</div>
              <p className="text-xs text-muted-foreground">
                Last 30 days
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="signals">Signals</TabsTrigger>
            <TabsTrigger value="markets">Markets</TabsTrigger>
            <TabsTrigger value="subscription">Subscription</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Trading Chart Placeholder */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Trading Chart</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-96 bg-muted/30 rounded-lg flex items-center justify-center border-2 border-dashed border-border">
                    <div className="text-center space-y-2">
                      <BarChart3 className="w-16 h-16 text-muted-foreground mx-auto" />
                      <p className="text-muted-foreground">TradingView Chart Integration</p>
                      <p className="text-sm text-muted-foreground">Real-time market data and analysis</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="signals" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Trading Signals</CardTitle>
              </CardHeader>
              <CardContent>
                {loadingSignals ? (
                  <div>Loading signals...</div>
                ) : (
                  <div className="space-y-4">
                    {signals.map((signal, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <Badge variant={signal.type === "BUY" ? "default" : "destructive"}>
                            {signal.type}
                          </Badge>
                          <div>
                            <p className="font-medium">{signal.pair}</p>
                            <p className="text-sm text-muted-foreground">Confidence: {signal.confidence}%</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="flex items-center space-x-1">
                            {signal.tier === "Diamond" && <Crown className="w-3 h-3" />}
                            <span>{signal.tier}</span>
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="markets" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Market Overview</CardTitle>
              </CardHeader>
              <CardContent>
                {loadingMarkets ? (
                  <div>Loading markets...</div>
                ) : (
                  <div className="space-y-4">
                    {marketData.map((market, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div>
                          <p className="font-medium">{market.symbol}</p>
                          <p className="text-2xl font-bold">{market.price}</p>
                        </div>
                        <div className="text-right">
                          <div className={`flex items-center space-x-1 ${market.isUp ? 'text-primary' : 'text-destructive'}`}>
                            {market.isUp ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                            <span className="font-medium">{market.change}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="subscription" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Subscription Tiers */}
              {[
                {
                  name: "Bronze",
                  price: "$100",
                  features: ["Basic signals", "Email alerts", "Community access"],
                  popular: false
                },
                {
                  name: "Premium",
                  price: "$250",
                  features: ["Advanced signals", "Real-time alerts", "Copy trading", "Priority support"],
                  popular: true
                },
                {
                  name: "Diamond",
                  price: "$500",
                  features: ["Exclusive signals", "Custom strategies", "Personal advisor", "API access"],
                  popular: false
                }
              ].map((plan, index) => (
                <Card key={index} className={`relative ${plan.popular ? 'border-primary animate-glow-pulse' : ''}`}>
                  {plan.popular && (
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                    </div>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="flex items-center justify-center space-x-2">
                      {plan.name === "Diamond" && <Crown className="w-5 h-5 text-primary" />}
                      <span>{plan.name}</span>
                    </CardTitle>
                    <div className="text-3xl font-bold">{plan.price}<span className="text-sm text-muted-foreground">/month</span></div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-2">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                      Pay with USDT
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Payment Networks */}
            <Card>
              <CardHeader>
                <CardTitle>Supported Payment Networks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-3 p-4 border border-border rounded-lg">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">TRC20 (TRON)</p>
                      <p className="text-sm text-muted-foreground">Low fees, fast confirmation</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-4 border border-border rounded-lg">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">BEP20 (BSC)</p>
                      <p className="text-sm text-muted-foreground">Binance Smart Chain</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-4 border border-border rounded-lg">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">ERC20 (Ethereum)</p>
                      <p className="text-sm text-muted-foreground">Most secure network</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default TradingDashboard;