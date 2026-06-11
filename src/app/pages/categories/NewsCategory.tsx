import { NewsGrid } from "../../components/NewsGrid";
import { useState } from "react";
import { motion } from "motion/react";
import { Clock, Eye, ArrowRight, Loader2 } from "lucide-react";
import { Link } from "react-router";

const featured = {
  label: "FEATURED",
  title: "A Deep Dive Into The Ecosystem's Latest Advancements",
  excerpt: "Exploring the groundbreaking updates and innovations that are reshaping how developers and users interact with the network, driving unprecedented volume and engagement across the board.",
  author: "SYSTEM OP",
  time: "24 min ago",
  views: "12.5K",
  image: "https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80",
};

export function NewsCategory() {
  const [isLoading, setIsLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);

  const handleLoadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setVisibleCount(prev => prev + 6);
    }, 1500);
  };

  return (
    <div className="pt-4 max-w-7xl mx-auto px-4 sm:px-6 mb-12">
      <motion.article 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        className="relative rounded-md overflow-hidden cursor-pointer group border border-border bg-card shadow-md cyber-card mb-12" 
        style={{ minHeight: "420px" }} 
        whileHover={{ scale: 1.01, boxShadow: "0 0 20px rgba(217,70,239,0.2)" }} 
        transition={{ duration: 0.4 }}
      >
        <Link 
          to={`/article/${featured.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
          state={featured}
          className="absolute inset-0 z-10"
        >
          <span className="sr-only">Read article</span>
        </Link>
        <img src={featured.image} alt="Featured article" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/95 to-transparent" />
        <div className="absolute inset-0 scanlines opacity-50 mix-blend-overlay group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end pointer-events-none">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-2.5 py-1 rounded-sm font-display text-[10px] font-bold tracking-widest bg-primary text-primary-foreground">
              {featured.label}
            </span>
          </div>
          <h1 className="font-display font-bold text-3xl sm:text-4xl leading-tight text-foreground mb-3 group-hover:text-primary transition-colors duration-300 cyber-glitch-hover">
            {featured.title}
          </h1>
          <p className="font-sans text-sm sm:text-base text-muted-foreground line-clamp-2 mb-6 max-w-3xl">
            {featured.excerpt}
          </p>
          <div className="flex items-center justify-between pointer-events-auto">
            <div className="flex flex-wrap items-center gap-4">
              <span className="font-sans text-xs font-bold text-primary tracking-wider">{featured.author}</span>
              <span className="flex items-center gap-1.5 font-sans text-xs text-muted-foreground"><Clock size={12} /> {featured.time}</span>
              <span className="flex items-center gap-1.5 font-sans text-xs text-muted-foreground"><Eye size={12} /> {featured.views}</span>
            </div>
            <span className="flex items-center gap-1.5 font-sans text-xs font-bold text-primary transition-all group-hover:gap-2.5">
              Read <ArrowRight size={14} />
            </span>
          </div>
        </div>
      </motion.article>

      <NewsGrid displayCount={visibleCount} />
      
      {visibleCount <= 6 && (
        <div className="mt-12 flex justify-center">
        <button 
          onClick={handleLoadMore}
          disabled={isLoading}
          className="relative px-8 py-3 bg-card border border-primary/50 text-primary font-display font-bold text-sm tracking-widest uppercase hover:bg-primary hover:text-primary-foreground transition-all duration-300 group cyber-card rounded-sm overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <span className="relative z-10 flex items-center gap-2">
            {isLoading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Loading...
              </>
            ) : (
              <>
                Load More <span className="animate-pulse">_</span>
              </>
            )}
          </span>
          {!isLoading && <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />}
        </button>
        </div>
      )}
    </div>
  );
}
