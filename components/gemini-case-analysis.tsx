"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, AlertCircle, FileText, MapPin, Pill, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

export function GeminiCaseAnalysis() {
  const [caseData, setCaseData] = useState({
    location: "",
    substances: "",
    quantity: "",
    suspects: "",
  });
  const [analysis, setAnalysis] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const analysisRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when streaming content
  useEffect(() => {
    if (analysisRef.current && analysis) {
      analysisRef.current.scrollTop = analysisRef.current.scrollHeight;
    }
  }, [analysis]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCaseData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setAnalysis("");
    setError("");

    try {
      console.log("Sending case data to Gemini API:", caseData);
      
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "case-analysis",
          data: caseData,
          stream: true, // Request streaming response
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status}`);
      }

      // Get the response as a stream
      const reader = response.body?.getReader();
      if (!reader) throw new Error("Stream reader not available");

      // Process the stream
      const decoder = new TextDecoder();
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        try {
          const chunk = decoder.decode(value, { stream: true });
          // Parse the JSON chunk (assuming each chunk is a valid JSON)
          const jsonChunk = JSON.parse(chunk);
          if (jsonChunk.result) {
            setAnalysis(prev => prev + jsonChunk.result);
          }
        } catch (e) {
          // Handle potential JSON parsing errors in chunks
          console.warn("Error parsing chunk:", e);
          const text = decoder.decode(value, { stream: true });
          setAnalysis(prev => prev + text);
        }
      }
    } catch (error: any) {
      console.error("Error analyzing case:", error);
      setError(error.message || "Unknown error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="h-full border-2 shadow-md">
          <CardHeader className="bg-slate-50 dark:bg-slate-900 border-b">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Case Details
            </CardTitle>
            <CardDescription>Enter information about the drug case</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="location" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-slate-500" />
                  Location
                </Label>
                <Input
                  id="location"
                  name="location"
                  value={caseData.location}
                  onChange={handleChange}
                  placeholder="City, State, Country"
                  className="transition-all focus-visible:ring-offset-2"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="substances" className="flex items-center gap-2">
                  <Pill className="h-4 w-4 text-slate-500" />
                  Substances Involved
                </Label>
                <Input
                  id="substances"
                  name="substances"
                  value={caseData.substances}
                  onChange={handleChange}
                  placeholder="Cocaine, Heroin, Methamphetamine, etc."
                  className="transition-all focus-visible:ring-offset-2"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="quantity" className="flex items-center gap-2">
                  <span className="text-slate-500 font-mono text-sm">Qty</span>
                  Quantity
                </Label>
                <Input
                  id="quantity"
                  name="quantity"
                  value={caseData.quantity}
                  onChange={handleChange}
                  placeholder="5kg, 10 packets, etc."
                  className="transition-all focus-visible:ring-offset-2"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="suspects" className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-slate-500" />
                  Suspects Information
                </Label>
                <Textarea
                  id="suspects"
                  name="suspects"
                  value={caseData.suspects}
                  onChange={handleChange}
                  placeholder="Brief details about suspects"
                  rows={4}
                  className="resize-none transition-all focus-visible:ring-offset-2"
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full transition-all hover:scale-[1.02] focus:scale-[1.02]" 
                disabled={isLoading}
              >
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
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <Card className="h-full border-2 shadow-md">
          <CardHeader className="bg-slate-50 dark:bg-slate-900 border-b">
            <CardTitle className="flex items-center gap-2">
              <span className="text-primary font-bold">AI</span> Analysis
            </CardTitle>
            <CardDescription>AI-powered insights for your case</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[460px] p-6" ref={analysisRef}>
              <AnimatePresence mode="wait">
                {error ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 p-4 bg-red-50 text-red-700 rounded-md"
                  >
                    <AlertCircle className="h-5 w-5" />
                    <p>{error}</p>
                  </motion.div>
                ) : analysis ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="prose prose-slate dark:prose-invert max-w-none"
                  >
                    <ReactMarkdown 
                      rehypePlugins={[rehypeRaw]}
                      components={{
                        // Customize components for better styling
                        strong: ({node, ...props}) => <strong className="text-primary font-bold" {...props} />,
                        h1: ({node, ...props}) => <h1 className="text-2xl font-bold mb-4 text-primary" {...props} />,
                        h2: ({node, ...props}) => <h2 className="text-xl font-bold mt-6 mb-3 text-primary" {...props} />,
                        h3: ({node, ...props}) => <h3 className="text-lg font-bold mt-5 mb-2 text-primary" {...props} />,
                        ul: ({node, ...props}) => <ul className="list-disc pl-6 my-4" {...props} />,
                        ol: ({node, ...props}) => <ol className="list-decimal pl-6 my-4" {...props} />,
                        li: ({node, ...props}) => <li className="mb-1" {...props} />,
                        p: ({node, ...props}) => <p className="mb-4 leading-relaxed" {...props} />
                      }}
                    >
                      {analysis}
                    </ReactMarkdown>
                    {isLoading && (
                      <span className="inline-block animate-pulse">▋</span>
                    )}
                  </motion.div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center text-muted-foreground p-8 h-full flex flex-col items-center justify-center"
                  >
                    {isLoading ? (
                      <div className="flex flex-col items-center">
                        <div className="relative">
                          <Loader2 className="h-12 w-12 animate-spin mb-4 text-primary" />
                          <div className="absolute inset-0 h-12 w-12 animate-ping rounded-full border-4 border-primary opacity-20"></div>
                        </div>
                        <p className="text-primary font-medium">Generating comprehensive analysis...</p>
                        <p className="text-sm text-muted-foreground mt-2">This may take a moment</p>
                      </div>
                    ) : (
                      <>
                        <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-full mb-4">
                          <FileText className="h-8 w-8 text-slate-500" />
                        </div>
                        <p className="font-medium">Enter case details and click "Analyze Case"</p>
                        <p className="text-sm mt-2">Get AI-powered insights on patterns, risks, and recommendations</p>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </ScrollArea>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}