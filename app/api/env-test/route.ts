import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    apiKeyDefined: !!process.env.NEXT_PUBLIC_GEMINI_API_KEY,
    // Only return a masked version for security
    apiKeyPreview: process.env.NEXT_PUBLIC_GEMINI_API_KEY 
      ? `${process.env.NEXT_PUBLIC_GEMINI_API_KEY.substring(0, 4)}...${process.env.NEXT_PUBLIC_GEMINI_API_KEY.substring(process.env.NEXT_PUBLIC_GEMINI_API_KEY.length - 4)}`
      : null,
    nodeEnv: process.env.NODE_ENV
  });
}