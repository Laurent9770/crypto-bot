import { useState, useEffect } from "react";
import { SignalCard, TradingSignal } from "@/components/trading/SignalCard";
import { io } from "socket.io-client";

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://flask-backend.onrender.com';
const socket = io(VITE_BACKEND_URL, {
  transports: ["websocket"],
  withCredentials: true,
});

const Spot = () => {
  const [signals, setSignals] = useState<TradingSignal[] | null>(null);

  useEffect(() => {
    socket.on("signal_update", (updatedSignals: TradingSignal[]) => {
      const spotSignals = updatedSignals.filter(s => s.type === "Spot");
      setSignals(spotSignals);
    });
    return () => {
      socket.off("signal_update");
    };
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Spot Trading Signals</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {signals === null ? (
          <div className="col-span-full flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          signals.map((signal) => (
            <SignalCard key={signal.id} signal={signal} />
          ))
        )}
      </div>
    </div>
  );
};

export default Spot; 