"use client"

import { cn } from "@/lib/utils";

export function TrustScoreCircle({ score }: { score: number }) {
  const getColor = (s: number) => {
    if (s > 80) return "text-[#10B981] drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]";
    if (s > 50) return "text-[#FACC15] drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]";
    return "text-[#F43F5E] drop-shadow-[0_0_8px_rgba(244,63,94,0.5)]";
  };

  const getBorderColor = (s: number) => {
    if (s > 80) return "border-[#10B981]/20";
    if (s > 50) return "border-[#FACC15]/20";
    return "border-[#F43F5E]/20";
  };

  return (
    <div className={cn(
      "relative flex items-center justify-center h-44 w-44 rounded-full border-8 bg-black/20 backdrop-blur-sm transition-all duration-500",
      getBorderColor(score)
    )}>
      {score > 90 && (
        <div className="absolute inset-0 rounded-full animate-ping bg-[#10B981]/5" />
      )}
      
      <div className="text-center z-10">
        <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold">Health Score</span>
        <div className={cn("text-5xl font-black font-headline leading-none mt-1 transition-colors duration-500", getColor(score))}>
          {score}
        </div>
        <span className="text-[10px] text-muted-foreground font-code opacity-50 block mt-1">PERCENTILE</span>
      </div>
      
      {/* Decorative segments */}
      <svg className="absolute inset-[-12px] w-[calc(100%+24px)] h-[calc(100%+24px)] -rotate-90">
        <circle
          cx="50%"
          cy="50%"
          r="48%"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="4 4"
          className="text-white/10"
        />
      </svg>
    </div>
  );
}