"use client"

import { useState } from "react";
import { lookupAddressInsights, type AddressLookupOutput } from "@/ai/flows/address-lookup-flow";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Search, Loader2, ShieldCheck, AlertCircle, Fingerprint } from "lucide-react";
import { TrustScoreCircle } from "./TrustScoreCircle";

export function AIAddressLookup() {
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AddressLookupOutput | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLookup = async () => {
    if (!address) return;
    setLoading(true);
    setErrorMessage(null);
    try {
      const data = await lookupAddressInsights({ address });
      if (!data) {
        throw new Error("Received empty response from address lookup.");
      }
      setResult(data);
    } catch (error) {
      console.error("Address lookup failed:", error);
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to analyze address."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-card/50 border-white/5 backdrop-blur-md">
      <CardHeader>
        <CardTitle className="text-lg font-headline flex items-center gap-2">
          <Fingerprint className="h-5 w-5 text-accent" />
          Ledger Analytics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex gap-2">
          <Input 
            placeholder="Search address or ledger ID..." 
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !loading && address) {
                handleLookup();
              }
            }}
            className="bg-white/5 border-white/10 rounded-2xl font-code text-sm"
          />
          <Button 
            onClick={handleLookup} 
            disabled={loading || !address}
            size="icon"
            className="rounded-2xl bg-accent hover:bg-accent/90 shrink-0"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
          </Button>
        </div>

        {errorMessage && !loading && (
          <div className="p-3 rounded-2xl bg-[#F43F5E]/10 border border-[#F43F5E]/30 text-xs text-[#F43F5E] flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {result && !loading && (
          <div className="space-y-6 animate-in zoom-in-95 duration-500">
            <div className="flex justify-center py-4">
              <TrustScoreCircle score={result.trustScore} />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/5 p-3 rounded-2xl border border-white/5 text-center">
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">Status</p>
                <p className="text-sm font-bold mt-1 text-accent flex items-center justify-center gap-1">
                  <ShieldCheck className="h-3 w-3" />
                  {result.verificationStatus}
                </p>
              </div>
              <div className="bg-white/5 p-3 rounded-2xl border border-white/5 text-center">
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">Risk Level</p>
                <p className="text-sm font-bold mt-1 text-[#F43F5E] flex items-center justify-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {result.trustScore > 70 ? "Low" : "Monitor"}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <h5 className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">History Summary</h5>
                <p className="text-xs text-foreground/80 leading-relaxed bg-white/5 p-3 rounded-xl">
                  {result.transactionHistorySummary}
                </p>
              </div>
              <div className="space-y-1">
                <h5 className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Risk Analysis</h5>
                <p className="text-xs text-foreground/80 leading-relaxed bg-white/5 p-3 rounded-xl border-l-2 border-[#F43F5E]/50">
                  {result.associatedRisks}
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}