import { useState, useEffect } from "react";
import { Moon, Sun, Home, Newspaper, Image, Star, BarChart3, LogOut, User } from "lucide-react";
import { NavLink, Link } from "react-router";

const navItems = [
  { name: "Home", icon: Home, path: "/" },
  { name: "News", icon: Newspaper, path: "/category/news" },
  { name: "NFTs", icon: Image, path: "/category/nfts" },
  { name: "Reviews", icon: Star, path: "/category/reviews" },
  { name: "Market", icon: BarChart3, path: "/category/market" },
];

export function LeftSidebar() {
  const [isDark, setIsDark] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
    
    // Check auth state
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authStatus);
    
    // Listen for storage changes in case of logout from another tab or component
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
    <aside className="hidden lg:flex flex-col w-[240px] h-screen sticky top-0 border-r border-border/50 bg-transparent p-6">
      <Link to="/" className="flex items-center gap-3 mb-10 group">
        <div className="flex items-center text-primary transition-transform group-hover:scale-105 duration-300">
          <svg width="28" height="28" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="5" y="5" width="50" height="70" stroke="currentColor" strokeWidth="10" fill="none" />
            <rect x="35" y="25" width="50" height="70" stroke="currentColor" strokeWidth="10" fill="none" />
            <path d="M25 25 L75 85" stroke="currentColor" strokeWidth="10" />
          </svg>
        </div>
        <span className="font-display font-bold text-2xl text-primary lowercase tracking-wide drop-shadow-[0_0_10px_rgba(217,70,239,0.5)]">
          nftenex
        </span>
      </Link>

      <nav className="flex-1 flex flex-col gap-2">
        <div className="font-sans text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2 px-3">
          Menu
        </div>
        {navItems.map((item, i) => {
          const Icon = item.icon;
          return (
            <NavLink 
              key={i} 
              to={item.path} 
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
      </nav>

      <div className="mt-auto pt-6 border-t border-border/50 flex flex-col gap-4">
        <div className="flex items-center justify-between px-3">
          <span className="font-sans text-xs font-semibold text-muted-foreground">Theme</span>
          <button 
            onClick={toggleTheme}
            className="p-1.5 rounded-md bg-muted text-muted-foreground hover:text-primary border border-border hover:border-primary/50 transition-all duration-200"
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
        {isAuthenticated ? (
          <div className="flex flex-col gap-2">
            <Link to="/profile" className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg border border-border hover:border-primary/50 transition-all cursor-pointer group">
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
                window.dispatchEvent(new Event('storage'));
              }}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg border border-border text-muted-foreground font-sans text-xs font-bold tracking-wider hover:bg-destructive/10 hover:text-destructive hover:border-destructive/50 transition-all uppercase"
            >
              <LogOut size={14} /> Sign Out
            </button>
          </div>
        ) : (
          <Link to="/auth" className="w-full">
            <button className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-display text-sm font-bold tracking-wider hover:bg-primary/90 shadow-[0_0_20px_rgba(217,70,239,0.3)] transition-all uppercase">
              Sign In
            </button>
          </Link>
        )}
      </div>
    </aside>
  );
}
