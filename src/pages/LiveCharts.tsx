import React, { useEffect, useRef } from "react";

const LiveCharts: React.FC = () => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (container.current && !container.current.querySelector("iframe")) {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/tv.js";
      script.async = true;
      script.onload = () => {
        // @ts-ignore
        if (window.TradingView) {
          // @ts-ignore
          new window.TradingView.widget({
            autosize: true,
            symbol: "BINANCE:BTCUSDT",
            interval: "60",
            timezone: "Etc/UTC",
            theme: "dark",
            style: "1",
            locale: "en",
            toolbar_bg: "#131722",
            enable_publishing: false,
            allow_symbol_change: true,
            container_id: container.current.id,
          });
        }
      };
      container.current.appendChild(script);
    }
  }, []);

  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h2>Live Charts</h2>
      <p>Real-time crypto charts will be displayed here.</p>
      <div
        id="tradingview-widget"
        ref={container}
        style={{ minHeight: 500, width: "100%", maxWidth: 900, margin: "40px auto" }}
      />
    </div>
  );
};

export default LiveCharts; 