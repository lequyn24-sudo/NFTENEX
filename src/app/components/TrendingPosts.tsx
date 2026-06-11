import { motion } from "motion/react";
import { Clock } from "lucide-react";
import { Link } from "react-router";

const trendingPosts = [
  { rank: 1, title: "Ethereum NFT Market Hits $1.2B Monthly Volume", category: "Markets", time: "3 hr ago" },
  { rank: 2, title: "Hyper World Genesis Drops 10,000 AI Pieces", category: "Gaming", time: "5 hr ago" },
  { rank: 3, title: "The Wash-Trading Problem: 38% Volume Fake", category: "Research", time: "7 hr ago" },
  { rank: 4, title: "Pixels NFT Game Crosses 500K Daily Users", category: "GameFi", time: "9 hr ago" },
  { rank: 5, title: "CryptoPunks V1 Controversy Draws Scrutiny", category: "NFT", time: "11 hr ago" },
  { rank: 6, title: "NFT Lending Protocols Unlock $300M Liquidity", category: "DeFi", time: "14 hr ago" },
];

export function TrendingPosts() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display font-bold text-xl text-foreground tracking-wide uppercase">
          Trending <span className="text-primary">Posts</span><span className="animate-pulse text-primary ml-1">_</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {trendingPosts.map((post, i) => (
          <motion.div 
            key={post.rank}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="flex items-start gap-4 p-4 border border-primary/20 bg-card rounded-md shadow-sm cursor-pointer group relative overflow-hidden cyber-card"
            whileHover={{ y: -4, borderColor: "rgba(217,70,239,0.4)", boxShadow: "0 10px 25px -5px rgba(217, 70, 239, 0.15)" }}
            transition={{ duration: 0.2, delay: i * 0.05 }}
          >
            <Link to={`/article/${post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} state={post} className="absolute inset-0 z-20 outline-none border-none focus:outline-none focus:ring-0">
              <span className="sr-only">Read {post.title}</span>
            </Link>
            <div className="absolute inset-0 scanlines opacity-0 group-hover:opacity-30 transition-opacity pointer-events-none" />
            <div className="text-5xl font-display font-black text-muted-foreground/20 group-hover:text-primary/20 transition-colors relative z-10">
              {post.rank}
            </div>
            <div className="flex flex-col gap-1.5 mt-1 relative z-10">
              <span className="font-sans text-[10px] font-bold tracking-widest text-primary uppercase">
                {post.category}
              </span>
              <h3 className="font-sans font-bold text-sm text-foreground group-hover:text-primary transition-colors leading-snug line-clamp-2 cyber-glitch-hover">
                {post.title}
              </h3>
              <span className="flex items-center gap-1 font-sans text-[10px] font-semibold text-muted-foreground mt-1">
                <Clock size={10} /> {post.time}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
