import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface SentimentData {
  asset: string;
  score: number;
  source: string;
  trend: string;
}

export default function SentimentPage() {
  const [sentiment, setSentiment] = useState<SentimentData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get('/api/sentiment')
      .then(res => setSentiment(res.data))
      .catch(() => setSentiment([]))
      .finally(() => setLoading(false));
  }, []);

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'positive':
      case 'very positive':
        return 'bg-success';
      case 'negative':
        return 'bg-destructive';
      default:
        return 'bg-muted-foreground';
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Market Sentiment</h1>
      {loading ? (
        <p>Loading sentiment data...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sentiment.map((item, idx) => (
            <Card key={idx}>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>{item.asset}</CardTitle>
                  <Badge>{item.source}</Badge>
                </div>
                <CardDescription>
                  Overall Trend: <span className={`font-semibold ${
                    item.trend === 'positive' || item.trend === 'very positive' ? 'text-success' : 
                    item.trend === 'negative' ? 'text-destructive' : 'text-muted-foreground'
                  }`}>{item.trend}</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p>Sentiment Score: {(item.score * 100).toFixed(0)}</p>
                  <Progress value={item.score * 100} className={getTrendColor(item.trend)} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
} 