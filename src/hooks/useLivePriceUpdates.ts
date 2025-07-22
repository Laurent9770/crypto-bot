import { useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { usePriceStore } from '../state/usePriceStore';

let socket: Socket | null = null;

export function useLivePriceUpdates() {
  const setPrices = usePriceStore((s) => s.setPrices);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://flask-backend.onrender.com';

  useEffect(() => {
    if (!socket) {
      // Configure socket with proper options
      socket = io(BACKEND_URL, {
        transports: ['websocket'],
        withCredentials: true,
        secure: true,
        rejectUnauthorized: false,
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        reconnectionAttempts: 5
      });

      // Add error handling
      socket.on('connect_error', (error) => {
        console.error('WebSocket connection error:', error);
      });

      socket.on('connect', () => {
        console.log('WebSocket connected successfully');
      });

      socket.on('disconnect', (reason) => {
        console.log('WebSocket disconnected:', reason);
      });
    }

    socket.on('price_update', setPrices);
    
    return () => {
      socket?.off('price_update', setPrices);
    };
  }, [setPrices]);
} 