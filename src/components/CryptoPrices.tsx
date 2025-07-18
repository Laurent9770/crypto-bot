import React, { useEffect, useState } from "react";

type CryptoPrice = {
  symbol: string;
  exchange: string;
  price: number;
  volume: number;
  timestamp: number | string;
};

const CryptoPrices: React.FC = () => {
  const [prices, setPrices] = useState<CryptoPrice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/crypto_prices`)
      .then((res) => res.json())
      .then((data) => {
        setPrices(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Live Crypto Prices</h2>
      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Exchange</th>
            <th>Price</th>
            <th>Volume</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {prices.map((p, idx) => (
            <tr key={idx}>
              <td>{p.symbol}</td>
              <td>{p.exchange}</td>
              <td>{p.price}</td>
              <td>{p.volume}</td>
              <td>{new Date(Number(p.timestamp)).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoPrices; 