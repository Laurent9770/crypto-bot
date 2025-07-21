import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Zap, TrendingUp, TrendingDown, Info } from "lucide-react";

export type TradingSignal = {
  id: string;
  asset: string;
  type: "Spot" | "Futures" | "Options" | "Margin" | "Copy";
  action: "Buy" | "Sell" | "Hold";
  confidence: number;
  timeFrame: string;
  entryPrice: number;
  targetPrice: number;
  stopLoss: number;
  reasoning: string[];
  timestamp: string;
  sourceUrls: string[];
  volume: string;
  change24h: number;
};

export function SignalCard({ signal }: { signal: TradingSignal }) {
    const actionColor = signal.action === "Buy" ? "text-success" : signal.action === "Sell" ? "text-destructive" : "text-warning";
    const actionBg = signal.action === "Buy" ? "bg-success/10" : signal.action === "Sell" ? "bg-destructive/10" : "bg-warning/10";
    const confidenceColor = signal.confidence > 0.85 ? "text-success" : signal.confidence > 0.7 ? "text-warning" : "text-destructive";

  return (
    <Card className={`flex flex-col justify-between ${actionBg} border-border/50 hover:shadow-glow transition-all`}>
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <CardTitle className="text-xl font-bold">{signal.asset}</CardTitle>
                <CardDescription>{signal.type} - {signal.timeFrame}</CardDescription>
            </div>
            <Badge className={`${actionColor} ${actionBg}`}>{signal.action}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Price Information */}
        <div className="grid grid-cols-3 gap-2 text-sm text-center">
            <div>
                <p className="text-muted-foreground">Entry</p>
                <p className="font-mono text-lg">${signal.entryPrice.toFixed(2)}</p>
            </div>
            <div>
                <p className="text-muted-foreground">Target</p>
                <p className="font-mono text-lg text-success">${signal.targetPrice.toFixed(2)}</p>
            </div>
            <div>
                <p className="text-muted-foreground">Stop</p>
                <p className="font-mono text-lg text-destructive">${signal.stopLoss.toFixed(2)}</p>
            </div>
        </div>

        {/* Confidence */}
        <div className="flex items-center justify-center space-x-2">
            <Info className="h-4 w-4 text-muted-foreground" />
            <p className="text-sm">Confidence:</p>
            <p className={`font-bold ${confidenceColor}`}>{(signal.confidence * 100).toFixed(0)}%</p>
        </div>

        {/* Reasoning */}
        <div>
            <h4 className="text-sm font-semibold mb-2">Reasoning:</h4>
            <ul className="space-y-1 text-xs list-disc list-inside text-muted-foreground">
                {signal.reasoning.map((reason, i) => <li key={i}>{reason}</li>)}
            </ul>
        </div>
        
        {/* Action Button */}
        <Button className="w-full mt-4 bg-primary/80 hover:bg-primary text-primary-foreground">
            <Zap className="h-4 w-4 mr-2" />
            Execute Trade
        </Button>

        {/* Footer */}
        <div className="flex justify-between items-center text-xs text-muted-foreground pt-2 border-t border-border/20">
            <p>{new Date(signal.timestamp).toLocaleString()}</p>
            <div className="flex space-x-2">
                {signal.sourceUrls.map((url, i) => (
                    <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                        <ExternalLink className="h-4 w-4" />
                    </a>
                ))}
            </div>
        </div>
      </CardContent>
    </Card>
  );
} 