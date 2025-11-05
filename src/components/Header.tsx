import { Link } from 'react-router-dom';
import { Search, ShoppingCart, MapPin, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { cartService } from '@/lib/cart';

export const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      setCartCount(cartService.getCartItemsCount());
    };

    updateCartCount();
    window.addEventListener('cart-updated', updateCartCount);

    return () => {
      window.removeEventListener('cart-updated', updateCartCount);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="bg-header-dark sticky top-0 z-50">
      <div className="bg-header-darker">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-primary-foreground">ShopHub</h1>
          </Link>

          {/* Delivery Location */}
          <button className="hidden md:flex items-center gap-1 text-primary-foreground hover:outline hover:outline-1 hover:outline-white px-2 py-1 rounded">
            <MapPin className="h-5 w-5" />
            <div className="text-left">
              <div className="text-xs text-muted-foreground">Deliver to</div>
              <div className="text-sm font-bold">Nepal</div>
            </div>
          </button>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
            <div className="flex">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="rounded-r-none border-none focus-visible:ring-0"
              />
              <Button 
                type="submit"
                className="rounded-l-none bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </form>

          {/* Account */}
          <Link 
            to="/auth"
            className="hidden md:flex items-center gap-1 text-primary-foreground hover:outline hover:outline-1 hover:outline-white px-2 py-1 rounded"
          >
            <User className="h-5 w-5" />
            <div className="text-left">
              <div className="text-xs">Hello, Sign in</div>
              <div className="text-sm font-bold">Account & Lists</div>
            </div>
          </Link>

          {/* Orders */}
          <Link 
            to="/orders"
            className="hidden lg:flex flex-col text-primary-foreground hover:outline hover:outline-1 hover:outline-white px-2 py-1 rounded"
          >
            <div className="text-xs">Returns</div>
            <div className="text-sm font-bold">& Orders</div>
          </Link>

          {/* Cart */}
          <Link 
            to="/cart"
            className="flex items-center gap-1 text-primary-foreground hover:outline hover:outline-1 hover:outline-white px-2 py-1 rounded"
          >
            <div className="relative">
              <ShoppingCart className="h-8 w-8" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="font-bold hidden sm:inline">Cart</span>
          </Link>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="bg-header-dark border-t border-header-darker">
        <div className="container mx-auto px-4 py-2">
          <nav className="flex items-center gap-4 text-sm text-primary-foreground overflow-x-auto">
            <Link to="/" className="hover:outline hover:outline-1 hover:outline-white px-2 py-1 rounded whitespace-nowrap">
              All
            </Link>
            <Link to="/category/electronics" className="hover:outline hover:outline-1 hover:outline-white px-2 py-1 rounded whitespace-nowrap">
              Electronics
            </Link>
            <Link to="/category/jewelery" className="hover:outline hover:outline-1 hover:outline-white px-2 py-1 rounded whitespace-nowrap">
              Jewelry
            </Link>
            <Link to="/category/men's clothing" className="hover:outline hover:outline-1 hover:outline-white px-2 py-1 rounded whitespace-nowrap">
              Men's Fashion
            </Link>
            <Link to="/category/women's clothing" className="hover:outline hover:outline-1 hover:outline-white px-2 py-1 rounded whitespace-nowrap">
              Women's Fashion
            </Link>
            <Link to="/deals" className="hover:outline hover:outline-1 hover:outline-white px-2 py-1 rounded whitespace-nowrap font-bold">
              Today's Deals
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};
