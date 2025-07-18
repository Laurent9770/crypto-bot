import React, { useEffect, useState } from "react";

const APIAccess: React.FC = () => {
  const [apiKey, setApiKey] = useState("");
  const [usage, setUsage] = useState(0);
  const [recentCalls, setRecentCalls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/api_keys`)
      .then(res => res.json())
      .then(data => setApiKey(data.key || ""));
    fetch(`${import.meta.env.VITE_API_URL}/api/api_usage`)
      .then(res => res.json())
      .then(data => {
        setUsage(data.usage || 0);
        setRecentCalls(data.recent || []);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-primary">API Access</h1>
      {loading ? (
        <div>Loading API data...</div>
      ) : (
        <>
          <div className="mb-8">
            <div className="font-semibold">API Key:</div>
            <div className="bg-muted rounded p-2 font-mono break-all mb-2">{apiKey}</div>
            <div className="text-sm text-muted-foreground mb-2">Usage: {usage} calls</div>
          </div>
          <div>
            <div className="font-semibold mb-2">Recent API Calls</div>
            <ul className="text-xs">
              {recentCalls.map((call, i) => (
                <li key={i}>{call.endpoint} - {call.timestamp}</li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default APIAccess; 