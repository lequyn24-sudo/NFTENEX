import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Clock, ArrowRight, Bookmark, Share2 } from "lucide-react";
import { Link } from "react-router";
import { toast } from "sonner";


const articles = [
  {
    category: "Markets",
    title: "Ethereum NFT Market Hits $1.2B Monthly Volume — First Time Since 2022",
    excerpt: "Renewed institutional interest and a wave of high-profile celebrity drops have pushed Ethereum's NFT market to levels unseen in nearly three years.",
    author: "JAMES PARK",
    time: "3 hr ago",
    image: "https://images.unsplash.com/photo-1639152201720-5e536d254d81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
    hot: true,
  },
  {
    category: "Drops",
    title: "Hyper World Genesis Collection: 10,000 AI-Generated Pieces Drop at Midnight",
    excerpt: "The highly anticipated launch from former Riot Games artists features procedural lore and on-chain governance from day one.",
    author: "SARAH CHEN",
    time: "5 hr ago",
    image: "https://images.unsplash.com/photo-1654792393225-3e8a53d124d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
    hot: false,
  },
  {
    category: "Research",
    title: "The Wash-Trading Problem: New On-Chain Data Reveals 38% of Top Volume Is Fake",
    excerpt: "A new report by Nansen and Dune Analytics uncovers sophisticated wallet networks artificially inflating collection metrics.",
    author: "DR. LEON VASQUEZ",
    time: "7 hr ago",
    image: "https://images.unsplash.com/photo-1658225282648-b199eb2a4830?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
    hot: true,
  },
  {
    category: "GameFi",
    title: "Pixels NFT Game Crosses 500K Daily Active Users on Ronin Network",
    excerpt: "The farming RPG has quietly become the most-played blockchain game by active wallets, overtaking Axie Infinity for the first time.",
    author: "ALEX NOMURA",
    time: "9 hr ago",
    image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
    hot: false,
  },
  {
    category: "Collections",
    title: "CryptoPunks V1 Controversy: Larva Labs Files Cease-and-Desist Against Clone Market",
    excerpt: "A new gray market for V1 punks is drawing scrutiny as collectors debate provenance, intellectual property, and community legitimacy.",
    author: "NINA OKAFOR",
    time: "11 hr ago",
    image: "https://images.unsplash.com/photo-1672239272089-250c32c3e2e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
    hot: false,
  },
  {
    category: "DeFi",
    title: "NFT Lending Protocols Unlock $300M in Liquidity as BendDAO 2.0 Launches",
    excerpt: "The revamped BendDAO allows instant loans against blue-chip NFTs with improved liquidation mechanics and a new isolated lending market structure.",
    author: "CARLOS REYES",
    time: "14 hr ago",
    image: "https://images.unsplash.com/photo-1639825988283-39e5408b75e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
    hot: false,
  },
];

export function NewsGrid({ displayCount }: { displayCount?: number }) {
  const [savedArticles, setSavedArticles] = useState<any[]>([]);

  useEffect(() => {
    setSavedArticles(JSON.parse(localStorage.getItem('savedArticles') || '[]'));
  }, []);

  const handleSave = (e: React.MouseEvent, article: any) => {
    e.preventDefault();
    e.stopPropagation();
    
    const saved = JSON.parse(localStorage.getItem('savedArticles') || '[]');
    const isSaved = saved.some((a: any) => a.title === article.title);
    
    let newSaved;
    if (isSaved) {
      newSaved = saved.filter((a: any) => a.title !== article.title);
      toast.success("Removed from bookmarks");
    } else {
      newSaved = [...saved, article];
      toast.success("Added to bookmarks");
    }
    
    localStorage.setItem('savedArticles', JSON.stringify(newSaved));
    setSavedArticles(newSaved);
  };

  const handleShare = (e: React.MouseEvent, title: string) => {
    e.preventDefault();
    e.stopPropagation();
    const url = window.location.origin + "/article/" + title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard");
  };

  // Create an extended array to simulate "loaded" data if displayCount > default length
  const extendedArticles = displayCount && displayCount > articles.length
    ? [...articles, ...articles.map((a, idx) => ({...a, title: `[JUST IN] ${a.title}`}))]
    : articles;
    
  const visibleArticles = displayCount ? extendedArticles.slice(0, displayCount) : articles;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display font-bold text-xl text-foreground tracking-wide uppercase">
          Latest <span className="text-primary">News</span><span className="animate-pulse text-primary ml-1">_</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
        {visibleArticles.map((article, i) => (
          <motion.article
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="relative cursor-pointer group flex flex-col bg-card border border-primary/20 rounded-md overflow-hidden shadow-sm cyber-card"
            whileHover={{
              y: -6,
              boxShadow: "0 20px 40px -10px rgba(0,0,0,0.3), 0 0 0 1px rgba(217,70,239,0.4)",
            }}
            transition={{ duration: 0.3, ease: "easeOut", delay: i * 0.1 }}
          >
            <Link 
              to={`/article/${article.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} 
              state={article} 
              className="absolute inset-0 z-10"
            >
              <span className="sr-only">Read {article.title}</span>
            </Link>
            
            <div className="relative h-48 overflow-hidden bg-muted">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-20 dark:opacity-80" />
              <div className="absolute inset-0 scanlines opacity-50 mix-blend-overlay group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="font-sans text-[10px] font-bold tracking-widest px-2.5 py-1 rounded-full bg-primary/20 text-primary border border-primary/30 backdrop-blur-md uppercase">
                  {article.category}
                </span>
                {article.hot && (
                  <span className="font-display font-bold text-[10px] tracking-widest px-2.5 py-1 rounded-full bg-destructive/20 text-destructive border border-destructive/40 backdrop-blur-md uppercase">
                    🔥 HOT
                  </span>
                )}
              </div>
            </div>

            <div className="p-5 flex flex-col flex-1 relative z-20 pointer-events-none">
              <h3 className="font-display font-bold text-lg leading-tight text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors cyber-glitch-hover pointer-events-auto">
                {article.title}
              </h3>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-6 flex-1">
                {article.excerpt}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-border mt-auto pointer-events-none">
                <div className="flex items-center gap-3">
                  <span className="font-sans text-[10px] font-bold tracking-wider text-primary uppercase">
                    {article.author}
                  </span>
                  <span className="flex items-center gap-1.5 font-sans text-[10px] text-muted-foreground">
                    <Clock size={12} /> {article.time}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={(e) => handleSave(e, article)}
                    className={`p-2 rounded-full transition-all relative z-50 pointer-events-auto ${savedArticles.some((a: any) => a.title === article.title) ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`}
                  >
                    <Bookmark size={14} fill={savedArticles.some((a: any) => a.title === article.title) ? "currentColor" : "none"} />
                  </button>
                  <button 
                    onClick={(e) => handleShare(e, article.title)}
                    className="p-2 rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground transition-all relative z-50 pointer-events-auto"
                  >
                    <Share2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
