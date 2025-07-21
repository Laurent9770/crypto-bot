import React, { useEffect, useRef } from "react";
import { createChart, IChartApi, ISeriesApi, LineData, UTCTimestamp } from "lightweight-charts";
import { usePriceStore } from "@/state/usePriceStore";

interface LiveChartProps {
  symbol: string;
}

const LiveChart: React.FC<LiveChartProps> = ({ symbol }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<IChartApi | null>(null);
  const lineSeries = useRef<ISeriesApi<'Line'> | null>(null);
  const prices = usePriceStore((s) => s.prices);
  const data = useRef<LineData[]>([]);

  useEffect(() => {
    if (!chartRef.current) return;
    if (!chartInstance.current) {
      chartInstance.current = createChart(chartRef.current, {
        width: chartRef.current.offsetWidth,
        height: 320,
        layout: {
          background: { color: '#181A20' },
          textColor: '#f5f6fa',
        },
        grid: { vertLines: { color: '#222' }, horzLines: { color: '#222' } },
        rightPriceScale: { borderColor: '#444' },
        timeScale: { borderColor: '#444' },
      });
      lineSeries.current = chartInstance.current.addSeries({
        type: 'Line',
        color: '#00ff99',
        lineWidth: 2,
        priceLineVisible: true,
        lastValueVisible: true,
      });
      lineSeries.current.setData([]);
    }
    // Resize on mount
    const handleResize = () => {
      if (chartRef.current && chartInstance.current) {
        chartInstance.current.resize(chartRef.current.offsetWidth, 320);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (chartInstance.current) {
        chartInstance.current.remove();
        chartInstance.current = null;
      }
    };
  }, []);

  // Update chart with new price
  useEffect(() => {
    if (!lineSeries.current) return;
    const priceObj = prices.find((p) => p.symbol === symbol);
    if (priceObj) {
      const now = Math.floor(Date.now() / 1000) as UTCTimestamp;
      data.current.push({ time: now, value: priceObj.price });
      if (data.current.length > 100) data.current.shift();
      lineSeries.current.setData([...data.current]);
    }
  }, [prices, symbol]);

  return (
    <div className="rounded-lg border-2 border-primary/60 chart-glow bg-card/80 p-2" style={{ minHeight: 340 }}>
      <div ref={chartRef} style={{ width: '100%', height: 320 }} />
    </div>
  );
};

export default LiveChart; 