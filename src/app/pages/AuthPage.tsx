import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Lock, User, ArrowRight, Github, Twitter, Loader2 } from "lucide-react";

export function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      localStorage.setItem('isAuthenticated', 'true');
      window.dispatchEvent(new Event('storage')); // Trigger update across all components
      navigate("/"); // Redirect to home after successful "login"
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-card/50 backdrop-blur-xl border border-primary/20 rounded-2xl p-8 shadow-[0_0_40px_rgba(217,70,239,0.1)] relative z-10 cyber-card overflow-hidden"
      >
        <div className="flex justify-center mb-8">
          <Link to="/" className="flex items-center text-primary group">
            <div className="transition-transform group-hover:scale-105 duration-300">
              <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="5" y="5" width="50" height="70" stroke="currentColor" strokeWidth="10" fill="none" />
                <rect x="35" y="25" width="50" height="70" stroke="currentColor" strokeWidth="10" fill="none" />
                <path d="M25 25 L75 85" stroke="currentColor" strokeWidth="10" />
              </svg>
            </div>
            <span className="font-display font-bold text-2xl lowercase tracking-wide ml-2 group-hover:text-primary transition-colors drop-shadow-[0_0_10px_rgba(217,70,239,0.5)]">nftenex</span>
          </Link>
        </div>

        {/* Toggle Sign In / Sign Up */}
        <div className="flex p-1 bg-muted/50 rounded-lg mb-8">
          <button 
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 text-sm font-bold tracking-wider uppercase rounded-md transition-all ${isLogin ? 'bg-primary text-primary-foreground shadow-md' : 'text-muted-foreground hover:text-foreground'}`}
          >
            Sign In
          </button>
          <button 
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 text-sm font-bold tracking-wider uppercase rounded-md transition-all ${!isLogin ? 'bg-primary text-primary-foreground shadow-md' : 'text-muted-foreground hover:text-foreground'}`}
          >
            Sign Up
          </button>
        </div>

        <div className="overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.form 
              key={isLogin ? 'login' : 'register'}
              initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-4"
              onSubmit={handleSubmit}
            >
              {!isLogin && (
                <div className="relative group">
                  <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <input 
                    type="text" 
                    placeholder="Username" 
                    className="w-full bg-background/50 border border-border rounded-lg py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-sans"
                  />
                </div>
              )}
              
              <div className="relative group">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="w-full bg-background/50 border border-border rounded-lg py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-sans"
                />
              </div>

              <div className="relative group">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input 
                  type="password" 
                  placeholder="Password" 
                  className="w-full bg-background/50 border border-border rounded-lg py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-sans"
                />
              </div>

              {isLogin && (
                <div className="flex justify-end">
                  <a href="#" className="text-xs font-sans text-primary hover:underline">Forgot password?</a>
                </div>
              )}

              <button 
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 py-3 rounded-lg bg-primary text-primary-foreground font-display font-bold tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-primary/90 transition-all cyber-glitch-hover shadow-[0_0_15px_rgba(217,70,239,0.4)] group disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  <>
                    {isLogin ? "Access Account" : "Create Account"}
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              <div className="relative flex items-center justify-center mt-6 mb-2">
                <div className="absolute w-full border-t border-border" />
                <span className="bg-card px-3 text-xs font-sans text-muted-foreground relative z-10">Or continue with</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-2 py-2.5 border border-border rounded-lg hover:bg-muted/50 transition-colors font-sans text-sm font-semibold text-foreground">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Google
                </button>
                <button className="flex items-center justify-center gap-2 py-2.5 border border-border rounded-lg hover:bg-muted/50 transition-colors font-sans text-sm font-semibold text-foreground">
                  <Twitter size={18} className="text-[#1DA1F2]" /> Twitter
                </button>
              </div>
            </motion.form>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
