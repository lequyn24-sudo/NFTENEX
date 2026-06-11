import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Bookmark, Clock, Settings, User, LogOut, ChevronRight, Bell, Shield, Wallet, X, Camera } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

const mockHistory = [
  {
    title: "Top 5 Ethereum Marketplaces Ranked by Volume",
    category: "Market",
    time: "Just now",
  },
  {
    title: "Pudgy Toys: Bridging Web2 Retail and Web3 Ownership",
    category: "NFTs",
    time: "2 hours ago",
  },
  {
    title: "SEC delays decision on spot Ethereum ETF",
    category: "News",
    time: "Yesterday",
  }
];

export function ProfilePage() {
  const [activeTab, setActiveTab] = useState("saved");
  const [savedArticles, setSavedArticles] = useState<any[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  const [profileData, setProfileData] = useState({
    name: "Alex",
    role: "Web3 News Collector",
    bio: "Exploring the bleeding edge of NFTs, GameFi, and decentralized markets.",
    avatarUrl: ""
  });
  
  const [editForm, setEditForm] = useState({...profileData});
  
  const navigate = useNavigate();

  useEffect(() => {
    setSavedArticles(JSON.parse(localStorage.getItem('savedArticles') || '[]'));
    const savedProfile = localStorage.getItem('profileData');
    if (savedProfile) {
      setProfileData(JSON.parse(savedProfile));
      setEditForm(JSON.parse(savedProfile));
    }
    
    const handleStorageChange = () => {
      setSavedArticles(JSON.parse(localStorage.getItem('savedArticles') || '[]'));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('isAuthenticated');
    window.dispatchEvent(new Event('storage'));
    navigate("/");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 pb-32">
      
      {/* Header / Cover */}
      <div className="relative rounded-2xl overflow-hidden bg-muted mb-8 border border-border shadow-lg">
        {/* Cover Image */}
        <div className="h-48 md:h-64 w-full relative">
          <img 
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920&q=80" 
            alt="Profile Cover" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
          <div className="absolute inset-0 scanlines opacity-50 mix-blend-overlay pointer-events-none" />
        </div>

        {/* Profile Info */}
        <div className="relative px-6 md:px-12 pb-8 -mt-16 sm:-mt-20 flex flex-col sm:flex-row items-center sm:items-end gap-6">
          <div className="relative p-2 bg-background rounded-full border border-primary/30 shadow-[0_0_30px_rgba(217,70,239,0.3)]">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-primary/20 flex items-center justify-center text-primary overflow-hidden">
              <User size={60} className="opacity-80" />
            </div>
            <div className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 border-4 border-background rounded-full" title="Online"></div>
          </div>
          
          <div className="text-center sm:text-left flex-1">
            <h1 className="font-display font-black text-3xl sm:text-4xl text-foreground drop-shadow-lg">
              {profileData.name}<span className="text-primary animate-pulse">_</span>
            </h1>
            <p className="font-sans font-bold text-muted-foreground uppercase tracking-widest text-sm mt-1">
              {profileData.role}
            </p>
            <div className="flex items-center justify-center sm:justify-start gap-4 mt-4">
              <div className="text-center">
                <span className="block font-display font-bold text-xl text-foreground">142</span>
                <span className="font-sans text-[10px] text-muted-foreground uppercase tracking-widest">Articles Read</span>
              </div>
              <div className="w-px h-8 bg-border" />
              <div className="text-center">
                <span className="block font-display font-bold text-xl text-primary drop-shadow-[0_0_8px_rgba(217,70,239,0.5)]">{savedArticles.length}</span>
                <span className="font-sans text-[10px] text-muted-foreground uppercase tracking-widest">Saved</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3 w-full sm:w-auto mt-4 sm:mt-0">
            <button 
              onClick={() => setIsEditModalOpen(true)}
              className="flex-1 sm:flex-none px-6 py-2.5 rounded-lg bg-primary/10 text-primary border border-primary/50 font-sans text-sm font-bold tracking-wider hover:bg-primary/20 transition-colors uppercase cyber-glitch-hover"
            >
              Edit Profile
            </button>
            <button 
              onClick={handleSignOut}
              className="flex-1 sm:flex-none px-6 py-2.5 rounded-lg bg-destructive/10 text-destructive border border-destructive/50 font-sans text-sm font-bold tracking-wider hover:bg-destructive/20 transition-colors uppercase"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar Tabs */}
        <div className="lg:col-span-1 flex flex-col gap-2">
          <button 
            onClick={() => setActiveTab('saved')}
            className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${activeTab === 'saved' ? 'bg-primary/10 border-primary/50 text-primary shadow-[0_0_15px_rgba(217,70,239,0.1)]' : 'bg-card border-border text-foreground hover:border-primary/30'}`}
          >
            <Bookmark size={20} />
            <span className="font-sans font-bold text-sm flex-1 text-left">Saved Articles</span>
            <ChevronRight size={16} className={activeTab === 'saved' ? 'opacity-100' : 'opacity-0'} />
          </button>
          <button 
            onClick={() => setActiveTab('history')}
            className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${activeTab === 'history' ? 'bg-primary/10 border-primary/50 text-primary shadow-[0_0_15px_rgba(217,70,239,0.1)]' : 'bg-card border-border text-foreground hover:border-primary/30'}`}
          >
            <Clock size={20} />
            <span className="font-sans font-bold text-sm flex-1 text-left">Reading History</span>
            <ChevronRight size={16} className={activeTab === 'history' ? 'opacity-100' : 'opacity-0'} />
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${activeTab === 'settings' ? 'bg-primary/10 border-primary/50 text-primary shadow-[0_0_15px_rgba(217,70,239,0.1)]' : 'bg-card border-border text-foreground hover:border-primary/30'}`}
          >
            <Settings size={20} />
            <span className="font-sans font-bold text-sm flex-1 text-left">Preferences</span>
            <ChevronRight size={16} className={activeTab === 'settings' ? 'opacity-100' : 'opacity-0'} />
          </button>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-3 min-h-[400px]">
          <AnimatePresence mode="wait">
            
            {activeTab === 'saved' && (
              <motion.div
                key="saved"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center justify-between mb-6 border-b border-border/50 pb-4">
                  <div className="flex items-center gap-2">
                    <Bookmark size={24} className="text-primary" />
                    <h2 className="font-display font-bold text-2xl text-foreground">Saved Articles</h2>
                  </div>
                  <span className="font-sans font-bold text-muted-foreground bg-muted px-3 py-1 rounded-full text-xs">
                    {savedArticles.length} items
                  </span>
                </div>
                
                {savedArticles.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 text-muted-foreground border border-dashed border-border rounded-xl">
                    <Bookmark size={48} className="mb-4 opacity-20" />
                    <p className="font-sans font-semibold text-lg">No saved articles yet</p>
                    <p className="font-sans text-sm mt-1">Articles you bookmark will appear here.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {savedArticles.map((article, i) => (
                      <Link 
                        key={i} 
                        to={`/article/${article.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                        className="group flex flex-col bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-colors shadow-sm cyber-card"
                      >
                        <div className="h-40 overflow-hidden relative">
                          <img src={article.image} alt={article.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                          <div className="absolute top-3 left-3 bg-background/80 backdrop-blur border border-border px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest text-foreground">
                            {article.category}
                          </div>
                        </div>
                        <div className="p-4 flex flex-col flex-1">
                          <h3 className="font-display font-bold text-base leading-tight text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-4">
                            {article.title}
                          </h3>
                          <div className="mt-auto flex items-center justify-between text-muted-foreground">
                            <span className="font-sans text-xs flex items-center gap-1"><Clock size={12} /> {article.time}</span>
                            <Bookmark size={14} className="text-primary" fill="currentColor" />
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'history' && (
              <motion.div
                key="history"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-2 mb-6 border-b border-border/50 pb-4">
                  <Clock size={24} className="text-primary" />
                  <h2 className="font-display font-bold text-2xl text-foreground">Reading History</h2>
                </div>

                <div className="flex flex-col gap-3">
                  {mockHistory.map((item, i) => (
                    <Link 
                      key={i} 
                      to={`/article/${item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                      className="flex items-center justify-between p-4 rounded-xl bg-card border border-border hover:border-primary/50 hover:bg-muted/30 transition-all group"
                    >
                      <div className="flex flex-col gap-1 pr-4">
                        <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-primary">{item.category}</span>
                        <span className="font-sans font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">{item.title}</span>
                      </div>
                      <span className="font-sans text-xs text-muted-foreground whitespace-nowrap">{item.time}</span>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-6"
              >
                <div className="flex items-center gap-2 border-b border-border/50 pb-4">
                  <Settings size={24} className="text-primary" />
                  <h2 className="font-display font-bold text-2xl text-foreground">Preferences</h2>
                </div>

                {/* Notifications */}
                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Bell className="text-primary" />
                    <h3 className="font-sans font-bold text-lg">Notifications</h3>
                  </div>
                  <div className="flex flex-col gap-4">
                    <label className="flex items-center justify-between cursor-pointer">
                      <div className="flex flex-col">
                        <span className="font-sans font-semibold text-sm">Daily Newsletter</span>
                        <span className="font-sans text-xs text-muted-foreground">Top NFT news delivered to your inbox</span>
                      </div>
                      <input type="checkbox" className="toggle-checkbox" defaultChecked />
                    </label>
                    <div className="w-full h-px bg-border/50" />
                    <label className="flex items-center justify-between cursor-pointer">
                      <div className="flex flex-col">
                        <span className="font-sans font-semibold text-sm">Breaking Alerts</span>
                        <span className="font-sans text-xs text-muted-foreground">Major market moves and hacks</span>
                      </div>
                      <input type="checkbox" className="toggle-checkbox" defaultChecked />
                    </label>
                  </div>
                </div>

                {/* Security */}
                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Shield className="text-primary" />
                    <h3 className="font-sans font-bold text-lg">Account Security</h3>
                  </div>
                  <button className="px-4 py-2 bg-muted text-foreground border border-border rounded-lg text-sm font-semibold hover:border-primary/50 transition-colors">
                    Change Password
                  </button>
                </div>

                {/* Web3 */}
                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Wallet className="text-primary" />
                    <h3 className="font-sans font-bold text-lg">Web3 Connections</h3>
                  </div>
                  <button className="px-4 py-2 bg-primary text-primary-foreground font-display font-bold tracking-wider uppercase rounded-lg text-sm shadow-[0_0_15px_rgba(217,70,239,0.3)] hover:bg-primary/90 transition-colors">
                    Connect Wallet
                  </button>
                  <p className="font-sans text-xs text-muted-foreground mt-3">
                    Connect your wallet to enable tipping, exclusive NFT gated content, and on-chain verified comments.
                  </p>
                </div>

              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <AnimatePresence>
        {isEditModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              onClick={() => setIsEditModalOpen(false)}
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-card border border-primary/20 rounded-2xl shadow-[0_0_40px_rgba(217,70,239,0.15)] overflow-hidden cyber-card"
            >
              <div className="flex items-center justify-between p-6 border-b border-border/50">
                <h2 className="font-display font-bold text-xl text-foreground tracking-wide uppercase">Edit <span className="text-primary">Profile</span></h2>
                <button 
                  onClick={() => setIsEditModalOpen(false)}
                  className="p-2 rounded-full text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-6 flex flex-col gap-6">
                <div className="flex items-center gap-6">
                  <div className="relative w-24 h-24 rounded-full bg-muted border border-border flex items-center justify-center overflow-hidden group cursor-pointer">
                    {editForm.avatarUrl ? (
                      <img src={editForm.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <User size={40} className="text-muted-foreground" />
                    )}
                    <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Camera size={20} className="text-white mb-1" />
                      <span className="text-[9px] text-white font-bold uppercase tracking-widest">Change</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <label className="font-sans text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2 block">Avatar URL</label>
                    <input 
                      type="text" 
                      value={editForm.avatarUrl}
                      onChange={(e) => setEditForm({...editForm, avatarUrl: e.target.value})}
                      className="w-full bg-background border border-border rounded-lg px-4 py-2.5 font-sans text-sm text-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-muted-foreground/50"
                      placeholder="https://example.com/avatar.png"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-sans text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2 block">Display Name</label>
                  <input 
                    type="text" 
                    value={editForm.name}
                    onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                    className="w-full bg-background border border-border rounded-lg px-4 py-2.5 font-sans text-sm text-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                  />
                </div>

                <div>
                  <label className="font-sans text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2 block">Role / Title</label>
                  <input 
                    type="text" 
                    value={editForm.role}
                    onChange={(e) => setEditForm({...editForm, role: e.target.value})}
                    className="w-full bg-background border border-border rounded-lg px-4 py-2.5 font-sans text-sm text-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                  />
                </div>

                <div>
                  <label className="font-sans text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2 block">Bio</label>
                  <textarea 
                    rows={3}
                    value={editForm.bio}
                    onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
                    className="w-full bg-background border border-border rounded-lg px-4 py-2.5 font-sans text-sm text-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all resize-none"
                    placeholder="Tell us about yourself..."
                  />
                </div>
              </div>

              <div className="p-6 border-t border-border/50 flex justify-end gap-3 bg-muted/20">
                <button 
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-6 py-2.5 rounded-lg border border-border text-foreground font-sans text-sm font-bold tracking-wider hover:bg-muted transition-colors uppercase"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    setProfileData(editForm);
                    localStorage.setItem('profileData', JSON.stringify(editForm));
                    setIsEditModalOpen(false);
                    toast.success("Profile updated successfully");
                  }}
                  className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-display text-sm font-bold tracking-wider shadow-[0_0_15px_rgba(217,70,239,0.3)] hover:bg-primary/90 transition-colors uppercase"
                >
                  Save Changes
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
