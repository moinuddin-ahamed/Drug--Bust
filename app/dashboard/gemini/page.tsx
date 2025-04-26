import { GeminiAssistant } from "@/components/gemini-assistant";
import { GeminiCaseAnalysis } from "@/components/gemini-case-analysis";

export default function GeminiPage() {
  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold">AI-Powered Investigation Tools</h1>
      
      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-4">Case Analysis</h2>
          <GeminiCaseAnalysis />
        </section>
        
        <section>
          <h2 className="text-xl font-semibold mb-4">Investigation Assistant</h2>
          <GeminiAssistant />
        </section>
      </div>
    </div>
  );
}