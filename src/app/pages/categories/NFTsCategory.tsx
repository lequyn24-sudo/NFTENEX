import { CollectiblesGallery } from "../../components/CollectiblesGallery";
import { NewsGrid } from "../../components/NewsGrid";

export function NFTsCategory() {
  return (
    <div className="pt-4 max-w-7xl mx-auto px-4 sm:px-6 mb-12">
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display font-bold text-xl text-foreground tracking-wide uppercase">
            Trending <span className="text-primary">Collections</span><span className="animate-pulse text-primary ml-1">_</span>
          </h2>
        </div>
        <CollectiblesGallery />
      </div>

      <NewsGrid />
      
      <div className="mt-12 flex justify-center">
        <button className="relative px-8 py-3 bg-card border border-primary/50 text-primary font-display font-bold text-sm tracking-widest uppercase hover:bg-primary hover:text-primary-foreground transition-all duration-300 group cyber-card rounded-sm overflow-hidden">
          <span className="relative z-10 flex items-center gap-2">
            Load More <span className="animate-pulse">_</span>
          </span>
          <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
      </div>
    </div>
  );
}
