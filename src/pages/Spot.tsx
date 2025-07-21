import { useState, useEffect } from "react";
import { SignalCard, TradingSignal } from "@/components/trading/SignalCard";
import io from "socket.io-client";

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
const socket = io(VITE_BACKEND_URL);

const Spot = () => {
  const [signals, setSignals] = useState<TradingSignal[]>([]);

  useEffect(() => {
    // Listen for initial signals and updates
    socket.on("signal_update", (updatedSignals: TradingSignal[]) => {
      const spotSignals = updatedSignals.filter(s => s.type === "Spot");
      setSignals(spotSignals);
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.off("signal_update");
    };
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Spot Trading Signals</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {signals.length > 0 ? (
          signals.map((signal) => (
            <SignalCard key={signal.id} signal={signal} />
          ))
        ) : (
          <p>Waiting for signals...</p>
        )}
      </div>
    </div>
  );
};

export default Spot; 