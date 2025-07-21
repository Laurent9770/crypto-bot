import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, TrendingUp, Target, Zap, Shield, Users } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to the Trading App</h1>
      <p>Select a trading category from the navigation bar to get started.</p>
    </div>
  );
};

export default Home; 