import { Link } from 'react-router-dom';
import { Product } from '@/types/product';
import { Card } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cartService } from '@/lib/cart';
import { toast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    cartService.addToCart(product);
    window.dispatchEvent(new Event('cart-updated'));
    toast({
      title: "Added to cart",
      description: `${product.title} has been added to your cart.`,
    });
  };

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link to={`/product/${product.id}`} className="block">
        <div className="aspect-square bg-muted flex items-center justify-center p-4">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
        <div className="p-4 space-y-2">
          <h3 className="font-medium line-clamp-2 text-sm group-hover:text-primary transition-colors">
            {product.title}
          </h3>
          
          <div className="flex items-center gap-1">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < Math.floor(product.rating.rate)
                      ? 'fill-rating-star text-rating-star'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">({product.rating.count})</span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-foreground">${product.price.toFixed(2)}</span>
          </div>

          <Button 
            onClick={handleAddToCart}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Add to Cart
          </Button>
        </div>
      </Link>
    </Card>
  );
};
