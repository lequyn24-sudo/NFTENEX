import { ReviewGrid } from "../../components/ReviewGrid";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export function ReviewsCategory() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadMore = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
  };

  return (
    <div className="pt-4 max-w-7xl mx-auto px-4 sm:px-6 mb-12">
      <ReviewGrid />
      
      <div className="mt-12 flex justify-center">
        <button 
          onClick={handleLoadMore}
          disabled={isLoading}
          className="relative px-8 py-3 bg-card border border-primary/50 text-primary font-display font-bold text-sm tracking-widest uppercase hover:bg-primary hover:text-primary-foreground transition-all duration-300 group cyber-card rounded-sm overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <span className="relative z-10 flex items-center gap-2">
            {isLoading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Loading...
              </>
            ) : (
              <>
                Load More <span className="animate-pulse">_</span>
              </>
            )}
          </span>
          {!isLoading && <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />}
        </button>
      </div>
    </div>
  );
}
