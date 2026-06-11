import { Navbar } from "./components/Navbar";
import { LeftSidebar } from "./components/LeftSidebar";
import { RightSidebar } from "./components/RightSidebar";
import { TickerBar } from "./components/TickerBar";
import { BrowserRouter, Routes, Route } from "react-router";
import { HomePage } from "./pages/HomePage";
import { CategoryPage } from "./pages/CategoryPage";
import { AuthPage } from "./pages/AuthPage";
import { ArticlePage } from "./pages/ArticlePage";
import { StaticPage } from "./pages/StaticPage";
import { ProfilePage } from "./pages/ProfilePage";
import { useEffect } from "react";
import { Toaster } from "sonner";

export default function App() {
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <BrowserRouter>
      <Toaster theme="dark" position="bottom-right" />
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <div className="fixed pointer-events-none inset-0 overflow-hidden z-0">
        {/* Glow Effects */}
        <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] rounded-full bg-primary/10 blur-[100px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute top-[60%] left-[80%] w-[400px] h-[400px] rounded-full bg-accent/5 blur-[100px] -translate-x-1/2 -translate-y-1/2" />
      </div>
      
      <div className="relative z-10 max-w-[1600px] mx-auto">
        <Navbar />
        
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] xl:grid-cols-[240px_1fr_300px] min-h-screen">
          
          {/* Left Sidebar */}
          <LeftSidebar />

          {/* Middle Scrollable Content */}
          <main className="flex flex-col w-full overflow-x-hidden pt-14 lg:pt-0">
            {/* TickerBar acts as a subheader for the main content */}
            <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border">
              <TickerBar />
            </div>
            
            <div className="flex-1 py-8">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/category/:category" element={<CategoryPage />} />
                <Route path="/article/:slug" element={<ArticlePage />} />
                <Route path="/info/:pageId" element={<StaticPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/auth" element={<AuthPage />} />
              </Routes>
            </div>
          </main>

          {/* Right Sidebar */}
          <RightSidebar />

        </div>
      </div>
      </div>
    </BrowserRouter>
  );
}
