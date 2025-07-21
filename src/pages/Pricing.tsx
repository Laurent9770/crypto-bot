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

const Pricing = () => {
  const navigate = useNavigate();

  const handlePlanSelection = (planName: string) => {
    // Navigate to registration/payment page with plan info
    navigate('/register', { state: { selectedPlan: planName } });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Pricing</h1>
      <p>This is a placeholder for the pricing plans.</p>
    </div>
  );
};

export default Pricing; 