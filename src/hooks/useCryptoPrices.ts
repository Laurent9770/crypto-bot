import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export function useCryptoPrices() {
  return useQuery({
    queryKey: ['crypto-prices'],
    queryFn: async () => {
      const { data } = await axios.get('/api/prices');
      return data;
    },
  });
} 