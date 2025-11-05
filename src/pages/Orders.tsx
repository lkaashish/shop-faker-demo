import { Card } from '@/components/ui/card';

export const Orders = () => {
  const mockOrders = [
    {
      id: 'ORD001',
      date: '2024-01-15',
      total: 299.99,
      status: 'Delivered',
      items: 3,
    },
    {
      id: 'ORD002',
      date: '2024-01-10',
      total: 149.50,
      status: 'In Transit',
      items: 2,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Orders</h1>

      <div className="space-y-4">
        {mockOrders.map((order) => (
          <Card key={order.id} className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-lg">Order {order.id}</h3>
                <p className="text-sm text-muted-foreground">Placed on {order.date}</p>
              </div>
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                {order.status}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">{order.items} items</p>
              </div>
              <p className="text-xl font-bold">${order.total.toFixed(2)}</p>
            </div>
          </Card>
        ))}

        <p className="text-center text-muted-foreground mt-8">
          Demo Mode: Showing sample order history
        </p>
      </div>
    </div>
  );
};
