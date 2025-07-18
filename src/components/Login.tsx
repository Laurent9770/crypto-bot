import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert } from "@/components/ui/alert";
import { Link, useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        setSuccess(true);
        setTimeout(() => {
          navigate("/dashboard");
        }, 1200); // 1.2s delay to show success message
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground px-4">
      <Card className="w-full max-w-md shadow-xl border border-border/60 bg-card/80 rounded-2xl">
        <CardHeader className="text-center bg-gradient-to-r from-yellow-400/80 to-yellow-500/90 rounded-t-2xl p-6">
          <CardTitle className="text-2xl font-bold text-[#222] tracking-tight">Sign In to Your Account</CardTitle>
        </CardHeader>
        <CardContent className="p-8 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-lg font-semibold text-white">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                className="bg-background border border-border/60 rounded-lg px-4 py-2 text-lg text-white focus:border-yellow-400 focus:ring-yellow-400"
                placeholder="Enter your username"
                autoComplete="username"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-lg font-semibold text-white">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="bg-background border border-border/60 rounded-lg px-4 py-2 text-lg text-white focus:border-yellow-400 focus:ring-yellow-400"
                placeholder="Enter your password"
                autoComplete="current-password"
              />
            </div>
            <Button
              type="submit"
              variant="premium"
              size="lg"
              className="w-full rounded-lg text-lg font-bold bg-yellow-400 hover:bg-yellow-500 text-black shadow-md transition"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
          {error && (
            <Alert variant="destructive" className="mt-2 text-red-200 bg-red-900/80 border-red-400">
              {error}
            </Alert>
          )}
          {success && (
            <Alert variant="default" className="mt-2 text-green-200 bg-green-900/80 border-green-400">
              Login successful!
            </Alert>
          )}
          <div className="text-center text-muted-foreground mt-4">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="text-yellow-400 hover:underline font-semibold">Register</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login; 