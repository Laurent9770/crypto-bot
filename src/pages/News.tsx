import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { NewsCard, NewsArticle } from '@/components/NewsCard';

const socket = io('http://localhost:5000');

const News = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);

  useEffect(() => {
    socket.on('news_update', (newArticle: NewsArticle) => {
      setArticles(prevArticles => [newArticle, ...prevArticles]);
    });

    return () => {
      socket.off('news_update');
    };
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Latest News</h1>
      {articles.length > 0 ? (
        <div className="space-y-6">
          {articles.map(article => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <p>Waiting for news...</p>
      )}
    </div>
  );
};

export default News; 