import React, { useEffect, useState } from "react";

const OrderBook: React.FC = () => {
  const [bids, setBids] = useState([]);
  const [asks, setAsks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/order_book?symbol=BTCUSDT`)
      .then((res) => res.json())
      .then((data) => {
        setBids(data.bids || []);
        setAsks(data.asks || []);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-card/60 rounded-xl shadow-md border border-border/40 p-6 my-8">
      <h2 className="text-lg font-bold mb-4 text-primary">Order Book (BTC/USDT)</h2>
      {loading ? (
        <div>Loading order book...</div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="font-semibold mb-2">Bids</div>
            <table className="w-full text-xs">
              <thead><tr><th>Price</th><th>Amount</th></tr></thead>
              <tbody>
                {bids.map((bid, i) => (
                  <tr key={i} className="text-success"><td>{bid[0]}</td><td>{bid[1]}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <div className="font-semibold mb-2">Asks</div>
            <table className="w-full text-xs">
              <thead><tr><th>Price</th><th>Amount</th></tr></thead>
              <tbody>
                {asks.map((ask, i) => (
                  <tr key={i} className="text-destructive"><td>{ask[0]}</td><td>{ask[1]}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderBook; 