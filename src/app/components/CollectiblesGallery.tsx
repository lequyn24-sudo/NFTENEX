import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Clock, ChevronRight, AlertCircle } from "lucide-react";
import { Link } from "react-router";

interface NFTItem {
  id: string;
  name: string;
  thumb: string;
}

const headlineTemplates = [
  "Project Nearing Key Milestone",
  "Collection Reaches New Milestone",
  "Introductory Drop Details",
  "Escalate NFT Metaverse Integration",
  "Launch Offers Exclusive Collector Incentives",
  "Continues Community-Centric Approach",
  "Shape NFT Landscape in 2026",
  "Advances RWA Tokenization on Solana",
  "Inner Circle Sees Strong Market Impact",
  "Announces Strategic Partnership with Web3 Gaming",
];

const timeTemplates = [
  "2 Hours Ago", "5 Hours Ago", "11 Hours Ago", "1 Day Ago", "3 Days Ago", "1 Week Ago"
];

function getRandomItem(arr: string[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function CollectiblesGallery() {
  const [nfts, setNfts] = useState<{ nft: NFTItem; title: string; time: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        const response = await fetch("https://api.coingecko.com/api/v3/search/trending");
        if (!response.ok) throw new Error("API rate limit");
        
        const data = await response.json();
        if (data && data.nfts) {
          // CoinGecko usually returns 7 NFTs. We need 10 for a 2x5 grid.
          // We will duplicate some items to fill the grid if necessary.
          const fetchedNfts: NFTItem[] = data.nfts.map((item: any) => ({
            id: item.id,
            name: item.name,
            // Replace small thumb with large image if possible, though CG usually provides 250x250 thumb
            thumb: item.thumb.replace('small', 'large')
          }));

          let pool = [...fetchedNfts];
          while (pool.length < 10 && fetchedNfts.length > 0) {
            pool.push(fetchedNfts[Math.floor(Math.random() * fetchedNfts.length)]);
          }
          pool = pool.slice(0, 10);

          const finalData = pool.map(item => ({
            nft: item,
            title: `${item.name} ${getRandomItem(headlineTemplates)}`,
            time: getRandomItem(timeTemplates)
          }));

          setNfts(finalData);
        }
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(true);
        setLoading(false);
      }
    };

    fetchNFTs();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-16">
      <div className="flex items-center gap-6 mb-6">
        <h2 className="font-display font-bold text-base text-foreground tracking-widest uppercase">
          Collectibles<span className="animate-pulse text-primary ml-1">_</span>
        </h2>
        <a href="#" className="flex items-center font-sans text-xs font-bold text-muted-foreground uppercase tracking-widest hover:text-primary transition-colors">
          Latest News <ChevronRight size={14} className="ml-1" />
        </a>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center h-64 text-muted-foreground bg-muted/20 rounded-xl border border-border border-dashed">
          <AlertCircle size={24} className="mb-2 opacity-50" />
          <p className="font-sans text-sm">CoinGecko API limit reached.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {nfts.map((item, i) => (
            <motion.article 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              className="flex flex-col group cursor-pointer relative"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <Link 
                to={`/article/${item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} 
                state={{...item, image: item.nft.thumb, author: "NFT Tracker", category: "Collectibles"}}
                className="absolute inset-0 z-20 outline-none border-none focus:outline-none"
              >
                <span className="sr-only">Read {item.title}</span>
              </Link>

              <div className="relative aspect-square w-full rounded-md overflow-hidden mb-3 bg-muted shadow-sm border border-primary/20 group-hover:border-primary/50 group-hover:shadow-[0_0_20px_rgba(217,70,239,0.3)] transition-all duration-300 cyber-card">
                <img 
                  src={item.nft.thumb} 
                  alt={item.nft.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 scanlines opacity-30 mix-blend-overlay group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
              
              <h3 className="font-sans font-bold text-xs leading-tight text-foreground group-hover:text-primary transition-colors line-clamp-3 pr-2 cyber-glitch-hover">
                {item.title}
              </h3>
              
              <div className="flex items-center gap-1 mt-2 text-muted-foreground">
                <Clock size={10} />
                <span className="font-sans font-semibold text-[10px] tracking-wider uppercase">
                  {item.time}
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      )}
    </section>
  );
}
