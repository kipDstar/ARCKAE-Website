import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { useAuth } from "../components/AuthContext";
import React from "react";

export default function StaffLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("arckae-backend/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          username: email,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.access_token;
        const meRes = await fetch("/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (meRes.ok) {
          const userData = await meRes.json();
          login(token, userData);
          navigate("/dashboard");
        } else {
          setError("Unable to verify user. Please try again.");
        }
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B2C4D] to-[#4FA3D1] flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-[#0B2C4D]">Staff Login</CardTitle>
          <CardDescription>
            Sign in to access the staff dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@arckae.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
            {error && (
              <p className="text-red-600 text-sm">{error}</p>
            )}
            <Button
              type="submit"
              className="w-full bg-[#F47B20] hover:bg-[#F47B20]/90"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <button
              onClick={() => navigate("/staff")}
              className="text-[#0B2C4D] hover:text-[#F47B20] text-sm"
            >
              Back to Staff Gate
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}