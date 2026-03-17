import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import React from "react";

export default function StaffGate() {
  const [email, setEmail] = useState("");
  const [accessKey, setAccessKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("arckae-backend/api/auth/staff-gate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, access_key: accessKey }),
      });

      if (response.ok) {
        // Redirect to login
        navigate("/login");
      } else {
        const data = await response.json();
        setError(data.detail || "Invalid credentials");
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
          <CardTitle className="text-2xl font-bold text-[#0B2C4D]">Staff Access</CardTitle>
          <CardDescription>
            Enter your staff email and access key to proceed to login
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
              <Label htmlFor="accessKey">Access Key</Label>
              <Input
                id="accessKey"
                type="password"
                value={accessKey}
                onChange={(e) => setAccessKey(e.target.value)}
                placeholder="Enter access key"
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
              {isLoading ? "Verifying..." : "Continue to Login"}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <button
              onClick={() => navigate("/")}
              className="text-[#0B2C4D] hover:text-[#F47B20] text-sm"
            >
              Back to Home
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}