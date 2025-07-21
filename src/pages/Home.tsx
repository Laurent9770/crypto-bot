import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, TrendingUp, Target, Zap, Shield, Users } from "lucide-react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-dark">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <Badge className="bg-primary/10 text-primary border-primary/20">
            AI-Powered Trading Intelligence
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Smart Trading
            <br />
            Signals Platform
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get real-time AI-powered trading signals for Spot, Futures, Options, and Margin trading with 90%+ accuracy
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-gradient-primary text-white shadow-glow">
              <Link to="/dashboard">Start Trading</Link>
            </Button>
            <Button variant="outline" size="lg">
              View Live Demo
            </Button>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { icon: TrendingUp, title: "Multi-Asset Signals", desc: "Spot, Futures, Options, Margin & Copy trading signals" },
            { icon: Target, title: "90%+ Accuracy", desc: "AI-powered analysis with proven track record" },
            { icon: Zap, title: "Real-Time Updates", desc: "Live market data and instant notifications" },
            { icon: Shield, title: "Risk Management", desc: "Smart stop-loss and position sizing" },
            { icon: BarChart3, title: "Advanced Analytics", desc: "Comprehensive market intelligence" },
            { icon: Users, title: "Copy Trading", desc: "Follow top performing traders" }
          ].map((feature, i) => (
            <Card key={i} className="bg-card/50 border-border/50 hover:shadow-glow transition-all">
              <CardHeader>
                <feature.icon className="h-10 w-10 text-primary mb-2" />
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
} 