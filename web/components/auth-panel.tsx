"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { KeyIcon } from "lucide-react";
import { api } from "@/lib/api-client";

interface AuthPanelProps {
  onAuthenticated: () => void;
}

export function AuthPanel({ onAuthenticated }: AuthPanelProps) {
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Validate token by attempting a simple request
      api.setJwtToken(token);

      // Test the token with a simple validation
      await api.validateSLT("I can test this token");

      onAuthenticated();
    } catch (err) {
      setError("Invalid token. Please check your JWT token and try again.");
      api.clearJwtToken();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border-l-8 border-t-2 border-r-2 border-b-2 border-foreground bg-card shadow-2xl max-w-md">
      <CardHeader className="text-center border-b-2 border-foreground">
        <div className="flex justify-center mb-6">
          <div className="p-4 border-4 border-foreground bg-muted">
            <KeyIcon className="h-8 w-8" strokeWidth={3} />
          </div>
        </div>
        <CardTitle className="text-2xl font-black uppercase tracking-tight">Enter Your Access Token</CardTitle>
        <CardDescription className="font-bold uppercase text-xs tracking-wider">
          Provide your Andamio JWT token to access the lesson laboratory.
          This token authenticates you with the Andamio Platform API.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-3 border-l-4 border-foreground pl-4">
            <Label htmlFor="token" className="text-xs font-black uppercase tracking-wider">JWT Token</Label>
            <Input
              id="token"
              type="password"
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6..."
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="font-mono text-sm border-2 border-input"
            />
            {error && (
              <p className="text-sm font-bold p-3 bg-destructive/10 border-l-4 border-destructive">{error}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full h-14 bg-foreground text-background hover:bg-foreground/90 font-black uppercase tracking-wider border-l-4 border-foreground"
            disabled={!token || isLoading}
          >
            {isLoading ? "Validating..." : "Enter Laboratory"}
          </Button>

          <div className="pt-4 border-t-2 border-muted">
            <p className="text-xs text-muted-foreground">
              <strong className="font-black uppercase tracking-wider">Where to find your token:</strong>
              <br />
              1. Log into the Andamio Platform
              <br />
              2. Go to Settings → API Access
              <br />
              3. Copy your JWT token
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
