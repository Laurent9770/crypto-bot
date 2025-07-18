import React, { useEffect, useState } from "react";

interface SymbolSelectorProps {
  value: string;
  onChange: (symbol: string) => void;
  className?: string;
}

export const SymbolSelector: React.FC<SymbolSelectorProps> = ({ value, onChange, className }) => {
  const [symbols, setSymbols] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

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
    ? symbols.filter((s) => s.toLowerCase().includes(search.toLowerCase()))
    : symbols;

  return (
    <div className={`relative w-full max-w-xs ${className || ""}`}>
      <input
        type="text"
        className="w-full px-3 py-2 border rounded bg-background text-foreground"
        placeholder="Search symbol..."
        value={search || value}
        onChange={(e) => setSearch(e.target.value)}
        onFocus={() => setSearch("")}
      />
      {loading ? (
        <div className="absolute left-0 right-0 bg-background border rounded shadow p-2 mt-1 text-muted-foreground text-sm">Loading...</div>
      ) : (
        filtered.length > 0 && (
          <ul className="absolute left-0 right-0 bg-background border rounded shadow p-2 mt-1 max-h-48 overflow-y-auto z-10">
            {filtered.slice(0, 20).map((s) => (
              <li
                key={s}
                className={`px-2 py-1 cursor-pointer hover:bg-muted rounded ${s === value ? "bg-primary/10" : ""}`}
                onMouseDown={() => {
                  onChange(s);
                  setSearch("");
                }}
              >
                {s}
              </li>
            ))}
          </ul>
        )
      )}
    </div>
  );
}; 