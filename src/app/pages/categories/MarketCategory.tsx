import { useState, useEffect } from "react";
import { NFTMarketLive } from "../../components/NFTMarketLive";
import { MarketStats } from "../../components/MarketStats";
import { MarketLeaderboard, NFTCollection } from "../../components/MarketLeaderboard";
import { MarketHeatmap } from "../../components/MarketHeatmap";
import { NewsGrid } from "../../components/NewsGrid";
import { BookOpen } from "lucide-react";

export function MarketCategory() {
  const [nfts, setNfts] = useState<NFTCollection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Use realistic mock data for top NFTs since free APIs don't provide sparklines for NFTs
  useEffect(() => {
    const fetchTopNFTs = async () => {
      try {
        // Simulate network request
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const mockNfts: NFTCollection[] = [
          { id: "cryptopunks", symbol: "PUNK", name: "CryptoPunks", image: "https://api.dicebear.com/9.x/pixel-art/svg?seed=punk", floor_price: 135000, rank: 1, market_cap: 1350000000, total_volume: 5200000, price_change_percentage_24h: 1.2, sparkline_in_7d: { price: Array.from({length: 24}, (_, i) => 130000 + Math.sin(i)*5000 + i*100) } },
          { id: "bored-ape", symbol: "BAYC", name: "Bored Ape Yacht Club", image: "https://api.dicebear.com/9.x/pixel-art/svg?seed=bayc", floor_price: 45000, rank: 2, market_cap: 450000000, total_volume: 8500000, price_change_percentage_24h: 5.4, sparkline_in_7d: { price: Array.from({length: 24}, (_, i) => 40000 + Math.cos(i)*2000 + i*200) } },
          { id: "pudgy-penguins", symbol: "PPG", name: "Pudgy Penguins", image: "https://api.dicebear.com/9.x/pixel-art/svg?seed=pudgy", floor_price: 32000, rank: 3, market_cap: 284000000, total_volume: 12000000, price_change_percentage_24h: 12.8, sparkline_in_7d: { price: Array.from({length: 24}, (_, i) => 28000 + Math.sin(i)*1000 + i*300) } },
          { id: "mutant-ape", symbol: "MAYC", name: "Mutant Ape", image: "https://api.dicebear.com/9.x/pixel-art/svg?seed=mayc", floor_price: 8500, rank: 4, market_cap: 165000000, total_volume: 3200000, price_change_percentage_24h: -2.1, sparkline_in_7d: { price: Array.from({length: 24}, (_, i) => 8700 - Math.cos(i)*200 - i*10) } },
          { id: "azuki", symbol: "AZUKI", name: "Azuki", image: "https://api.dicebear.com/9.x/pixel-art/svg?seed=azuki", floor_price: 15200, rank: 5, market_cap: 152000000, total_volume: 2100000, price_change_percentage_24h: 0.5, sparkline_in_7d: { price: Array.from({length: 24}, (_, i) => 15000 + Math.sin(i)*300) } },
          { id: "milady", symbol: "MILADY", name: "Milady Maker", image: "https://api.dicebear.com/9.x/pixel-art/svg?seed=milady", floor_price: 18500, rank: 6, market_cap: 185000000, total_volume: 6500000, price_change_percentage_24h: 18.2, sparkline_in_7d: { price: Array.from({length: 24}, (_, i) => 15000 + Math.tan(i%3)*500 + i*200) } },
          { id: "doodles", symbol: "DOODLE", name: "Doodles", image: "https://api.dicebear.com/9.x/pixel-art/svg?seed=doodle", floor_price: 6500, rank: 7, market_cap: 65000000, total_volume: 800000, price_change_percentage_24h: -5.4, sparkline_in_7d: { price: Array.from({length: 24}, (_, i) => 7000 - Math.sin(i)*100 - i*20) } },
          { id: "clone-x", symbol: "CLONEX", name: "Clone X", image: "https://api.dicebear.com/9.x/pixel-art/svg?seed=clonex", floor_price: 4200, rank: 8, market_cap: 84000000, total_volume: 1200000, price_change_percentage_24h: 1.1, sparkline_in_7d: { price: Array.from({length: 24}, (_, i) => 4000 + Math.cos(i)*150 + i*5) } },
          { id: "degods", symbol: "DEGODS", name: "DeGods", image: "https://api.dicebear.com/9.x/pixel-art/svg?seed=degods", floor_price: 11000, rank: 9, market_cap: 110000000, total_volume: 2500000, price_change_percentage_24h: 3.2, sparkline_in_7d: { price: Array.from({length: 24}, (_, i) => 10500 + Math.sin(i)*200 + i*15) } },
          { id: "captainz", symbol: "CAPT", name: "The Captainz", image: "https://api.dicebear.com/9.x/pixel-art/svg?seed=captainz", floor_price: 12500, rank: 10, market_cap: 125000000, total_volume: 1800000, price_change_percentage_24h: -1.5, sparkline_in_7d: { price: Array.from({length: 24}, (_, i) => 13000 - Math.sin(i)*300 - i*10) } },
          { id: "penguin-toys", symbol: "TOYS", name: "Lil Pudgys", image: "https://api.dicebear.com/9.x/pixel-art/svg?seed=toys", floor_price: 3500, rank: 11, market_cap: 77000000, total_volume: 3400000, price_change_percentage_24h: 8.5, sparkline_in_7d: { price: Array.from({length: 24}, (_, i) => 3000 + Math.cos(i)*200 + i*30) } },
          { id: "mad-lads", symbol: "LADS", name: "Mad Lads", image: "https://api.dicebear.com/9.x/pixel-art/svg?seed=lads", floor_price: 24000, rank: 12, market_cap: 240000000, total_volume: 4500000, price_change_percentage_24h: 4.5, sparkline_in_7d: { price: Array.from({length: 24}, (_, i) => 22000 + Math.sin(i)*500 + i*50) } }
        ];
        setNfts(mockNfts);
      } catch (err) {
        console.error("Failed to fetch market data:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchTopNFTs();
  }, []);

  return (
    <div className="pt-4 max-w-7xl mx-auto px-4 sm:px-6 mb-12">
      <MarketStats />
      
      <MarketHeatmap nfts={nfts} loading={loading} error={error} />
      
      <MarketLeaderboard nfts={nfts} loading={loading} error={error} />

      <NFTMarketLive />

      <section className="mt-16 mb-6">
        <div className="flex items-center gap-2 mb-6">
          <BookOpen size={20} className="text-primary" />
          <h2 className="font-display font-bold text-xl text-foreground tracking-wide uppercase">
            Market <span className="text-primary">Analysis</span><span className="animate-pulse text-primary ml-1">_</span>
          </h2>
        </div>
        <NewsGrid />
      </section>
    </div>
  );
}
