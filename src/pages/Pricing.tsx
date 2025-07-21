import React from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Star, Crown, Zap } from "lucide-react";


const plans = [
  {
    name: "Bronze",
    price: "$100/month",
    description: "Basic access to AI-powered signals, live charts, and 1 trading pair. Perfect for those getting started.",
    features: [
      "Access to basic signals",
      "Limited copy trading access",
      "USDT payments (TRC20, BEP20, ERC20)"
    ],
    cta: "Get Started"
  },
  {
    name: "Premium",
    price: "$250/month",
    description: "Unlock full TradingView integration, more indicators, and additional trading pairs.",
    features: [
      "Advanced AI signals",
      "Copy trading with unlimited traders",
      "Access to multiple trading pairs",
      "Full API access for developers"
    ],
    cta: "Get Started"
  },
  {
    name: "Diamond",
    price: "$500/month",
    description: "The ultimate plan for professional traders. Enjoy personalized strategies, priority support, and more.",
    features: [
      "Exclusive custom AI strategies",
      "High-frequency trade signals",
      "Access to all premium features and priority support"
    ],
    cta: "Get Started"
  }
];

const Pricing: React.FC = () => {
  const navigate = useNavigate();

  const handlePlanSelection = (planName: string) => {
    // Navigate to registration/payment page with plan info
    navigate('/register', { state: { selectedPlan: planName } });
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', width: '100%' }}>
      <div style={{ position: 'relative', zIndex: 1, fontFamily: 'Inter, Poppins, Satoshi, Arial, sans-serif', color: '#f5f6fa' }}>
        <div className="max-w-5xl mx-auto py-16 px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-primary">Choose Your Plan</h1>
          <p className="mb-8 text-muted-foreground text-lg">CryptoBot Pro offers multiple subscription plans to fit your needs. Whether you're just starting out or need advanced features, we have the right plan for you.</p>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {plans.map((plan, idx) => (
              <div key={plan.name} className="bg-card/60 rounded-xl shadow-md border border-border/40 p-8 flex flex-col items-center">
                {plan.name === "Bronze" && <Star className="icon w-8 h-8 text-primary mb-2" />}
                {plan.name === "Premium" && <Crown className="icon w-8 h-8 text-accent mb-2" />}
                {plan.name === "Diamond" && <Zap className="icon w-8 h-8 text-success mb-2" />}
                <h2 className="text-2xl font-bold mb-2 text-primary">{plan.name}</h2>
                <div className="text-3xl font-extrabold mb-2">{plan.price}</div>
                <p className="mb-4 text-muted-foreground text-sm text-center">{plan.description}</p>
                <ul className="mb-6 text-sm text-muted-foreground list-disc pl-5 text-left">
                  {plan.features.map((f, i) => <li key={i}>{f}</li>)}
                </ul>
                <Button
                  variant={plan.name === "Premium" ? "premium" : "outline"}
                  size="lg"
                  className="w-full"
                  onClick={() => handlePlanSelection(plan.name)}
                >
                  {plan.cta}
                </Button>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <p className="mb-4 text-muted-foreground">Select your plan and subscribe using USDT via TRC20, BEP20, or ERC20. No hidden fees, easy payments, and quick upgrades/downgrades.</p>
            <Button asChild size="lg" variant="premium" className="mr-4" onClick={() => handlePlanSelection('Basic')}>
              <Link to="/register">Start Free Trial</Link>
            </Button>
            <Button asChild size="lg" variant="outline" onClick={() => handlePlanSelection('Basic')}>
              <Link to="/register">Get Started</Link>
            </Button>
            <Button asChild size="lg" variant="premium" className="ml-4" onClick={() => handlePlanSelection('Enterprise')}>
              <Link to="/register">Contact Sales</Link>
            </Button>
          </div>
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-4 text-primary">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full max-w-2xl mx-auto">
              <AccordionItem value="q1">
                <AccordionTrigger>Is there a free trial?</AccordionTrigger>
                <AccordionContent>
                  Yes! You can start with a free trial before choosing a paid plan. No credit card required to start.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q2">
                <AccordionTrigger>How do I pay for my subscription?</AccordionTrigger>
                <AccordionContent>
                  All payments are made securely using USDT (TRC20, BEP20, or ERC20). You can manage your payment method in your account settings.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q3">
                <AccordionTrigger>Can I upgrade or downgrade my plan?</AccordionTrigger>
                <AccordionContent>
                  Yes, you can change your plan at any time from your dashboard. Upgrades and downgrades are instant.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q4">
                <AccordionTrigger>What happens if my payment fails?</AccordionTrigger>
                <AccordionContent>
                  If a payment fails, you will be notified and given a grace period to update your payment method before your subscription is paused.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Pricing; 