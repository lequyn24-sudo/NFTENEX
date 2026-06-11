import { motion } from "motion/react";
import { Clock, Eye, ArrowRight } from "lucide-react";
import { Link } from "react-router";

const featured = {
  label: "BREAKING",
  title: "OpenSea 3.0 Launches With Zero-Fee Protocol Amid Market Surge",
  excerpt: "The world's largest NFT marketplace has unveiled its third major overhaul, eliminating creator royalties enforcement and introducing a new order-book model that attracted $240M in volume within the first six hours.",
  author: "MAYA TORRES",
  time: "14 min ago",
  views: "48.2K",
  image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80",
  tag: "Markets",
};

const sidePosts = [
  { label: "TRENDING", title: "Bored Apes Floor Price Climbs 22% After Yuga Labs Tease", time: "32 min ago", tag: "Collections", image: "https://images.unsplash.com/photo-1654183818269-22495f928eb1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80" },
  { label: "HOT", title: "Solana NFT Volume Tops Ethereum for Third Consecutive Week", time: "1 hr ago", tag: "Data", image: "https://images.unsplash.com/photo-1672239272089-250c32c3e2e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80" },
  { label: "ANALYSIS", title: "Why Blur's New Bid Pool Is Reshaping Pro-Trader Behavior", time: "2 hr ago", tag: "Research", image: "https://images.unsplash.com/photo-1639825988283-39e5408b75e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80" },
];

const labelColor: Record<string, string> = { BREAKING: "bg-destructive text-destructive-foreground", TRENDING: "bg-primary text-primary-foreground", HOT: "bg-orange-500 text-white", ANALYSIS: "bg-accent text-accent-foreground" };

export function HeroSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.article 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="lg:col-span-2 relative rounded-md overflow-hidden cursor-pointer group border border-primary/20 bg-card shadow-md cyber-card" 
          style={{ minHeight: "420px" }} 
          whileHover={{ scale: 1.01, boxShadow: "0 0 20px rgba(217,70,239,0.2)" }} 
          transition={{ duration: 0.4 }}
        >
          <Link to={`/article/${featured.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} state={featured} className="absolute inset-0 z-10">
            <span className="sr-only">Read article</span>
          </Link>
          <img src={featured.image} alt="Featured article" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/95 to-transparent" />
          <div className="absolute inset-0 scanlines opacity-50 mix-blend-overlay group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end pointer-events-none">
            <div className="flex items-center gap-3 mb-4">
              <span className={`px-2.5 py-1 rounded-sm font-display text-[10px] font-bold tracking-widest ${labelColor[featured.label]}`}>
                {featured.label}
              </span>
              <span className="px-2.5 py-1 rounded-sm font-sans text-xs font-semibold bg-accent/20 text-accent border border-accent/30">
                {featured.tag}
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

        <div className="flex flex-col gap-6">
          {sidePosts.map((post, i) => (
            <motion.article 
              key={i} 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              className="relative rounded-md overflow-hidden cursor-pointer group flex border border-primary/20 bg-card shadow-sm h-[126px] cyber-card" 
              whileHover={{ borderColor: "rgba(217,70,239,0.5)", x: 4 }} 
              transition={{ duration: 0.3, delay: i * 0.1 }}
            >
              <Link to={`/article/${post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} state={post} className="absolute inset-0 z-10">
                <span className="sr-only">Read {post.title}</span>
              </Link>
              <div className="relative w-32 shrink-0 overflow-hidden">
                <img src={post.image} alt={post.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 scanlines opacity-30 mix-blend-overlay group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
              <div className="flex flex-col justify-between p-4 flex-1 overflow-hidden bg-card/50">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-0.5 rounded-sm font-display text-[9px] font-bold tracking-widest ${labelColor[post.label]}`}>
                      {post.label}
                    </span>
                  </div>
                  <h3 className="line-clamp-2 font-display font-bold text-sm leading-snug text-foreground group-hover:text-primary transition-colors cyber-glitch-hover">
                    {post.title}
                  </h3>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="font-sans text-[10px] text-muted-foreground">{post.time}</span>
                  <span className="font-sans text-[10px] font-semibold text-accent">{post.tag}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
