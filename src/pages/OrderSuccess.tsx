import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';

export const OrderSuccess = () => {
  const orderId = Math.random().toString(36).substring(2, 9).toUpperCase();

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        <CheckCircle2 className="h-24 w-24 text-green-600 mx-auto mb-6" />
        
        <h1 className="text-4xl font-bold mb-4">Order Placed Successfully!</h1>
        
        <p className="text-lg text-muted-foreground mb-2">
          Thank you for your purchase
        </p>
        
        <p className="text-muted-foreground mb-8">
          Order ID: <span className="font-mono font-bold">{orderId}</span>
        </p>

        <div className="bg-muted p-6 rounded-lg mb-8">
          <p className="text-sm text-muted-foreground mb-2">
            A confirmation email has been sent to your email address.
          </p>
          <p className="text-sm text-muted-foreground">
            You can track your order status in the Orders section.
          </p>
        </div>

        <div className="flex gap-4 justify-center">
          <Link to="/">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Continue Shopping
            </Button>
          </Link>
          <Link to="/orders">
            <Button variant="outline">
              View Orders
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
