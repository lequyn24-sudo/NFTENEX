import { motion } from "motion/react";
import { Clock, Bookmark, Share2 } from "lucide-react";
import { Link } from "react-router";

interface Article {
  title: string;
  excerpt: string;
  author: string;
  time: string;
  image: string;
}

const mockData: Record<string, Article[]> = {
  "NFTs": [
    {
      title: "The Ultimate Guide to Launching Your First NFT Collection in 2026",
      excerpt: "Step-by-step instructions from creating art to deploying smart contracts and building a community around your project.",
      author: "ALEX NOMURA",
      time: "2 hr ago",
      image: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80"
    },
    {
      title: "Top 5 Ethereum Marketplaces Ranked by Volume",
      excerpt: "A deep dive into the leading platforms where collectors are trading the highest value blue-chip assets.",
      author: "SARAH CHEN",
      time: "5 hr ago",
      image: "https://images.unsplash.com/photo-1644361566696-3d442b5b482a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80"
    }
  ],
  "Reviews": [
    {
      title: "Review: Pudgy Penguins 'Overpass' Ecosystem",
      excerpt: "We tested the new IP licensing platform that promises to revolutionize how holders monetize their penguins.",
      author: "NINA OKAFOR",
      time: "1 day ago",
      image: "https://images.unsplash.com/photo-1640499900704-b00dd6a1103a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80"
    },
    {
      title: "Is the new Yuga Labs Game Actually Fun?",
      excerpt: "An honest breakdown of the gameplay loop, tokenomics, and long-term sustainability of the Otherside expansion.",
      author: "JAMES PARK",
      time: "2 days ago",
      image: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80"
    }
  ],
  "Market": [
    {
      title: "Institutional Capital is Flowing Back into Web3 Gaming",
      excerpt: "Venture capital firms have deployed over $500M into crypto gaming studios in the last quarter alone.",
      author: "DR. LEON VASQUEZ",
      time: "3 hr ago",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80"
    },
    {
      title: "Solana's DeFi Ecosystem Hits New TVL Milestones",
      excerpt: "Driven by liquid staking derivatives and airdrop farming, the network sees record-breaking capital inflows.",
      author: "CARLOS REYES",
      time: "6 hr ago",
      image: "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80"
    }
  ]
};

export function CategorySection({ categoryName }: { categoryName: string }) {
  const articles = mockData[categoryName] || mockData["NFTs"];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-16">
      <div className="flex items-center justify-between mb-6 pb-2 border-b border-border/50">
        <h2 className="font-display font-bold text-xl text-foreground tracking-wide uppercase">
          <span className="text-primary mr-2">/</span> {categoryName}<span className="animate-pulse text-primary ml-1">_</span>
        </h2>
        <Link to={`/category/${categoryName.toLowerCase()}`} className="font-sans text-xs font-bold text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider">
          View All
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.map((article, i) => (
          <motion.article
            key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="relative cursor-pointer group flex flex-col sm:flex-row bg-card border border-border rounded-md overflow-hidden shadow-sm cyber-card"
            whileHover={{
              y: -4,
              boxShadow: "0 15px 30px -10px rgba(0,0,0,0.3), 0 0 0 1px rgba(217,70,239,0.3)",
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <Link 
              to={`/article/${article.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} 
              state={{...article, category: categoryName}}
              className="absolute inset-0 z-10 outline-none border-none focus:outline-none"
            >
              <span className="sr-only">Read {article.title}</span>
            </Link>
            
            <div className="relative w-full sm:w-2/5 h-48 sm:h-auto overflow-hidden bg-muted">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 scanlines opacity-30 mix-blend-overlay group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>

            <div className="p-4 flex flex-col flex-1 relative z-20 justify-center pointer-events-none">
              <h3 className="font-display font-bold text-base leading-tight text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors cyber-glitch-hover pointer-events-auto">
                {article.title}
              </h3>
              <p className="font-sans text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-4">
                {article.excerpt}
              </p>

              <div className="flex items-center justify-between mt-auto pt-3 border-t border-border/50 pointer-events-none">
                <div className="flex items-center gap-2">
                  <span className="font-sans text-[9px] font-bold tracking-wider text-primary uppercase">
                    {article.author}
                  </span>
                  <span className="flex items-center gap-1 font-sans text-[9px] text-muted-foreground">
                    <Clock size={10} /> {article.time}
                  </span>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
