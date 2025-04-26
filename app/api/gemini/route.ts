import { NextRequest, NextResponse } from "next/server";
import { generateCaseAnalysis, generateTextContent } from "@/lib/gemini";

// Add this for debugging
console.log("API route module loaded");

export async function POST(request: NextRequest) {
  console.log("POST request received to /api/gemini");
  
  try {
    // Log the raw request to debug
    const requestText = await request.text();
    console.log("Raw request body:", requestText);
    
    // Parse the JSON manually to better handle parsing errors
    let body;
    try {
      body = JSON.parse(requestText);
    } catch (e) {
      console.error("JSON parse error:", e);
      return NextResponse.json(
        { error: "Invalid JSON in request body" },
        { status: 400 }
      );
    }
    
    console.log("Parsed request body:", body);
    
    // Validate required fields
    if (!body.type) {
      return NextResponse.json(
        { error: "Missing 'type' field in request" },
        { status: 400 }
      );
    }
    
    let result;
    if (body.type === "case-analysis") {
      if (!body.data) {
        return NextResponse.json(
          { error: "Missing 'data' field for case analysis" },
          { status: 400 }
        );
      }
      console.log("Generating case analysis for:", body.data);
      result = await generateCaseAnalysis(body.data);
    } else if (body.type === "general-query") {
      if (!body.prompt) {
        return NextResponse.json(
          { error: "Missing 'prompt' field for general query" },
          { status: 400 }
        );
      }
      console.log("Generating text for prompt:", body.prompt);
      result = await generateTextContent(body.prompt);
    } else {
      return NextResponse.json(
        { error: `Invalid request type: ${body.type}` },
        { status: 400 }
      );
    }
    
    console.log("Generated result:", result);
    return NextResponse.json({ result });
  } catch (error: any) {
    console.error("Gemini API error:", error);
    return NextResponse.json(
      { 
        error: "Failed to process request", 
        details: error.message || String(error),
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}