import React, { useEffect, useState } from "react";
import AnalyticsCharts from "@/components/AnalyticsCharts";

const Portfolio: React.FC = () => {
  const [allocation, setAllocation] = useState([]);
  const [pnl, setPnl] = useState([]);
  const [risk, setRisk] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/portfolio`)
      .then((res) => res.json())
      .then((data) => {
        setAllocation(data.allocation || []);
        setPnl(data.pnl || []);
        setRisk(data.risk || null);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-primary">Portfolio Analytics</h1>
      <p className="mb-8 text-muted-foreground text-lg">Analyze your portfolio allocation, P&L, and risk metrics in real time.</p>
      {loading ? (
        <div className="text-center text-muted-foreground">Loading portfolio data...</div>
      ) : (
        <AnalyticsCharts />
      )}
    </div>
  );
};

export default Portfolio; 