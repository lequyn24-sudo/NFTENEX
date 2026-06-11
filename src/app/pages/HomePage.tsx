import { HeroSection } from "../components/HeroSection";
import { NFTMarketLive } from "../components/NFTMarketLive";
import { CollectiblesGallery } from "../components/CollectiblesGallery";
import { TrendingPosts } from "../components/TrendingPosts";
import { NewsGrid } from "../components/NewsGrid";
import { CategorySection } from "../components/CategorySection";

export function HomePage() {
  return (
    <div className="flex-1 pb-16">
      <HeroSection />
      <NFTMarketLive />
      <CollectiblesGallery />
      <TrendingPosts />
      <NewsGrid />
      <CategorySection categoryName="NFTs" />
      <CategorySection categoryName="Reviews" />
      <CategorySection categoryName="Market" />
    </div>
  );
}
