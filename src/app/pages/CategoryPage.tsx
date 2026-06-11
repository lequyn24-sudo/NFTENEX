import { useParams, Navigate } from "react-router";
import { motion } from "motion/react";
import { NewsCategory } from "./categories/NewsCategory";
import { NFTsCategory } from "./categories/NFTsCategory";
import { ReviewsCategory } from "./categories/ReviewsCategory";
import { MarketCategory } from "./categories/MarketCategory";

export function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  
  const formattedCategory = category ? category.charAt(0).toUpperCase() + category.slice(1) : "Category";

  const renderCategoryContent = () => {
    switch (category?.toLowerCase()) {
      case 'news':
        return <NewsCategory />;
      case 'nfts':
        return <NFTsCategory />;
      case 'reviews':
        return <ReviewsCategory />;
      case 'market':
        return <MarketCategory />;
      default:
        return <Navigate to="/category/news" replace />;
    }
  };

  return (
    <div className="flex-1 pb-16">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 mb-8 border-b border-border/50">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4"
        >
          <span className="font-sans text-xs font-bold text-primary tracking-widest uppercase">
            Browsing Category
          </span>
          <h1 className="font-display font-black text-5xl md:text-6xl text-foreground uppercase tracking-tight cyber-glitch-hover inline-block">
            {formattedCategory}<span className="animate-pulse text-primary ml-1">_</span>
          </h1>
          <p className="font-sans text-muted-foreground max-w-2xl mt-4">
            Latest news, updates, and deep dives into the {formattedCategory} ecosystem.
          </p>
        </motion.div>
      </section>

      {renderCategoryContent()}
    </div>
  );
}
