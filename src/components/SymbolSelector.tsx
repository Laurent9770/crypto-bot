import React, { useEffect, useState } from "react";
import { Select, SelectTrigger, SelectContent, SelectGroup, SelectLabel, SelectItem, SelectValue } from "@/components/ui/select";

interface SymbolSelectorProps {
  value: string;
  onChange: (symbol: string) => void;
  className?: string;
}

function parsePair(symbol: string): { base: string; quote: string } {
  const QUOTES = ["USDT", "BUSD", "USDC", "BTC", "ETH", "BNB", "EUR", "USD", "TRY", "GBP", "AUD", "DAI", "TRX", "DOGE", "SOL", "MATIC", "ADA", "DOT", "SHIB", "LTC", "XRP"];
  for (const q of QUOTES) {
    if (symbol.endsWith(q)) {
      return { base: symbol.slice(0, symbol.length - q.length), quote: q };
    }
  }
  const mid = Math.floor(symbol.length / 2);
  return { base: symbol.slice(0, mid), quote: symbol.slice(mid) };
}

function groupSymbols(symbols: string[]): Record<string, string[]> {
  const groups: Record<string, string[]> = {};
  symbols.forEach((symbol) => {
    const { base } = parsePair(symbol);
    if (!groups[base]) groups[base] = [];
    groups[base].push(symbol);
  });
  return groups;
}

export const SymbolSelector: React.FC<SymbolSelectorProps> = ({ value, onChange, className }) => {
  const [symbols, setSymbols] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/crypto_prices")
      .then((res) => res.json())
      .then((data) => {
        const uniqueSymbols = Array.from(new Set(data.map((p: any) => p.symbol)));
        setSymbols(uniqueSymbols.filter((s): s is string => typeof s === "string"));
        setLoading(false);
      });
  }, []);

  const filtered = search
    ? symbols.filter((s) => {
        const { base, quote } = parsePair(s);
        return (
          s.toLowerCase().includes(search.toLowerCase()) ||
          `${base}/${quote}`.toLowerCase().includes(search.toLowerCase())
        );
      })
    : symbols;

  const grouped = groupSymbols(filtered);
  const groupKeys = Object.keys(grouped).sort().slice(0, 20);

  return (
    <div className={`relative w-full max-w-xs ${className || ""}`}>
      <input
        type="text"
        className="w-full px-3 py-2 border rounded bg-background text-foreground mb-2"
        placeholder="Search symbol..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {loading ? (
        <div className="bg-background border rounded shadow p-2 text-muted-foreground text-sm">Loading...</div>
      ) : (
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger className="bg-[#181a20] text-white border border-[#2cb67d] w-full">
            <SelectValue placeholder="Select trading pair" />
          </SelectTrigger>
          <SelectContent className="bg-[#181a20] text-white border border-[#2cb67d] max-h-60 overflow-y-auto">
            {groupKeys.map((base) => (
              <SelectGroup key={base}>
                <SelectLabel className="text-[#2cb67d] uppercase text-xs px-2 py-1">{base}</SelectLabel>
                {grouped[base].map((s) => {
                  const { base, quote } = parsePair(s);
                  return (
                    <SelectItem key={s} value={s} className="hover:bg-[#222531]">
                      {base}/{quote}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );
}; 