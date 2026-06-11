import { Search, Hash, Clock, Send, Twitter, Facebook, Instagram, Youtube, Users } from "lucide-react";
import { Link } from "react-router";

const trendingTags = ["#Bitcoin", "#SolanaNFT", "#GameFi", "#Airdrops", "#Ethereum", "#Web3"];

const latestNews = [
  { title: "Yuga Labs announces new Otherside expansion", time: "10 min ago" },
  { title: "Pudgy Penguins toys hit shelves in 2,000 retail stores", time: "1 hr ago" },
  { title: "SEC delays decision on spot Ethereum ETF", time: "2 hrs ago" },
];

const authors = [
  { name: "James Park", role: "Senior Editor", avatar: "https://i.pravatar.cc/150?u=james" },
  { name: "Sarah Chen", role: "Market Analyst", avatar: "https://i.pravatar.cc/150?u=sarah" },
  { name: "Dr. Leon Vasquez", role: "On-Chain Researcher", avatar: "https://i.pravatar.cc/150?u=leon" },
];

export function RightSidebar() {
  return (
    <aside className="hidden xl:flex flex-col w-[300px] h-screen sticky top-0 border-l border-border/50 bg-transparent p-6 overflow-y-auto">
      
      {/* Search Bar */}
      <div className="relative mb-8">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input 
          type="text" 
          placeholder="Search news..." 
          className="w-full bg-muted border border-border rounded-lg py-2 pl-10 pr-4 text-sm font-sans text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
        />
      </div>

      {/* Subscribe Widget */}
      <div className="mb-8 p-4 rounded-xl bg-gradient-to-br from-primary/10 to-accent/5 border border-primary/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-primary/20 blur-2xl rounded-full -mr-10 -mt-10 pointer-events-none" />
        <h3 className="font-display font-bold text-sm tracking-wide text-foreground mb-1 uppercase">Stay Updated</h3>
        <p className="font-sans text-xs text-muted-foreground mb-3">Get the latest news directly to your inbox.</p>
        <div className="flex gap-2">
          <input 
            type="email" 
            placeholder="Email..." 
            className="flex-1 bg-background/80 border border-border rounded text-xs px-3 py-2 outline-none focus:border-primary/50"
          />
          <button className="bg-primary text-primary-foreground rounded p-2 hover:bg-primary/90 transition-colors">
            <Send size={14} />
          </button>
        </div>
      </div>

      {/* Stay Connected (Social Counters) */}
      <div className="mb-8">
        <h3 className="font-display font-bold text-sm tracking-widest text-muted-foreground uppercase mb-4">Stay Connected</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col items-center p-3 rounded-lg bg-muted/50 border border-border hover:border-primary/50 transition-colors cursor-pointer group">
            <Twitter size={18} className="text-muted-foreground group-hover:text-[#1DA1F2] transition-colors mb-1" />
            <span className="font-sans font-bold text-sm text-foreground">14.2K</span>
            <span className="font-sans text-[10px] text-muted-foreground uppercase">Followers</span>
          </div>
          <div className="flex flex-col items-center p-3 rounded-lg bg-muted/50 border border-border hover:border-primary/50 transition-colors cursor-pointer group">
            <Facebook size={18} className="text-muted-foreground group-hover:text-[#1877F2] transition-colors mb-1" />
            <span className="font-sans font-bold text-sm text-foreground">8.5K</span>
            <span className="font-sans text-[10px] text-muted-foreground uppercase">Fans</span>
          </div>
          <div className="flex flex-col items-center p-3 rounded-lg bg-muted/50 border border-border hover:border-primary/50 transition-colors cursor-pointer group">
            <Instagram size={18} className="text-muted-foreground group-hover:text-[#E1306C] transition-colors mb-1" />
            <span className="font-sans font-bold text-sm text-foreground">22.1K</span>
            <span className="font-sans text-[10px] text-muted-foreground uppercase">Followers</span>
          </div>
          <div className="flex flex-col items-center p-3 rounded-lg bg-muted/50 border border-border hover:border-primary/50 transition-colors cursor-pointer group">
            <Youtube size={18} className="text-muted-foreground group-hover:text-[#FF0000] transition-colors mb-1" />
            <span className="font-sans font-bold text-sm text-foreground">45.8K</span>
            <span className="font-sans text-[10px] text-muted-foreground uppercase">Subs</span>
          </div>
        </div>
      </div>

      {/* Trending Tags */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Hash size={16} className="text-primary" />
          <h3 className="font-display font-bold text-sm tracking-widest text-muted-foreground uppercase">Trending Tags</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {trendingTags.map((tag, i) => (
            <a 
              key={i} 
              href="#" 
              className="px-2.5 py-1 rounded bg-muted/50 border border-border font-sans text-xs font-semibold text-foreground hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-colors"
            >
              {tag}
            </a>
          ))}
        </div>
      </div>

      {/* Latest News */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Clock size={16} className="text-accent" />
          <h3 className="font-display font-bold text-sm tracking-widest text-muted-foreground uppercase">Latest News</h3>
        </div>
        <div className="flex flex-col gap-4">
          {latestNews.map((news, i) => (
            <Link 
              key={i} 
              to={`/article/${news.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
              state={{ ...news, author: "News Desk", category: "Latest", image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80" }}
              className="group flex flex-col gap-1 border-l-2 border-transparent hover:border-primary pl-3 transition-colors"
            >
              <span className="font-sans text-sm font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                {news.title}
              </span>
              <span className="font-sans text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                {news.time}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Authors */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Users size={16} className="text-primary" />
          <h3 className="font-display font-bold text-sm tracking-widest text-muted-foreground uppercase">Featured Authors</h3>
        </div>
        <div className="flex flex-col gap-3">
          {authors.map((author, i) => (
            <div key={i} className="flex items-center gap-3 group cursor-pointer">
              <img src={author.avatar} alt={author.name} className="w-10 h-10 rounded-full border border-border group-hover:border-primary transition-colors" />
              <div className="flex flex-col">
                <span className="font-sans text-sm font-bold text-foreground group-hover:text-primary transition-colors">{author.name}</span>
                <span className="font-sans text-xs text-muted-foreground">{author.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Links */}
      <div className="mt-auto pt-8 flex flex-col gap-2 border-t border-border/50">
        <div className="flex flex-wrap gap-x-3 gap-y-1">
          {["Privacy Policy", "Terms of Service", "Cookie Policy", "Contact Us", "About"].map((link, i) => (
            <Link 
              key={i} 
              to={`/info/${link.toLowerCase().replace(/ /g, '-')}`} 
              className="font-sans text-[11px] text-muted-foreground hover:text-primary transition-colors"
            >
              {link}
            </Link>
          ))}
        </div>
        <span className="font-sans text-[11px] text-muted-foreground mt-2">© 2026 NFTenex. All rights reserved.</span>
      </div>

    </aside>
  );
}
