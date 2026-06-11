import { motion } from "motion/react";
import { Grid, AlertCircle } from "lucide-react";
import { NFTCollection } from "./MarketLeaderboard";

interface MarketHeatmapProps {
  nfts: NFTCollection[];
  loading: boolean;
  error: boolean;
}

export function MarketHeatmap({ nfts, loading, error }: MarketHeatmapProps) {
  // Sort NFTs by market cap for the heatmap
  const sortedNfts = [...nfts].sort((a, b) => b.market_cap - a.market_cap);
  
  // Calculate total market cap of these 15 NFTs to size the boxes proportionally
  const totalMarketCap = sortedNfts.reduce((sum, nft) => sum + nft.market_cap, 0);

  const getColorClass = (change: number) => {
    if (change >= 5) return "bg-green-500 text-white";
    if (change >= 2) return "bg-green-500/80 text-white";
    if (change > 0) return "bg-green-500/60 text-white";
    if (change === 0) return "bg-muted text-foreground";
    if (change > -2) return "bg-red-500/60 text-white";
    if (change > -5) return "bg-red-500/80 text-white";
    return "bg-red-500 text-white";
  };

  return (
    <section className="mb-12">
      <div className="flex items-center gap-2 mb-6">
        <Grid size={20} className="text-primary" />
        <h2 className="font-display font-bold text-xl text-foreground tracking-wide uppercase">
          Sector <span className="text-primary">Heatmap</span><span className="animate-pulse text-primary ml-1">_</span>
        </h2>
      </div>

      <div className="bg-card border border-primary/20 rounded-md shadow-sm p-4 cyber-card min-h-[400px]">
        {loading ? (
          <div className="flex justify-center items-center h-[400px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-[400px] text-muted-foreground">
            <AlertCircle size={32} className="mb-4 opacity-50 text-destructive" />
            <p className="font-sans text-sm font-bold uppercase tracking-widest text-destructive">API Rate Limit Exceeded</p>
          </div>
        ) : (
          <div className="w-full h-full flex flex-wrap gap-1 content-start">
            {sortedNfts.map((nft, index) => {
              // Calculate rough area percentage
              const percentage = (nft.market_cap / totalMarketCap) * 100;
              // Map percentage to a width class for a flex layout
              // BTC and ETH will dominate, so we give them max widths
              const widthClass = percentage > 40 ? "w-full" : 
                               percentage > 15 ? "w-[calc(50%-4px)]" : 
                               percentage > 5 ? "w-[calc(33.33%-4px)]" : 
                               percentage > 2 ? "w-[calc(25%-4px)]" : 
                               "w-[calc(20%-4px)] flex-grow";

              const heightClass = percentage > 40 ? "h-32" : 
                                percentage > 15 ? "h-28" : 
                                percentage > 5 ? "h-24" : "h-20";

              return (
                <motion.div
                  key={nft.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.02 }}
                  className={`${widthClass} ${heightClass} ${getColorClass(nft.price_change_percentage_24h)} rounded-sm p-3 flex flex-col justify-between overflow-hidden cursor-default`}
                >
                  <div className="flex justify-between items-start">
                    <span className="font-display font-black text-sm md:text-lg lg:text-xl drop-shadow-md truncate">
                      {nft.symbol.toUpperCase()}
                    </span>
                    <img src={nft.image} alt={nft.name} className="w-6 h-6 rounded-md opacity-50 drop-shadow-md" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-sans font-bold text-xs md:text-sm drop-shadow-md">
                      ${nft.floor_price.toLocaleString()}
                    </span>
                    <span className="font-sans font-bold text-[10px] md:text-xs drop-shadow-md">
                      {nft.price_change_percentage_24h > 0 ? "+" : ""}{nft.price_change_percentage_24h.toFixed(2)}%
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
