"use client";

import { useState } from "react";

export default function TestGemini() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const testAPI = async () => {
    setIsLoading(true);
    setError("");
    
    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          type: "general-query",
          prompt: input
        }),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Unknown error");
      }
      
      setResponse(data.result || JSON.stringify(data));
    } catch (err: any) {
      setError(err.message || "Failed to fetch");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Test Gemini API</h1>
      
      <textarea 
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full p-2 border rounded mb-4 h-32"
        placeholder="Enter your prompt here"
      />
      
      <button
        onClick={testAPI}
        disabled={isLoading || !input.trim()}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
      >
        {isLoading ? "Loading..." : "Test API"}
      </button>
      
      {error && (
        <div className="mt-4 p-4 bg-red-100 border border-red-500 rounded">
          <p className="text-red-700">{error}</p>
        </div>
      )}
      
      {response && (
        <div className="mt-4 p-4 bg-gray-100 border rounded">
          <h2 className="font-bold mb-2">Response:</h2>
          <p className="whitespace-pre-wrap">{response}</p>
        </div>
      )}
    </div>
  );
}