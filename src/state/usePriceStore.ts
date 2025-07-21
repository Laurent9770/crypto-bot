import { create } from 'zustand';

export type Price = {
  symbol: string;
  price: number;
};

interface PriceState {
  prices: Price[];
  setPrices: (prices: Price[]) => void;
}

export const usePriceStore = create<PriceState>((set) => ({
  prices: [],
  setPrices: (prices) => set({ prices }),
})); 