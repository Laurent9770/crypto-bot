import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export interface NewsArticle {
  id: number;
  source: string;
  headline: string;
  summary: string;
  url: string;
  timestamp: string;
}

export const NewsCard = ({ article }: { article: NewsArticle }) => {
  return (
    <Card className="bg-card/50 border-border/50 hover:shadow-glow transition-all">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{article.headline}</CardTitle>
            <CardDescription>{new Date(article.timestamp).toLocaleString()}</CardDescription>
          </div>
          <Badge>{article.source}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{article.summary}</p>
        <Button asChild variant="outline" size="sm">
          <a href={article.url} target="_blank" rel="noopener noreferrer">
            Read More <ExternalLink className="h-4 w-4 ml-2" />
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}; 