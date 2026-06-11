import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Globe, TrendingUp, AlertCircle, Zap } from "lucide-react";

interface GlobalData {
  total_market_cap: { usd: number };
  total_volume: { usd: number };
  market_cap_percentage: { btc: number; eth: number };
}

export function MarketStats() {
  const [data, setData] = useState<GlobalData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchGlobalData = async () => {
      try {
        const res = await fetch("https://api.coingecko.com/api/v3/global");
        if (!res.ok) throw new Error("API Limit");
        const json = await res.json();
        setData(json.data);
      } catch (err) {
        console.warn("Using fallback global stats due to API limit:", err);
        // Fallback data
        setData({
          total_market_cap: { usd: 2450000000000 },
          total_volume: { usd: 85000000000 },
          market_cap_percentage: { btc: 52.4, eth: 16.8 }
        });
      } finally {
        setLoading(false);
      }
    };
    fetchGlobalData();
  }, []);

  const formatNumber = (num: number) => {
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    return `$${num.toLocaleString()}`;
  };

  return (
    <section className="mb-12">
      <div className="flex items-center gap-2 mb-6">
        <Globe size={20} className="text-primary" />
        <h2 className="font-display font-bold text-xl text-foreground tracking-wide uppercase">
          Global <span className="text-primary">Overview</span><span className="animate-pulse text-primary ml-1">_</span>
        </h2>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Total Market Cap",
            value: data ? formatNumber(data.total_market_cap.usd) : "---",
            icon: <Globe size={16} />,
            color: "text-blue-400"
          },
          {
            label: "24h Volume",
            value: data ? formatNumber(data.total_volume.usd) : "---",
            icon: <TrendingUp size={16} />,
            color: "text-green-400"
          },
          {
            label: "BTC Dominance",
            value: data ? `${data.market_cap_percentage.btc.toFixed(1)}%` : "---",
            icon: <Zap size={16} />,
            color: "text-orange-400"
          },
          {
            label: "ETH Dominance",
            value: data ? `${data.market_cap_percentage.eth.toFixed(1)}%` : "---",
            icon: <Zap size={16} />,
            color: "text-purple-400"
          }
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
            className="flex flex-col p-5 bg-card border border-primary/20 rounded-md shadow-sm relative overflow-hidden group cyber-card"
          >
            <div className="absolute inset-0 scanlines opacity-0 group-hover:opacity-30 transition-opacity pointer-events-none" />
            
            <div className="flex items-center gap-2 mb-3 text-muted-foreground">
              <span className={stat.color}>{stat.icon}</span>
              <span className="font-sans text-xs font-bold tracking-widest uppercase">{stat.label}</span>
            </div>
            
            {loading ? (
              <div className="h-8 w-24 bg-muted animate-pulse rounded" />
            ) : (
              <div className="font-display font-black text-2xl lg:text-3xl text-foreground cyber-glitch-hover">
                {stat.value}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
