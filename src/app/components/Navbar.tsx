import { useState, useEffect } from "react";
import { Menu, X, Search, Bell, Moon, Sun, User, LogOut, Home, Newspaper, Image, Star, BarChart3 } from "lucide-react";
import { Link, NavLink } from "react-router";

const navItems = [
  { name: "Home", icon: Home, path: "/" },
  { name: "News", icon: Newspaper, path: "/category/news" },
  { name: "NFTs", icon: Image, path: "/category/nfts" },
  { name: "Reviews", icon: Star, path: "/category/reviews" },
  { name: "Market", icon: BarChart3, path: "/category/market" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
    setIsAuthenticated(localStorage.getItem('isAuthenticated') === 'true');
    
    const handleStorageChange = () => {
      setIsAuthenticated(localStorage.getItem('isAuthenticated') === 'true');
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    if (root.classList.contains('dark')) {
      root.classList.remove('dark');
      setIsDark(false);
    } else {
      root.classList.add('dark');
      setIsDark(true);
    }
  };

  return (
    <nav className="lg:hidden fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md transition-colors duration-300">
      <div className="px-4 py-3 flex items-center justify-between">
        
        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden text-foreground hover:text-primary transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="flex items-center text-primary transition-transform group-hover:scale-105 duration-300">
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

        {/* Utilities */}
        <div className="flex items-center gap-3">
          <button className="text-muted-foreground hover:text-primary transition-colors">
            <Search size={20} />
          </button>
          <button 
            onClick={toggleTheme}
            className="p-1 rounded text-muted-foreground hover:text-primary transition-colors duration-200"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 border-b border-border bg-card/95 backdrop-blur-xl p-4 flex flex-col gap-2 shadow-xl">
          <div className="font-sans text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2 px-3">
            Menu
          </div>
          {navItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <NavLink 
                key={i} 
                to={item.path} 
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                  isActive 
                    ? "bg-primary/10 text-primary border border-primary/20 shadow-[0_0_15px_rgba(217,70,239,0.1)]" 
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground border border-transparent"
                }`}
              >
                {({ isActive }) => (
                  <>
                    <Icon size={18} className={isActive ? "text-primary" : "group-hover:text-primary transition-colors"} />
                    <span className="font-sans font-semibold text-sm">{item.name}</span>
                  </>
                )}
              </NavLink>
            );
          })}
          {isAuthenticated ? (
            <div className="mt-4 border-t border-border/50 pt-4 flex flex-col gap-3">
              <Link to="/profile" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 p-2 hover:bg-muted/30 rounded-lg transition-colors group">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/50 text-primary group-hover:scale-105 transition-transform">
                  <User size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="font-sans font-bold text-sm text-foreground group-hover:text-primary transition-colors">Alex</span>
                  <span className="font-sans text-[10px] text-muted-foreground uppercase tracking-widest">Collector</span>
                </div>
              </Link>
              <button 
                onClick={() => {
                  localStorage.removeItem('isAuthenticated');
                  setIsAuthenticated(false);
                  setMenuOpen(false);
                  window.dispatchEvent(new Event('storage'));
                }}
                className="flex items-center justify-center gap-2 w-full py-3 rounded border border-border text-muted-foreground font-sans text-xs font-bold tracking-wider hover:bg-destructive/10 hover:text-destructive hover:border-destructive/50 transition-all uppercase mt-2"
              >
                <LogOut size={16} /> Sign Out
              </button>
            </div>
          ) : (
            <Link to="/auth" className="w-full mt-4">
              <button 
                onClick={() => setMenuOpen(false)}
                className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-display font-bold text-sm tracking-wider shadow-[0_0_15px_rgba(217,70,239,0.3)] uppercase"
              >
                Sign In
              </button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
