import React, { useEffect, useState } from "react";

const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState([]);
  const [signals, setSignals] = useState([]);
  const [analytics, setAnalytics] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`${import.meta.env.VITE_API_URL}/api/users`).then(res => res.json()),
      fetch(`${import.meta.env.VITE_API_URL}/api/signals`).then(res => res.json()),
      fetch(`${import.meta.env.VITE_API_URL}/api/analytics`).then(res => res.json()),
    ]).then(([users, signals, analytics]) => {
      setUsers(users);
      setSignals(signals);
      setAnalytics(analytics);
      setLoading(false);
    });
  }, []);

  return (
    <div className="max-w-5xl mx-auto py-16 px-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-primary">Admin Dashboard</h1>
      {loading ? (
        <div>Loading admin data...</div>
      ) : (
        <>
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-2">Platform Analytics</h2>
            <div className="text-sm">Users: {analytics.userCount} | Active Subs: {analytics.activeSubs}</div>
          </div>
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-2">User Management</h2>
            <ul className="text-sm">
              {users.map((u, i) => (
                <li key={i}>{u.username} <button className="ml-2 text-destructive">Ban</button></li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">Signal Moderation</h2>
            <ul className="text-sm">
              {signals.map((s, i) => (
                <li key={i}>{s.pair} {s.type} <button className="ml-2 text-success">Approve</button> <button className="ml-2 text-destructive">Delete</button></li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard; 