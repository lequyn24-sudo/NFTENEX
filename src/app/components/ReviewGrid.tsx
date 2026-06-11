import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Clock, Bookmark, Share2, Star } from "lucide-react";
import { toast } from "sonner";

const articles = [
  {
    category: "GameFi",
    title: "Off The Grid: The Cyberpunk Battle Royale We Deserve?",
    excerpt: "Gunzilla Games delivers a visually stunning and mechanics-heavy shooter, but does the blockchain integration actually add value to the gameplay loop?",
    author: "JAMES PARK",
    time: "3 hr ago",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
    score: 8.5,
  },
  {
    category: "Metaverse",
    title: "Otherside: Yuga's Ambitious World Still Feels Empty",
    excerpt: "The latest playtest shows massive technical improvements in rendering 10,000 players, but the core gameplay remains an unanswered question.",
    author: "SARAH CHEN",
    time: "5 hr ago",
    image: "https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
    score: 6.0,
  },
  {
    category: "Hardware",
    title: "Ledger Stax Review: The E-Ink Wallet We Always Wanted",
    excerpt: "Tony Fadell's design influence shines through in this premium hardware wallet. It's beautiful, functional, and finally makes self-custody look cool.",
    author: "DR. LEON VASQUEZ",
    time: "7 hr ago",
    image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
    score: 9.2,
  },
  {
    category: "GameFi",
    title: "Shrapnel Early Access: A Hardcore Extraction Shooter",
    excerpt: "The AAA graphics are undeniable, but the brutal TTK and complex economy might alienate casual players looking for a quick Web3 game.",
    author: "ALEX NOMURA",
    time: "9 hr ago",
    image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
    score: 7.8,
  },
  {
    category: "NFTs",
    title: "Pudgy Toys: Bridging Web2 Retail and Web3 Ownership",
    excerpt: "How a cute penguin plushie in Walmart is doing more for crypto onboarding than years of complex DeFi protocols.",
    author: "NINA OKAFOR",
    time: "11 hr ago",
    image: "https://images.unsplash.com/photo-1672239272089-250c32c3e2e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
    score: 9.5,
  },
  {
    category: "Platform",
    title: "Blur V2: The Trader's Paradise Gets Even Sweaty-er",
    excerpt: "New bidding mechanics and trait-level sweeps solidify Blur's position as the terminal for pro NFT traders, leaving casuals behind.",
    author: "CARLOS REYES",
    time: "14 hr ago",
    image: "https://images.unsplash.com/photo-1639825988283-39e5408b75e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
    score: 8.0,
  },
];

export function ReviewGrid({ displayCount }: { displayCount?: number }) {
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
    ? [...articles, ...articles.map(a => ({...a, title: `[NEW] ${a.title}`}))]
    : articles;
    
  const visibleArticles = displayCount ? extendedArticles.slice(0, displayCount) : articles;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display font-bold text-xl text-foreground tracking-wide uppercase">
          Latest <span className="text-primary">Reviews</span><span className="animate-pulse text-primary ml-1">_</span>
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
            <a href="#" className="absolute inset-0 z-10"><span className="sr-only">Read {article.title}</span></a>
            
            <div className="relative h-56 overflow-hidden bg-muted">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent opacity-20 dark:opacity-90" />
              <div className="absolute inset-0 scanlines opacity-50 mix-blend-overlay group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="font-sans text-[10px] font-bold tracking-widest px-2.5 py-1 rounded-sm bg-background/80 text-foreground border border-border backdrop-blur-md uppercase">
                  {article.category}
                </span>
              </div>

              {/* Score Badge */}
              <div className="absolute top-4 right-4 flex items-center gap-1 bg-background border border-primary/50 text-primary px-3 py-1.5 rounded-sm shadow-[0_0_15px_rgba(217,70,239,0.5)]">
                <Star size={14} className="fill-primary" />
                <span className="font-display font-bold text-lg leading-none">{article.score}</span>
                <span className="font-sans text-[10px] text-muted-foreground mt-1">/10</span>
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

                <div className="flex items-center gap-1 pointer-events-auto">
                  <button
                    onClick={(e) => handleSave(e, article)}
                    className={`p-2 rounded-full transition-all ${savedArticles.some((a: any) => a.title === article.title) ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`}
                  >
                    <Bookmark size={14} fill={savedArticles.some((a: any) => a.title === article.title) ? "currentColor" : "none"} />
                  </button>
                  <button 
                    onClick={(e) => handleShare(e, article.title)}
                    className="p-2 rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground transition-all"
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
