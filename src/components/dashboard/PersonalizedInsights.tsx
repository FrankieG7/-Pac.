
"use client"

import { useState } from "react";
import { generatePersonalizedInsights, type PersonalizedInsightsOutput } from "@/ai/flows/personalized-insights-flow";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Sparkles, Loader2, Lightbulb, TrendingUp, Zap, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export function PersonalizedInsights() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PersonalizedInsightsOutput | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const data = await generatePersonalizedInsights({
        portfolioSummary: "Current portfolio balance $42,150.84, with 65% in Ethereum, 20% in Solana, and 15% in USDC. Total 30-day return is +12.5%.",
        marketTrends: "The market is showing strong bullish sentiment in Layer 1 protocols. DeFi yields are stabilizing while NFT volume remains low."
      });
      if (!data) {
        throw new Error("Received empty response from insights generator.");
      }
      setResult(data);
    } catch (error) {
      console.error("Failed to generate personalized insights:", error);
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to generate personalized insights."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-gradient-to-br from-card to-secondary/30 border-white/5 overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
        <CardTitle className="text-xl font-headline flex items-center gap-2">
          <Zap className="h-5 w-5 text-accent" />
          Z-Intelligence Engine
        </CardTitle>
        <Button 
          onClick={handleGenerate} 
          disabled={loading}
          variant="secondary"
          className="bg-accent/10 hover:bg-accent/20 text-accent border-accent/20"
        >
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
          {result ? "Resynk Analysis" : "Launch Intelligence"}
        </Button>
      </CardHeader>
      <CardContent>
        {errorMessage && !loading && (
          <div className="mb-4 p-3 rounded-2xl bg-[#F43F5E]/10 border border-[#F43F5E]/30 text-xs text-[#F43F5E] flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {!result && !loading && (
          <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
            <div className="p-4 rounded-full bg-white/5">
              <Lightbulb className="h-8 w-8 text-muted-foreground opacity-50" />
            </div>
            <p className="text-muted-foreground max-w-[280px]">
              Unlock deep-tier FG7 analysis and strategic mirror recommendations.
            </p>
          </div>
        )}

        {loading && (
          <div className="space-y-4 py-4 animate-pulse">
            <div className="h-4 bg-white/5 rounded w-3/4" />
            <div className="h-20 bg-white/5 rounded w-full" />
            <div className="space-y-2">
              <div className="h-4 bg-white/5 rounded w-1/2" />
              <div className="h-4 bg-white/5 rounded w-2/3" />
            </div>
          </div>
        )}

        {result && !loading && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-700">
            <div className="bg-white/5 p-4 rounded-2xl border border-white/5 border-l-4 border-accent">
              <h4 className="text-xs font-bold uppercase tracking-widest text-accent mb-2">Mirror Strategy</h4>
              <p className="text-sm leading-relaxed text-foreground/90 font-medium">
                {result.insight}
              </p>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#10B981] flex items-center gap-2">
                <TrendingUp className="h-3 w-3" />
                Strategic Mirror Actions
              </h4>
              <ul className="grid gap-2">
                {result.recommendations.map((rec, i) => (
                  <li key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5 text-sm">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-accent/20 text-accent flex items-center justify-center text-[10px] font-bold">
                      {i + 1}
                    </span>
                    <span className="text-muted-foreground">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
