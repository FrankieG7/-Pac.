"use client"

import { cn } from "@/lib/utils";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export function YieldStat({ value, label }: { value: number; label?: string }) {
  const isPositive = value >= 0;

  return (
    <div className="flex flex-col gap-1">
      {label && <span className="text-xs text-muted-foreground uppercase tracking-wider font-bold">{label}</span>}
      <div className="flex items-center gap-1.5">
        <span className={cn(
          "text-xl font-black font-code",
          isPositive ? "text-[#10B981]" : "text-[#F43F5E]"
        )}>
          {isPositive ? "+" : ""}{value.toFixed(2)}%
        </span>
        <div className={cn(
          "p-1 rounded-full",
          isPositive ? "bg-[#10B981]/10 text-[#10B981]" : "bg-[#F43F5E]/10 text-[#F43F5E]"
        )}>
          {isPositive ? (
            <ArrowUpRight className="h-4 w-4" />
          ) : (
            <ArrowDownRight className="h-4 w-4" />
          )}
        </div>
      </div>
    </div>
  );
}