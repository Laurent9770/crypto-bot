import React, { useEffect, useState } from "react";

const AnalyticsCharts: React.FC = () => {
  const [pnl, setPnl] = useState([]);
  const [winRate, setWinRate] = useState([]);
  const [volume, setVolume] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/analytics/pnl`).then(res => res.json()).then(setPnl);
    fetch(`${import.meta.env.VITE_API_URL}/api/analytics/winrate`).then(res => res.json()).then(setWinRate);
    fetch(`${import.meta.env.VITE_API_URL}/api/analytics/volume`).then(res => res.json()).then(data => {
      setVolume(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="my-8">
      <h2 className="text-lg font-bold mb-4 text-primary">Advanced Analytics</h2>
      {loading ? (
        <div>Loading analytics...</div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-card/60 rounded-xl shadow-md border border-border/40 p-6">
            <div className="font-semibold mb-2">P&L Over Time</div>
            <ul className="text-xs">
              {pnl.map((p, i) => (
                <li key={i}>{p.date}: {p.value}</li>
              ))}
            </ul>
          </div>
          <div className="bg-card/60 rounded-xl shadow-md border border-border/40 p-6">
            <div className="font-semibold mb-2">Win Rate</div>
            <ul className="text-xs">
              {winRate.map((w, i) => (
                <li key={i}>{w.date}: {w.value}%</li>
              ))}
            </ul>
          </div>
          <div className="bg-card/60 rounded-xl shadow-md border border-border/40 p-6">
            <div className="font-semibold mb-2">Volume</div>
            <ul className="text-xs">
              {volume.map((v, i) => (
                <li key={i}>{v.date}: {v.value}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyticsCharts; 