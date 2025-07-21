import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { SentimentCard, SentimentData } from '@/components/SentimentCard';

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
const socket = io(VITE_BACKEND_URL);

const Sentiment = () => {
  const [sentiment, setSentiment] = useState<SentimentData[]>([]);

  useEffect(() => {
    socket.on('sentiment_update', (updatedSentiment: SentimentData[]) => {
      setSentiment(updatedSentiment);
    });

    return () => {
      socket.off('sentiment_update');
    };
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Market Sentiment</h1>
      {sentiment.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sentiment.map((item, idx) => (
            <SentimentCard key={idx} item={item} />
          ))}
        </div>
      ) : (
        <p>Waiting for sentiment data...</p>
      )}
    </div>
  );
};

export default Sentiment; 