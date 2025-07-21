import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

interface NewsArticle {
  id: number;
  source: string;
  headline: string;
  summary: string;
  url: string;
  timestamp: string;
}

export default function NewsPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get('/api/news')
      .then(res => setArticles(res.data))
      .catch(() => setArticles([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Latest News</h1>
      {loading ? (
        <p>Loading news...</p>
      ) : (
        <div className="space-y-6">
          {articles.map(article => (
            <Card key={article.id}>
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
          ))}
        </div>
      )}
    </div>
  );
} 