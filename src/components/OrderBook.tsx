import React, { useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { create } from "zustand";

interface OrderBookState {
  bids: [number, number][];
  asks: [number, number][];
  setOrderBook: (bids: [number, number][], asks: [number, number][]) => void;
}

const useOrderBookStore = create<OrderBookState>((set) => ({
  bids: [],
  asks: [],
  setOrderBook: (bids, asks) => set({ bids, asks }),
}));

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://flask-backend.onrender.com';

function useOrderBook(symbol: string) {
  const setOrderBook = useOrderBookStore((s) => s.setOrderBook);
  useEffect(() => {
    const socket: Socket = io(VITE_BACKEND_URL, {
      transports: ["websocket"],
      withCredentials: true,
    });
    socket.emit("subscribe_order_book", { symbol });
    socket.on("order_book_update", (data) => {
      if (data.symbol === symbol) {
        setOrderBook(data.bids, data.asks);
      }
    });
    return () => {
      socket.emit("unsubscribe_order_book", { symbol });
      socket.disconnect();
    };
  }, [symbol, setOrderBook]);
  const bids = useOrderBookStore((s) => s.bids);
  const asks = useOrderBookStore((s) => s.asks);
  return { bids, asks };
}

interface OrderBookProps {
  symbol: string;
}

const OrderBook: React.FC<OrderBookProps> = ({ symbol }) => {
  const { bids, asks } = useOrderBook(symbol);

  return (
    <div className="bg-card/80 rounded-xl shadow-lg border-2 border-primary/40 chart-glow p-6 my-8">
      <h2 className="text-lg font-bold mb-4 text-primary">Order Book ({symbol})</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="font-semibold mb-2">Bids</div>
          <table className="w-full text-xs">
            <thead><tr><th>Price</th><th>Amount</th></tr></thead>
            <tbody>
              {bids.slice(0, 10).map((bid, i) => (
                <tr key={i}>
                  <td><span className="rounded-full px-2 py-1 bg-success/20 text-success font-mono pill-shaped">{bid[0]}</span></td>
                  <td className="font-mono">{bid[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <div className="font-semibold mb-2">Asks</div>
          <table className="w-full text-xs">
            <thead><tr><th>Price</th><th>Amount</th></tr></thead>
            <tbody>
              {asks.slice(0, 10).map((ask, i) => (
                <tr key={i}>
                  <td><span className="rounded-full px-2 py-1 bg-destructive/20 text-destructive font-mono pill-shaped">{ask[0]}</span></td>
                  <td className="font-mono">{ask[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderBook; 