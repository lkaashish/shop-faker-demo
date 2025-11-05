import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Product } from '@/types/product';
import { ProductCard } from '@/components/ProductCard';
import { CategoryCard } from '@/components/CategoryCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: api.getProducts,
  });

  const categoryImages = {
    electronics: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400',
    jewelery: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400',
    "men's clothing": 'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=400',
    "women's clothing": 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400',
  };

  const promoSlides = [
    {
      title: 'Treat yourself',
      subtitle: 'Shop 11.11 deals',
      bg: 'bg-promo-red',
    },
    {
      title: 'Electronics Sale',
      subtitle: 'Up to 50% off',
      bg: 'bg-gradient-to-r from-blue-600 to-blue-800',
    },
    {
      title: 'Fashion Week',
      subtitle: 'New arrivals daily',
      bg: 'bg-gradient-to-r from-purple-600 to-pink-600',
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % promoSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + promoSlides.length) % promoSlides.length);
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertDescription>
            Failed to load products. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Banner */}
      <div className="relative h-[400px] bg-gradient-to-b from-gray-100 to-background overflow-hidden">
        <div className={`absolute inset-0 transition-opacity duration-500 ${promoSlides[currentSlide].bg} flex items-center justify-center text-white`}>
          <div className="text-center">
            <h2 className="text-5xl font-bold mb-4">{promoSlides[currentSlide].title}</h2>
            <p className="text-2xl">{promoSlides[currentSlide].subtitle}</p>
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-8 w-8" />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white"
          onClick={nextSlide}
        >
          <ChevronRight className="h-8 w-8" />
        </Button>
      </div>

      {/* Category Cards */}
      <div className="container mx-auto px-4 -mt-32 relative z-10 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <CategoryCard
            title="Electronics"
            image={categoryImages.electronics}
            link="/category/electronics"
            subtitle="Latest gadgets & tech"
          />
          <CategoryCard
            title="Jewelry"
            image={categoryImages.jewelery}
            link="/category/jewelery"
            subtitle="Elegant accessories"
          />
          <CategoryCard
            title="Men's Fashion"
            image={categoryImages["men's clothing"]}
            link="/category/men's clothing"
            subtitle="Trending styles"
          />
          <CategoryCard
            title="Women's Fashion"
            image={categoryImages["women's clothing"]}
            link="/category/women's clothing"
            subtitle="New arrivals"
          />
        </div>
      </div>

      {/* Featured Products */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
        
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-square" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {products?.slice(0, 10).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      {/* Today's Deals */}
      {!isLoading && products && (
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-6">Today's Deals</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {products.slice(10, 15).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
