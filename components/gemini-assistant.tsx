"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, Send, Brain, AlertCircle, ShieldAlert } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import ReactMarkdown from "react-markdown";

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

export function GeminiAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello, I'm your Drug-Bust AI assistant. I can help with information about drug investigations, trafficking patterns, substance identification, and law enforcement strategies.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOfftopic, setIsOfftopic] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  
  // Drug and investigation related keywords for validation
  const isDrugRelatedQuery = (query: string): boolean => {
    const keywords = [
      // Drug types and substances
      "drug", "narcotic", "substance", "cocaine", "heroin", "marijuana", "cannabis", 
      "meth", "amphetamine", "mdma", "ecstasy", "fentanyl", "opioid", "prescription",
      "pill", "lsd", "psychedelic", "ketamine", "synthetic", "ghb", "mushroom",
      
      // Trafficking and distribution
      "trafficking", "smuggling", "distribution", "dealer", "supplier", "cartel",
      "network", "route", "shipment", "package", "border", "customs", "import",
      
      // Law enforcement
      "investigation", "enforce", "police", "operation", "surveillance", "informant",
      "evidence", "forensic", "raid", "arrest", "charge", "prosecution", "interdiction",
      "seizure", "bust", "undercover", "sting", "trace", "money laundering",
      
      // Other related terms
      "case", "profile", "suspect", "organized crime", "gang", "transaction", "dark web",
      "crypto", "payment", "currency", "lab", "production", "precursor", "chemical",
      "addictive", "paraphernalia", "dose", "potency", "purity", "test", "sample",
      "analysis", "identification", "methodology", "trend", "pattern", "statistic"
    ];
    
    const lowerCaseQuery = query.toLowerCase();
    return keywords.some(keyword => lowerCaseQuery.includes(keyword));
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;
    setIsOfftopic(false);
    
    const userMessage: Message = { role: "user", content: input };
    const userInput = input.trim();
    
    // Check if query is related to drugs or investigations
    if (!isDrugRelatedQuery(userInput)) {
      setIsOfftopic(true);
      setMessages((prev) => [...prev, userMessage]);
      setInput("");
      setMessages((prev) => [
        ...prev,
        {
          role: "system",
          content: "I can only answer questions related to drug investigations, trafficking, substance identification, and law enforcement strategies. Please ask a relevant question.",
        },
      ]);
      return;
    }
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "general-query",
          prompt: userInput,
          // Include explicit instructions to only answer drug-related queries
          constraints: {
            topicConstraint: "Only answer questions related to drug investigations, substance information, trafficking patterns, and law enforcement. If the question is about any other topic, respond with: 'I can only provide information related to drug investigations and enforcement.'"
          }
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Failed with status: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.result) {
        throw new Error("No result in response");
      }
      
      // Check if the response indicates an off-topic rejection
      if (data.result.includes("I can only provide information related to drug")) {
        setIsOfftopic(true);
      }
      
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.result },
      ]);
    } catch (error: any) {
      console.error("Error in Gemini request:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Sorry, I encountered an error: ${error.message || "Unknown error"}. Please try again.`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto h-[600px] flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          Gemini Investigation Assistant
        </CardTitle>
        <CardDescription>
          Ask questions about drug investigations, trafficking patterns, substance identification, and enforcement strategies
        </CardDescription>
      </CardHeader>
      
      {isOfftopic && (
        <Alert className="mx-4 mb-2 bg-amber-50 border-amber-200">
          <ShieldAlert className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800">
            This assistant can only answer questions related to drug investigations and enforcement.
          </AlertDescription>
        </Alert>
      )}
      
      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === "user" 
                ? "justify-end" 
                : message.role === "system" 
                  ? "justify-center" 
                  : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : message.role === "system"
                    ? "bg-amber-100 text-amber-800 border border-amber-200"
                    : "bg-muted"
              }`}
            >
              {message.role === "assistant" ? (
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <ReactMarkdown>
                    {message.content}
                  </ReactMarkdown>
                </div>
              ) : (
                message.content
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-lg p-3 bg-muted flex items-center">
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Analyzing query...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </CardContent>
      
      <CardFooter className="pt-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
          className="flex w-full gap-2"
        >
          <Input
            placeholder="Ask about drug trafficking patterns, case analysis, or surveillance strategies..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}