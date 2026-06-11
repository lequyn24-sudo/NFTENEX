import { motion } from "motion/react";
import { BarChart2, AlertCircle } from "lucide-react";

export interface NFTCollection {
  id: string;
  rank: number;
  name: string;
  symbol: string;
  image: string;
  floor_price: number;
  market_cap: number;
  total_volume: number;
  price_change_percentage_24h: number;
  sparkline_in_7d?: {
    price: number[];
  };
}

interface MarketLeaderboardProps {
  nfts: NFTCollection[];
  loading: boolean;
  error: boolean;
}

export function MarketLeaderboard({ nfts, loading, error }: MarketLeaderboardProps) {
  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  };

  const formatCompact = (num: number) => {
    return new Intl.NumberFormat("en-US", {
      notation: "compact",
      compactDisplay: "short",
      maximumFractionDigits: 1,
    }).format(num);
  };

  const drawSparkline = (prices: number[], isUp: boolean) => {
    if (!prices || prices.length === 0) return null;
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const range = max - min || 1;
    
    const width = 120;
    const height = 40;
    
    const points = prices.map((price, index) => {
      const x = (index / (prices.length - 1)) * width;
      const y = height - ((price - min) / range) * height;
      return `${x},${y}`;
    }).join(" ");

    const strokeColor = isUp ? "#22c55e" : "#ef4444"; 

    return (
      <svg width={width} height={height} className="overflow-visible">
        <defs>
          <linearGradient id={`gradient-${isUp}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={strokeColor} stopOpacity="0.4" />
            <stop offset="100%" stopColor={strokeColor} stopOpacity="0" />
          </linearGradient>
        </defs>
        <polyline
          fill="none"
          stroke={strokeColor}
          strokeWidth="1.5"
          points={points}
          className="drop-shadow-sm"
        />
        <polygon
          fill={`url(#gradient-${isUp})`}
          points={`0,${height} ${points} ${width},${height}`}
        />
      </svg>
    );
  };

  return (
    <section className="mb-12">
      <div className="flex items-center gap-2 mb-6">
        <BarChart2 size={20} className="text-primary" />
        <h2 className="font-display font-bold text-xl text-foreground tracking-wide uppercase">
          Top <span className="text-primary">Collections</span><span className="animate-pulse text-primary ml-1">_</span>
        </h2>
      </div>

      <div className="bg-card border border-primary/20 rounded-md shadow-sm overflow-hidden cyber-card">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground bg-muted/10">
            <AlertCircle size={32} className="mb-4 opacity-50 text-destructive" />
            <p className="font-sans text-sm font-bold uppercase tracking-widest text-destructive">API Rate Limit Exceeded</p>
            <p className="font-sans text-xs opacity-70 mt-2">Please wait a few seconds and refresh.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border/50 bg-muted/20">
                  <th className="py-4 px-4 font-sans text-xs font-bold tracking-widest text-muted-foreground uppercase whitespace-nowrap w-16 text-center">#</th>
                  <th className="py-4 px-4 font-sans text-xs font-bold tracking-widest text-muted-foreground uppercase whitespace-nowrap">Collection</th>
                  <th className="py-4 px-4 font-sans text-xs font-bold tracking-widest text-muted-foreground uppercase whitespace-nowrap text-right">Floor Price</th>
                  <th className="py-4 px-4 font-sans text-xs font-bold tracking-widest text-muted-foreground uppercase whitespace-nowrap text-right">24h %</th>
                  <th className="py-4 px-4 font-sans text-xs font-bold tracking-widest text-muted-foreground uppercase whitespace-nowrap text-right hidden md:table-cell">Market Cap</th>
                  <th className="py-4 px-4 font-sans text-xs font-bold tracking-widest text-muted-foreground uppercase whitespace-nowrap text-right hidden lg:table-cell">Volume (24h)</th>
                  <th className="py-4 px-4 font-sans text-xs font-bold tracking-widest text-muted-foreground uppercase whitespace-nowrap text-right w-40">Last 7 Days</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                {nfts.map((nft, index) => {
                  const isUp = nft.price_change_percentage_24h >= 0;
                  return (
                    <motion.tr 
                      key={nft.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                      className="border-b border-border/10 last:border-0"
                    >
                      <td className="py-4 px-4 text-center font-display text-xs font-bold text-muted-foreground">
                        {nft.rank}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <img src={nft.image} alt={nft.name} className="w-8 h-8 rounded-md" />
                          <div className="flex flex-col">
                            <span className="font-sans font-bold text-sm text-foreground">{nft.name}</span>
                            <span className="font-sans text-[10px] text-muted-foreground uppercase tracking-widest">{nft.symbol}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <span className="font-display font-bold text-sm text-foreground">{formatCurrency(nft.floor_price)}</span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <span className={`font-sans font-bold text-xs px-2 py-1 rounded-sm ${isUp ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                          {isUp ? "+" : ""}{nft.price_change_percentage_24h?.toFixed(2)}%
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right hidden md:table-cell">
                        <span className="font-sans text-sm text-muted-foreground">${formatCompact(nft.market_cap)}</span>
                      </td>
                      <td className="py-4 px-4 text-right hidden lg:table-cell">
                        <span className="font-sans text-sm text-muted-foreground">${formatCompact(nft.total_volume)}</span>
                      </td>
                      <td className="py-2 px-4 text-right w-40">
                        {nft.sparkline_in_7d?.price && (
                          <div className="flex justify-end opacity-90">
                            {drawSparkline(nft.sparkline_in_7d.price, isUp)}
                          </div>
                        )}
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
