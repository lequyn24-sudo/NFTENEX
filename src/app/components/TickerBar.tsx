import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface Coin {
  id: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  image: string;
}

export function TickerBar() {
  const [tickers, setTickers] = useState<Coin[]>([
    { id: "bitcoin", symbol: "btc", current_price: 64200.5, price_change_percentage_24h: 1.2, image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png" },
    { id: "ethereum", symbol: "eth", current_price: 3450.2, price_change_percentage_24h: 2.5, image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png" },
    { id: "solana", symbol: "sol", current_price: 145.8, price_change_percentage_24h: -0.5, image: "https://assets.coingecko.com/coins/images/4128/large/solana.png" },
    { id: "binancecoin", symbol: "bnb", current_price: 590.1, price_change_percentage_24h: 0.8, image: "https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png" },
    { id: "ripple", symbol: "xrp", current_price: 0.55, price_change_percentage_24h: -1.2, image: "https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png" }
  ]);

  useEffect(() => {
    const fetchTickers = async () => {
      try {
        const response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=15&page=1&sparkline=false");
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) setTickers(data);
        }
      } catch (error) {
        console.error("Error fetching tickers, using fallback data", error);
      }
    };
    fetchTickers();
    const interval = setInterval(fetchTickers, 60000);
    return () => clearInterval(interval);
  }, []);

  if (tickers.length === 0) return null;

  return (
    <div className="overflow-hidden border-b border-border bg-card h-9">
      <div className="flex items-center h-full">
        <div className="shrink-0 px-4 border-r border-border h-full flex items-center bg-primary">
          <span className="font-display font-bold text-xs tracking-widest text-primary-foreground">LIVE</span>
        </div>
        <div className="overflow-hidden flex-1 relative">
          <motion.div 
            className="flex gap-8 whitespace-nowrap" 
            animate={{ x: ["0%", "-50%"] }} 
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }} 
            style={{ width: "max-content" }}
          >
            {[...tickers, ...tickers].map((t, i) => {
              const isUp = t.price_change_percentage_24h >= 0;
              return (
                <div key={i} className="flex items-center gap-2 px-2 hover:bg-muted/50 cursor-pointer transition-colors px-3 py-1 rounded">
                  <img src={t.image} alt={t.symbol} className="w-4 h-4 rounded-full" />
                  <span className="font-display text-xs font-medium text-muted-foreground uppercase">{t.symbol}</span>
                  <span className="font-display text-xs text-foreground">${t.current_price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}</span>
                  <span className={`flex items-center gap-0.5 font-display text-[10px] ${isUp ? "text-green-500" : "text-destructive"}`}>
                    {isUp ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                    {Math.abs(t.price_change_percentage_24h).toFixed(2)}%
                  </span>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
