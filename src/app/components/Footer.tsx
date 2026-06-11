import { Link } from "react-router";
import { Twitter, Facebook, Instagram, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full mt-20 pt-10 pb-8 border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Logo & Socials */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="text-primary transition-transform group-hover:scale-105 duration-300">
              <svg width="24" height="24" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="5" y="5" width="50" height="70" stroke="currentColor" strokeWidth="10" fill="none" />
                <rect x="35" y="25" width="50" height="70" stroke="currentColor" strokeWidth="10" fill="none" />
                <path d="M25 25 L75 85" stroke="currentColor" strokeWidth="10" />
              </svg>
            </div>
            <span className="font-display font-bold text-xl text-primary lowercase tracking-wide drop-shadow-[0_0_10px_rgba(217,70,239,0.5)]">
              nftenex
            </span>
          </Link>
          
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-full bg-muted text-muted-foreground hover:text-[#1DA1F2] hover:bg-[#1DA1F2]/10 transition-colors">
              <Twitter size={16} />
            </button>
            <button className="p-2 rounded-full bg-muted text-muted-foreground hover:text-[#1877F2] hover:bg-[#1877F2]/10 transition-colors">
              <Facebook size={16} />
            </button>
            <button className="p-2 rounded-full bg-muted text-muted-foreground hover:text-[#E1306C] hover:bg-[#E1306C]/10 transition-colors">
              <Instagram size={16} />
            </button>
            <button className="p-2 rounded-full bg-muted text-muted-foreground hover:text-[#FF0000] hover:bg-[#FF0000]/10 transition-colors">
              <Youtube size={16} />
            </button>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-col items-center md:items-end gap-3">
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
            {["Privacy Policy", "Terms of Service", "Cookie Policy", "Contact Us", "About"].map((link, i) => (
              <Link 
                key={i} 
                to={`/info/${link.toLowerCase().replace(/ /g, '-')}`} 
                className="font-sans text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                {link}
              </Link>
            ))}
          </div>
          <span className="font-sans text-xs text-muted-foreground">© 2026 NFTenex. All rights reserved.</span>
        </div>

      </div>
    </footer>
  );
}
