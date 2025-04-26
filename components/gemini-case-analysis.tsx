"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";

export function GeminiCaseAnalysis() {
  const [caseData, setCaseData] = useState({
    location: "",
    substances: "",
    quantity: "",
    suspects: "",
  });
  const [analysis, setAnalysis] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCaseData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log("Sending case data to Gemini API:", caseData);
      
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "case-analysis",
          data: caseData,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Failed with status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Received analysis:", data);
      
      if (!data.result) {
        throw new Error("No result in response");
      }
      
      setAnalysis(data.result);
    } catch (error: any) {
      console.error("Error analyzing case:", error);
      setAnalysis(`Error generating analysis: ${error.message || "Unknown error"}. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Case Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                value={caseData.location}
                onChange={handleChange}
                placeholder="City, State, Country"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="substances">Substances Involved</Label>
              <Input
                id="substances"
                name="substances"
                value={caseData.substances}
                onChange={handleChange}
                placeholder="Cocaine, Heroin, Methamphetamine, etc."
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                name="quantity"
                value={caseData.quantity}
                onChange={handleChange}
                placeholder="5kg, 10 packets, etc."
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="suspects">Suspects Information</Label>
              <Textarea
                id="suspects"
                name="suspects"
                value={caseData.suspects}
                onChange={handleChange}
                placeholder="Brief details about suspects"
                rows={4}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                "Analyze Case"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>AI Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          {analysis ? (
            <div className="prose max-w-none whitespace-pre-line">
              {analysis}
            </div>
          ) : (
            <div className="text-center text-muted-foreground p-4">
              {isLoading ? (
                <div className="flex flex-col items-center">
                  <Loader2 className="h-8 w-8 animate-spin mb-2" />
                  <p>Generating analysis...</p>
                </div>
              ) : (
                <p>Enter case details and click "Analyze Case" to get AI-powered insights</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}