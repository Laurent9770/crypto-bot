import { 
  TrendingUp, 
  Shield, 
  Zap, 
  BarChart3, 
  Users, 
  Bell,
  Cpu,
  Globe,
  Lock
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: TrendingUp,
    title: "Multi-Market Trading",
    description: "Trade Spot, Margin, and Futures with advanced order types and risk management tools.",
    color: "text-success",
  },
  {
    icon: BarChart3,
    title: "TradingView Integration", 
    description: "Professional charting with 100+ indicators, drawing tools, and real-time market data.",
    color: "text-primary",
  },
  {
    icon: Cpu,
    title: "AI-Powered Signals",
    description: "Advanced algorithms analyze market patterns to deliver high-accuracy trading signals.",
    color: "text-accent",
  },
  {
    icon: Users,
    title: "Copy Trading",
    description: "Follow and automatically copy trades from top-performing traders in real-time.",
    color: "text-primary",
  },
  {
    icon: Bell,
    title: "Real-Time Alerts",
    description: "Instant notifications for price movements, signal generation, and portfolio changes.",
    color: "text-success",
  },
  {
    icon: Shield,
    title: "USDT Payments",
    description: "Secure cryptocurrency payments via TRC20, BEP20, and ERC20 networks.",
    color: "text-accent",
  },
  {
    icon: Lock,
    title: "Bank-Grade Security",
    description: "Multi-layer security with 2FA, encryption, and cold storage protection.",
    color: "text-destructive",
  },
  {
    icon: Globe,
    title: "Global Access",
    description: "24/7 trading access from anywhere in the world with mobile and desktop apps.",
    color: "text-primary",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Sub-millisecond execution speeds with dedicated servers and optimized infrastructure.",
    color: "text-accent",
  }
];

export const FeaturesSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-success/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Powerful <span className="bg-gradient-primary bg-clip-text text-transparent">Features</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need for professional cryptocurrency trading, 
            powered by cutting-edge technology and real-time market data.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="group bg-gradient-card border-border/50 hover:border-primary/30 transition-all duration-300 hover:scale-105 hover:shadow-card"
            >
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className={`icon w-6 h-6 ${feature.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 bg-gradient-primary px-6 py-3 rounded-full text-sm font-medium shadow-glow">
            <Zap className="icon w-4 h-4" />
            <span>Join thousands of successful traders today</span>
          </div>
        </div>
      </div>
    </section>
  );
};