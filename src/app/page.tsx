"use client"

import { PersonalizedInsights } from "@/components/dashboard/PersonalizedInsights";
import { AIAddressLookup } from "@/components/dashboard/AIAddressLookup";
import { YieldStat } from "@/components/dashboard/YieldStat";
import { LegacyGoalCard } from "@/components/dashboard/LegacyGoalCard";
import { PortfolioChart } from "@/components/dashboard/PortfolioChart";
import { SynkedAccounts } from "@/components/dashboard/SynkedAccounts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Wallet, BarChart3, TrendingUp, Info, ShieldCheck, Zap, Globe, Cpu } from "lucide-react";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#0D0B0F] text-white selection:bg-accent selection:text-white">
      {/* Decorative Gradients */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-primary/20 text-primary text-[10px] px-2 py-0.5 rounded-full font-black uppercase tracking-tighter">EFX Mirroring v1.0</span>
            </div>
            <h1 className="text-5xl font-black font-headline tracking-tighter flex items-center gap-3 uppercase">
              FG7 <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary animate-gradient">@1@ PORTFOLIO</span>
            </h1>
            <p className="text-muted-foreground font-medium mt-1 flex items-center gap-2">
              <Globe className="h-3 w-3" />
              Synchronized Intelligence & Strategic Mirroring @Pac
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="bg-white/5 border border-white/10 p-4 rounded-3xl backdrop-blur-md flex items-center gap-4">
              <div className="w-10 h-10 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
                <Wallet className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Mirror Balance</p>
                <p className="text-2xl font-black font-code">$42,150.84</p>
              </div>
            </div>
            <button className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
              <Bell className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content (Left) */}
          <div className="lg:col-span-8 space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <Card className="bg-white/5 border-white/5 rounded-3xl">
                <CardContent className="pt-6">
                  <YieldStat value={12.5} label="Global 30D Return" />
                </CardContent>
              </Card>
              <Card className="bg-white/5 border-white/5 rounded-3xl">
                <CardContent className="pt-6">
                  <YieldStat value={4.2} label="Synk Yield" />
                </CardContent>
              </Card>
              <Card className="bg-white/5 border-white/5 rounded-3xl">
                <CardContent className="pt-6">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Sharpe Ratio</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xl font-black font-code text-[#FACC15]">2.84</span>
                      <div className="p-1 rounded-full bg-[#FACC15]/10 text-[#FACC15]">
                        <Info className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-card/30 border-white/5 backdrop-blur-xl rounded-[2rem] overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl font-headline flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-accent" />
                  Trajectory Analytics
                </CardTitle>
                <div className="flex gap-2">
                  {['1D', '1W', '1M', '1Y', 'ALL'].map((p) => (
                    <button 
                      key={p} 
                      className={`text-[10px] font-bold px-3 py-1.5 rounded-xl transition-colors ${p === '1M' ? 'bg-accent text-white' : 'bg-white/5 text-muted-foreground hover:bg-white/10'}`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <PortfolioChart />
              </CardContent>
            </Card>

            <PersonalizedInsights />
          </div>

          {/* Side Panel (Right) */}
          <div className="lg:col-span-4 space-y-8">
            <AIAddressLookup />
            
            <SynkedAccounts />
            
            <LegacyGoalCard />

            <Card className="bg-white/5 border-white/5 border-l-4 border-primary rounded-3xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h3 className="font-bold font-headline uppercase tracking-tight text-sm">ZMods: GOD EFX Status</h3>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Repository status: <span className="text-primary font-mono font-bold">SYNKED</span>. Mirroring EFX-001 protocols in <span className="text-white font-bold">"Shotsfired"</span> cluster. All security restrictions resolved. Repository backups active.
              </p>
            </Card>

            <Card className="bg-gradient-to-br from-[#10B981]/10 to-[#6272FF]/10 border-white/5 rounded-3xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-[#10B981]" />
                </div>
                <h3 className="font-bold font-headline">Portfolio @Pac. Intel</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Global health percentile: <span className="text-[#10B981] font-bold">TOP 5%</span>. Strategic Z-Mod analysis recommends increasing L2 exposure for optimal mirroring of capital flows.
              </p>
              <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-2">
                <Cpu className="h-3 w-3 text-accent" />
                <span className="text-[10px] font-mono text-accent">PWNED_BY_FG7</span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
