import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Package, ChevronRight, ShoppingBag } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import EmptyState from '../components/EmptyState';

export default function Orders() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // We don't strictly require authentication for demo, but typically we would
    // if (!isAuthenticated) {
    //   navigate('/login');
    // }
    
    const savedOrders = JSON.parse(localStorage.getItem('shopsphere-orders') || '[]');
    setOrders(savedOrders);
  }, [isAuthenticated, navigate]);

  if (orders.length === 0) {
    return (
      <EmptyState 
        icon={Package}
        title="No orders yet"
        description="You haven't placed any orders yet. Start exploring our products to place your first order."
        actionText="Start Shopping"
        actionLink="/products"
      />
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'text-green-500 bg-green-50 dark:bg-green-500/10';
      case 'Processing': return 'text-blue-500 bg-blue-50 dark:bg-blue-500/10';
      case 'Shipped': return 'text-purple-500 bg-purple-50 dark:bg-purple-500/10';
      default: return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-600/10';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">My Orders</h1>
        <p className="text-muted-foreground">View and track your recent orders</p>
      </div>

      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
            <div className="bg-muted p-4 sm:p-6 border-b border-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex flex-wrap gap-x-8 gap-y-4">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Order Placed</p>
                  <p className="font-medium text-foreground">{new Date(order.date).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Total</p>
                  <p className="font-medium text-foreground">${order.total.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Order ID</p>
                  <p className="font-medium text-foreground">{order.id}</p>
                </div>
              </div>
              
              <Link 
                to={`/orders/${order.id}`}
                className="bg-background text-foreground border border-border px-4 py-2 rounded-lg text-sm font-medium hover:bg-muted transition-colors flex items-center gap-2"
              >
                View Details <ChevronRight size={16} />
              </Link>
            </div>
            
            <div className="p-4 sm:p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
                <span className="text-sm text-muted-foreground">
                  Estimated Delivery: {new Date(new Date(order.date).getTime() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                </span>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 space-y-4">
                  {order.items.slice(0, 2).map((item, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="w-16 h-16 bg-muted rounded border border-border overflow-hidden flex-shrink-0">
                        <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-foreground line-clamp-1">{item.name}</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          Qty: {item.quantity} | ${item.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  {order.items.length > 2 && (
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <ShoppingBag size={14} /> and {order.items.length - 2} more item(s)
                    </p>
                  )}
                </div>
                
                <div className="sm:w-1/3 pt-4 sm:pt-0 border-t sm:border-t-0 sm:border-l border-border sm:pl-6 flex flex-col justify-center gap-3">
                  <button className="w-full bg-primary text-primary-foreground py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                    Track Package
                  </button>
                  <button className="w-full bg-background text-foreground border border-border py-2 rounded-lg text-sm font-medium hover:bg-muted transition-colors">
                    Buy Again
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
