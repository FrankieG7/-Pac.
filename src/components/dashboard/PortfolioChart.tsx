"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const data = [
  { date: "Jan", balance: 32000 },
  { date: "Feb", balance: 34500 },
  { date: "Mar", balance: 31000 },
  { date: "Apr", balance: 38000 },
  { date: "May", balance: 42150 },
  { date: "Jun", balance: 40500 },
];

export function PortfolioChart() {
  return (
    <div className="h-[280px] w-full mt-4">
      <ChartContainer config={{
        balance: {
          label: "Portfolio Balance",
          color: "hsl(var(--primary))",
        },
      }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid vertical={false} stroke="hsl(var(--muted))" strokeDasharray="3 3" opacity={0.3} />
            <XAxis 
              dataKey="date" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
              dy={10}
            />
            <YAxis 
              hide
              domain={['dataMin - 5000', 'dataMax + 5000']}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line 
              type="monotone" 
              dataKey="balance" 
              stroke="hsl(var(--accent))" 
              strokeWidth={3} 
              dot={false}
              activeDot={{ r: 6, fill: 'hsl(var(--accent))' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
}