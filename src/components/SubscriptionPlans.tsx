import { Check, Crown, Star, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const plans = [
  {
    name: "Bronze",
    price: "$100",
    period: "/month",
    description: "Perfect for getting started with crypto trading",
    badge: null,
    features: [
      "Basic TradingView charts",
      "Limited trading signals",
      "Spot trading access",
      "Email support",
      "Basic portfolio tracking",
      "Mobile app access"
    ],
    buttonVariant: "outline" as const,
    popular: false,
  },
  {
    name: "Premium", 
    price: "$250",
    period: "/month",
    description: "Advanced features for serious traders",
    badge: "Most Popular",
    features: [
      "Advanced TradingView charts",
      "Unlimited trading signals",
      "Spot, Margin & Futures trading",
      "Priority support",
      "Advanced portfolio analytics",
      "Copy trading features",
      "Real-time alerts",
      "Risk management tools"
    ],
    buttonVariant: "trading" as const,
    popular: true,
  },
  {
    name: "Diamond",
    price: "$500", 
    period: "/month",
    description: "Exclusive access for professional traders",
    badge: "Elite",
    features: [
      "Everything in Premium",
      "Personalized trading strategies",
      "Custom indicators",
      "High-frequency signals",
      "Dedicated account manager",
      "Advanced API access",
      "Institutional-grade tools",
      "White-label solutions",
      "24/7 phone support"
    ],
    buttonVariant: "premium" as const,
    popular: false,
  }
];

export const SubscriptionPlans = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-sm px-3 py-1">
            <Crown className="w-4 h-4 mr-2" />
            Choose Your Plan
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Subscription <span className="bg-gradient-accent bg-clip-text text-transparent">Plans</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            All payments processed securely in USDT via TRC20, BEP20, or ERC20 networks
          </p>
        </div>

        {/* Payment networks */}
        <div className="flex justify-center gap-4 mb-12">
          <div className="flex items-center gap-2 bg-card/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-border/50">
            <div className="w-3 h-3 bg-success rounded-full" />
            <span className="text-sm font-medium">TRC20</span>
          </div>
          <div className="flex items-center gap-2 bg-card/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-border/50">
            <div className="w-3 h-3 bg-accent rounded-full" />
            <span className="text-sm font-medium">BEP20</span>
          </div>
          <div className="flex items-center gap-2 bg-card/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-border/50">
            <div className="w-3 h-3 bg-primary rounded-full" />
            <span className="text-sm font-medium">ERC20</span>
          </div>
        </div>

        {/* Plans grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={plan.name} 
              className={`relative bg-gradient-card border-border/50 hover:border-primary/30 transition-all duration-300 ${
                plan.popular ? 'scale-105 border-primary/50 shadow-glow' : 'hover:scale-102'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge variant="outline" className="bg-gradient-primary text-primary-foreground border-primary/30 shadow-glow">
                    <Star className="w-3 h-3 mr-1" />
                    {plan.badge}
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-8">
                <div className="flex justify-center mb-4">
                  {plan.name === 'Bronze' && <Zap className="w-8 h-8 text-muted-foreground" />}
                  {plan.name === 'Premium' && <Star className="w-8 h-8 text-primary" />}
                  {plan.name === 'Diamond' && <Crown className="w-8 h-8 text-accent" />}
                </div>
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <CardDescription className="text-muted-foreground">{plan.description}</CardDescription>
                <div className="flex items-baseline justify-center gap-1 mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  variant={plan.buttonVariant}
                  className="w-full text-lg py-6"
                  size="lg"
                >
                  {plan.name === 'Diamond' ? 'Go Elite' : `Get ${plan.name}`}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Payment info */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">
            Secure cryptocurrency payments powered by blockchain technology
          </p>
          <div className="flex justify-center gap-8 text-sm text-muted-foreground">
            <div>✓ Instant verification</div>
            <div>✓ No chargebacks</div>
            <div>✓ Global accessibility</div>
            <div>✓ Low fees</div>
          </div>
        </div>
      </div>
    </section>
  );
};