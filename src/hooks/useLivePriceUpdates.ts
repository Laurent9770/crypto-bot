import { useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { usePriceStore } from '../state/usePriceStore';

let socket: Socket | null = null;

export function useLivePriceUpdates() {
  const setPrices = usePriceStore((s) => s.setPrices);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

  useEffect(() => {
    if (!socket) {
      socket = io(BACKEND_URL, { transports: ['websocket'] });
    }
    socket.on('price_update', setPrices);
    return () => {
      socket?.off('price_update', setPrices);
    };
  }, [setPrices]);
} 