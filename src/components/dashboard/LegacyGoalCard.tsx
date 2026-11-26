"use client"

import { Progress } from "@/components/ui/progress";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Target, Trophy, Clock } from "lucide-react";

export function LegacyGoalCard() {
  return (
    <Card className="bg-gradient-to-br from-[#6638DB]/10 to-[#6272FF]/10 border-[#6638DB]/20">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-headline flex items-center gap-2">
          <Target className="h-5 w-5 text-[#6272FF]" />
          Legacy Objectives
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mb-1">Q2 Buildup Progress</p>
              <h3 className="text-2xl font-black font-code">$35,406 <span className="text-sm font-normal text-muted-foreground opacity-50">/ $42,150</span></h3>
            </div>
            <div className="text-right">
              <span className="text-lg font-black text-[#10B981] font-code">84%</span>
            </div>
          </div>
          <Progress value={84} className="h-2 bg-white/5" />
        </div>

        <div className="grid grid-cols-1 gap-2">
          <div className="flex items-center gap-3 p-3 bg-black/20 rounded-2xl border border-white/5">
            <div className="w-8 h-8 rounded-lg bg-[#10B981]/10 flex items-center justify-center">
              <Trophy className="h-4 w-4 text-[#10B981]" />
            </div>
            <div>
              <p className="text-xs font-bold text-foreground">Airdrop Farmer Tier III</p>
              <p className="text-[10px] text-muted-foreground">Unlocked 12/24 goals completed</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-black/20 rounded-2xl border border-white/5">
            <div className="w-8 h-8 rounded-lg bg-[#FACC15]/10 flex items-center justify-center">
              <Clock className="h-4 w-4 text-[#FACC15]" />
            </div>
            <div>
              <p className="text-xs font-bold text-foreground">Mainnet Anniversary</p>
              <p className="text-[10px] text-muted-foreground">14 days until Q3 distribution</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}