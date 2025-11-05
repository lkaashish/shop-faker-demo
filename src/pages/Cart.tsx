import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartItem } from '@/types/product';
import { cartService } from '@/lib/cart';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Trash2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    setCartItems(cartService.getCart());
  };

  const updateQuantity = (productId: number, quantity: number) => {
    cartService.updateQuantity(productId, quantity);
    loadCart();
    window.dispatchEvent(new Event('cart-updated'));
  };

  const removeItem = (productId: number) => {
    cartService.removeFromCart(productId);
    loadCart();
    window.dispatchEvent(new Event('cart-updated'));
    toast({
      title: "Item removed",
      description: "Item has been removed from your cart.",
    });
  };

  const total = cartService.getCartTotal();

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-muted-foreground mb-8">
          Add some products to get started!
        </p>
        <Link to="/">
          <Button className="bg-primary hover:bg-primary/90">
            Continue Shopping
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <Card key={item.id} className="p-4">
              <div className="flex gap-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-24 h-24 object-contain bg-muted rounded"
                />
                
                <div className="flex-1">
                  <h3 className="font-medium mb-2">
                    <Link to={`/product/${item.id}`} className="hover:text-primary">
                      {item.title}
                    </Link>
                  </h3>
                  
                  <p className="text-muted-foreground text-sm mb-2 capitalize">
                    {item.category}
                  </p>
                  
                  <p className="text-xl font-bold mb-4">
                    ${item.price.toFixed(2)}
                  </p>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center border rounded">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        -
                      </Button>
                      <span className="px-4 py-2 min-w-[3rem] text-center">
                        {item.quantity}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </Button>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(item.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Remove
                    </Button>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-xl font-bold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <div>
          <Card className="p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)
                </span>
                <span className="font-medium">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-medium text-green-600">FREE</span>
              </div>
            </div>

            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <Link to="/checkout">
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" size="lg">
                Proceed to Checkout
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
};
