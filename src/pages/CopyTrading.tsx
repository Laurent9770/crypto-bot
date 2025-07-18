import React, { useEffect, useState } from "react";

const CopyTrading: React.FC = () => {
  const [traders, setTraders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/top_traders`)
      .then((res) => res.json())
      .then((data) => {
        setTraders(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-primary">Copy Trading</h1>
      <p className="mb-8 text-muted-foreground text-lg">Follow and copy top-performing traders. Automate your strategy and learn from the best.</p>
      {loading ? (
        <div>Loading top traders...</div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {traders.map((trader, i) => (
            <div key={i} className="bg-card/60 rounded-xl shadow-md border border-border/40 p-6 flex flex-col items-center">
              <div className="text-xl font-bold mb-2">{trader.name}</div>
              <div className="text-success font-semibold mb-1">ROI: {trader.roi}%</div>
              <div className="text-muted-foreground text-sm mb-2">Followers: {trader.followers}</div>
              <button className="bg-primary text-primary-foreground font-semibold py-2 px-6 rounded-lg hover:bg-primary/90 transition">Copy</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CopyTrading; 