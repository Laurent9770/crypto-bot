import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export interface SentimentData {
  asset: string;
  score: number;
  source: string;
  trend: "positive" | "negative" | "neutral" | "very positive";
}

export const SentimentCard = ({ item }: { item: SentimentData }) => {
  const getTrendColor = () => {
    switch (item.trend) {
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
    <Card>
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
          <div className={`${getTrendColor()} rounded-full`}>
            <Progress value={item.score * 100} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}; 