import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export function useSignals(symbol?: string) {
  return useQuery({
    queryKey: ['signals', symbol],
    queryFn: async () => {
      const { data } = await axios.get('/api/signals', { params: { symbol } });
      return data;
    },
    enabled: !!symbol,
  });
} 