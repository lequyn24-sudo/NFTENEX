import { useParams } from "react-router";
import { motion } from "motion/react";
import { Hash, Clock, Bookmark, Share2 } from "lucide-react";
import { Link } from "react-router";

const mockArticles = [
  {
    category: "Tags",
    title: "Understanding the Basics and Future Impact of This Technology",
    excerpt: "A deep dive into how this ecosystem is evolving, with key insights from industry leaders and developers.",
    author: "CRYPTO RESEARCH DESK",
    time: "2 hr ago",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f4ec651?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80"
  },
  {
    category: "Tags",
    title: "Market Analysis: Surging Trading Volume and New Use Cases",
    excerpt: "Retail and institutional interest pushes metrics to an all-time high amidst positive regulatory news.",
    author: "ALEX NOMURA",
    time: "5 hr ago",
    image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80"
  },
  {
    category: "Tags",
    title: "Top 5 Upcoming Projects You Should Keep on Your Radar",
    excerpt: "From innovative infrastructure to new consumer applications, these projects are pushing the boundaries.",
    author: "SARAH CHEN",
    time: "12 hr ago",
    image: "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80"
  },
  {
    category: "Tags",
    title: "Security Deep Dive: How to Protect Your Assets",
    excerpt: "Best practices, common pitfalls, and the latest security tooling available for end users.",
    author: "DR. LEON VASQUEZ",
    time: "1 day ago",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80"
  }
];

export function TagPage() {
  const { tagName } = useParams<{ tagName: string }>();
  
  const displayTag = tagName ? decodeURIComponent(tagName) : "Tag";

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className="flex-1 pb-16">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 mb-8 border-b border-border/50">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4"
        >
          <div className="flex items-center gap-2">
            <span className="font-sans text-xs font-bold text-primary tracking-widest uppercase">
              Tag Results
            </span>
          </div>
          <h1 className="font-display font-black text-5xl md:text-6xl text-foreground uppercase tracking-tight flex items-center flex-wrap gap-2">
            <Hash className="text-primary" size={48} />
            {displayTag}<span className="animate-pulse text-primary ml-1">_</span>
          </h1>
          <p className="font-sans text-muted-foreground max-w-2xl mt-4">
            Showing all the latest articles, deep dives, and news related to #{displayTag}.
          </p>
        </motion.div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockArticles.map((article, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              className="relative cursor-pointer group flex flex-col bg-card border border-border rounded-xl overflow-hidden shadow-sm cyber-card"
              whileHover={{
                y: -6,
                boxShadow: "0 20px 40px -10px rgba(0,0,0,0.3), 0 0 0 1px rgba(217,70,239,0.4)",
              }}
              transition={{ duration: 0.3, ease: "easeOut", delay: i * 0.1 }}
            >
              <Link 
                to={`/article/${article.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} 
                state={{...article, title: `[${displayTag}] ${article.title}`}}
                className="absolute inset-0 z-10 outline-none border-none focus:outline-none"
              >
                <span className="sr-only">Read article</span>
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
                    #{displayTag}
                  </span>
                </div>
              </div>

              <div className="p-5 flex flex-col flex-1 relative z-20 pointer-events-none">
                <h3 className="font-display font-bold text-lg leading-tight text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors cyber-glitch-hover pointer-events-auto">
                  [{displayTag}] {article.title}
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
                      onClick={handleSave}
                      className="p-2 rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground transition-all relative z-50 pointer-events-auto"
                    >
                      <Bookmark size={14} />
                    </button>
                    <button 
                      onClick={handleShare}
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
    </div>
  );
}
