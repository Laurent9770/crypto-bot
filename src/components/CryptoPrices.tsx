import React from "react";
import { useCryptoPrices } from "@/hooks/useCryptoPrices";
import { useLivePriceUpdates } from "@/hooks/useLivePriceUpdates";
import { usePriceStore } from "@/state/usePriceStore";

const CryptoPrices: React.FC = () => {
  useLivePriceUpdates();
  const { isLoading, isError } = useCryptoPrices();
  const prices = usePriceStore((s) => s.prices);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading prices.</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-primary">Live Crypto Prices</h2>
      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full bg-card/80 border border-border/30 text-foreground chart-glow">
          <thead>
            <tr>
              <th className="px-4 py-2">Symbol</th>
              <th className="px-4 py-2">Price</th>
            </tr>
          </thead>
          <tbody>
            {prices.map((p, idx) => (
              <tr key={idx} className="hover:bg-muted/10 transition">
                <td className="px-4 py-2 font-mono">{p.symbol}</td>
                <td className="px-4 py-2 font-semibold">${p.price.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CryptoPrices; 