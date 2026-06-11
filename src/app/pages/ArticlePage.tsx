import { useLocation, useParams, Link } from "react-router";
import { Clock, Eye, Share2, Bookmark, ArrowLeft, Twitter, Linkedin, Link as LinkIcon } from "lucide-react";
import { motion } from "motion/react";
import { RightSidebar } from "../components/RightSidebar";

export function ArticlePage() {
  const { slug } = useParams();
  const location = useLocation();
  
  // Use passed state or fallback to generated mock data based on slug
  const article = location.state || {
    title: slug?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || "Exploring the Future of Web3 and NFTs",
    category: "Insights",
    author: "SYSTEM OMEGA",
    time: "Just now",
    views: "1.2K",
    image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80",
    excerpt: "The intersection of digital ownership and decentralized finance continues to evolve."
  };

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 pb-20">
      <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-sans text-sm font-semibold mb-6 cyber-glitch-hover">
        <ArrowLeft size={16} /> Back to Home
      </Link>

      {/* Hero Section */}
      <header className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-display text-[10px] font-bold tracking-widest px-2.5 py-1 rounded-sm bg-primary/20 text-primary border border-primary/30 uppercase">
            {article.category || article.tag || "News"}
          </span>
          <span className="font-sans text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
            {article.time}
          </span>
        </div>

        <h1 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-foreground leading-tight mb-6">
          {article.title}
        </h1>

        <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-muted border border-border flex items-center justify-center overflow-hidden">
              <img src={`https://api.dicebear.com/9.x/pixel-art/svg?seed=${article.author}`} alt={article.author} className="w-full h-full" />
            </div>
            <div>
              <div className="font-sans font-bold text-sm text-foreground">{article.author}</div>
              <div className="font-sans text-xs text-muted-foreground">Web3 Reporter</div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 font-sans text-xs font-semibold text-muted-foreground">
              <Eye size={14} /> {article.views || "12.4K"}
            </div>
            <div className="flex items-center gap-2 border-l border-border pl-4">
              <button className="p-2 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                <Twitter size={16} />
              </button>
              <button className="p-2 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                <Linkedin size={16} />
              </button>
              <button className="p-2 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                <LinkIcon size={16} />
              </button>
              <button className="p-2 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors ml-2 border border-border">
                <Bookmark size={16} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Feature Image */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full aspect-video rounded-xl overflow-hidden mb-12 border border-primary/20 cyber-card shadow-lg"
      >
        <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 scanlines opacity-30 mix-blend-overlay pointer-events-none" />
      </motion.div>

      {/* Article Body */}
      <div className="prose prose-invert max-w-none font-sans text-base sm:text-lg text-muted-foreground leading-relaxed">
        <p className="text-xl font-medium text-foreground mb-8 border-l-4 border-primary pl-4">
          {article.excerpt}
        </p>

        <p className="mb-6">
          The decentralized landscape is witnessing an unprecedented shift as foundational protocols adapt to massive institutional inflows. Analysts suggest that the recent surge in on-chain activity is not merely a retail-driven phenomenon, but a calculated accumulation phase by major market makers preparing for the next macroeconomic cycle.
        </p>

        <h2 className="font-display font-bold text-2xl text-foreground mt-12 mb-6">The Catalyst Behind the Surge</h2>
        
        <p className="mb-6">
          Recent deployments of zero-knowledge rollups (zk-Rollups) on Ethereum mainnet have drastically reduced gas fees, making micro-transactions within Web3 ecosystems economically viable for the first time since 2021. This technological leap has catalyzed a renaissance in fully on-chain gaming and high-frequency NFT trading.
        </p>

        <blockquote className="bg-card/50 border border-primary/30 p-6 rounded-lg my-8 cyber-card shadow-[0_0_15px_rgba(217,70,239,0.1)]">
          <p className="font-display text-xl text-primary font-bold italic m-0">
            "We are witnessing the transition from speculative JPEGs to programmable financial assets. The line between DeFi and NFTs is officially erased."
          </p>
        </blockquote>

        <p className="mb-6">
          Furthermore, liquidity protocols have introduced novel mechanisms allowing users to collateralize blue-chip digital assets instantly. The integration of algorithmic risk-assessment models ensures that lending pools remain solvent even during periods of extreme volatility.
        </p>

        <h2 className="font-display font-bold text-2xl text-foreground mt-12 mb-6">Looking Ahead: What This Means for Retail</h2>

        <p className="mb-6">
          While institutional capital provides stability, the core ethos of Web3 remains decentralized ownership. For everyday users, this maturity translates to safer decentralized applications (dApps), insured custody solutions, and yield-bearing utility for idle assets.
        </p>

        <ul className="list-disc pl-6 mb-8 space-y-2">
          <li><strong>Reduced slippage:</strong> Automated market makers (AMMs) are now routing trades through deep liquidity pools.</li>
          <li><strong>Cross-chain interoperability:</strong> Bridging assets securely without relying on centralized intermediaries.</li>
          <li><strong>Enhanced UX:</strong> Account abstraction allows gasless transactions and social recovery of wallets.</li>
        </ul>

        <p className="mb-6">
          As regulatory frameworks begin to crystalize globally, the path forward for digital assets appears clearer than ever. The focus has undeniably shifted from hype-driven mints to sustainable infrastructure and real-world utility.
        </p>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-3 mt-12 mb-8">
          <span className="font-sans text-xs font-bold text-muted-foreground uppercase tracking-wider">Tags:</span>
          {["Web3", "Ethereum", "DeFi", "NFTs"].map((tag, i) => (
            <span key={i} className="px-3 py-1.5 rounded-md bg-muted text-foreground font-sans text-xs font-semibold hover:bg-primary/20 hover:text-primary transition-colors cursor-pointer cyber-glitch-hover">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-border">
        <span className="font-display font-bold tracking-[0.2em] text-primary/50 text-sm uppercase flex justify-center mb-12">END OF FILE_</span>

        {/* Author Bio Box */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 rounded-xl bg-card border border-border cyber-card mb-16">
          <div className="w-20 h-20 shrink-0 rounded-full bg-muted border-2 border-primary/30 flex items-center justify-center overflow-hidden">
            <img src={`https://api.dicebear.com/9.x/pixel-art/svg?seed=${article.author}`} alt={article.author} className="w-full h-full" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h3 className="font-display font-bold text-xl text-foreground mb-1">{article.author}</h3>
            <p className="font-sans text-sm text-primary font-semibold mb-3 uppercase tracking-wider">Lead Web3 Reporter</p>
            <p className="font-sans text-sm text-muted-foreground mb-4">
              Exploring the frontiers of decentralized tech, NFTs, and digital economies. Covering the crypto space since 2017.
            </p>
            <div className="flex items-center justify-center sm:justify-start gap-3">
              <button className="px-4 py-2 rounded-md bg-primary/10 text-primary font-sans text-xs font-bold uppercase tracking-wider hover:bg-primary hover:text-primary-foreground transition-colors">
                Follow
              </button>
              <button className="p-2 rounded-md bg-muted text-muted-foreground hover:text-foreground transition-colors">
                <Twitter size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Read Next / Recommended Articles */}
        <div className="mb-16">
          <h3 className="font-display font-bold text-2xl text-foreground uppercase tracking-wide mb-6 flex items-center gap-2">
            Read <span className="text-primary">Next</span><span className="animate-pulse text-primary">_</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: "Solana NFT Volume Tops Ethereum for Third Consecutive Week", category: "Data", time: "1 hr ago", image: "https://images.unsplash.com/photo-1672239272089-250c32c3e2e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80" },
              { title: "Why Blur's New Bid Pool Is Reshaping Pro-Trader Behavior", category: "Research", time: "2 hr ago", image: "https://images.unsplash.com/photo-1639825988283-39e5408b75e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80" }
            ].map((rec, i) => (
              <Link 
                key={i}
                to={`/article/${rec.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                state={rec}
                className="group flex flex-col sm:flex-row gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/40 transition-colors cyber-card overflow-hidden"
              >
                <div className="w-full sm:w-32 h-32 shrink-0 rounded-lg overflow-hidden bg-muted relative">
                  <img src={rec.image} alt={rec.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 scanlines opacity-30 mix-blend-overlay group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="font-sans text-[10px] font-bold text-primary uppercase tracking-widest mb-2">
                    {rec.category}
                  </span>
                  <h4 className="font-display font-bold text-base text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2 leading-snug">
                    {rec.title}
                  </h4>
                  <span className="font-sans text-[10px] font-semibold text-muted-foreground flex items-center gap-1.5">
                    <Clock size={10} /> {rec.time}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Newsletter CTA */}
        <div className="relative p-8 rounded-2xl bg-gradient-to-br from-card to-background border border-primary/20 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[80px] rounded-full pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-display font-bold text-2xl text-foreground mb-2">Stay in the Loop</h3>
              <p className="font-sans text-sm text-muted-foreground">Get the latest Web3 news, drops, and alpha straight to your inbox.</p>
            </div>
            <div className="flex w-full md:w-auto gap-2">
              <input type="email" placeholder="Enter your email" className="flex-1 md:w-64 px-4 py-3 rounded-lg bg-background border border-border focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-sans text-sm" />
              <button className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-display font-bold text-sm tracking-widest uppercase hover:bg-primary/90 transition-colors shadow-[0_0_15px_rgba(217,70,239,0.3)]">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
