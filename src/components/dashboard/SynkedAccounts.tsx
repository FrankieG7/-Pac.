"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link2, Globe, Database, Cpu, Activity } from "lucide-react";

const accounts = [
  { name: "Webull", status: "Synked", color: "text-[#10B981]" },
  { name: "Sofi", status: "Synked", color: "text-[#10B981]" },
  { name: "Coinbase", status: "Synked", color: "text-[#10B981]" },
  { name: "Etherscan", status: "Live", color: "text-accent" },
  { name: "Ledger", status: "Mirror", color: "text-primary" },
  { name: "Facebook", status: "Linked", color: "text-muted-foreground" },
];

export function SynkedAccounts() {
  return (
    <Card className="bg-white/5 border-white/5 backdrop-blur-md rounded-3xl">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-headline flex items-center gap-2 uppercase tracking-widest opacity-70">
          <Link2 className="h-4 w-4" />
          Synked Networks
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          {accounts.map((acc) => (
            <div key={acc.name} className="flex items-center justify-between p-2 rounded-xl bg-black/20 border border-white/5">
              <span className="text-[10px] font-bold text-muted-foreground uppercase">{acc.name}</span>
              <div className="flex items-center gap-1">
                <div className={`w-1 h-1 rounded-full bg-current ${acc.color} animate-pulse`} />
                <span className={`text-[9px] font-black uppercase ${acc.color}`}>{acc.status}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="h-3 w-3 text-primary" />
            <span className="text-[10px] text-muted-foreground font-medium italic">EFX-001 Live Feed</span>
          </div>
          <span className="text-[10px] font-code text-primary">PORT_9002_ACTIVE</span>
        </div>
      </CardContent>
    </Card>
  );
}
