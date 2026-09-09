import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, Truck, CheckCircle, Clock } from 'lucide-react';

export default function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('shopsphere-orders') || '[]');
    const foundOrder = savedOrders.find(o => o.id === id);
    
    if (foundOrder) {
      setOrder(foundOrder);
    } else {
      navigate('/404');
    }
  }, [id, navigate]);

  if (!order) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  const steps = [
    { name: 'Order Placed', icon: Package, date: new Date(order.date).toLocaleDateString(), completed: true },
    { name: 'Processing', icon: Clock, date: 'Pending', completed: order.status !== 'Order Placed' },
    { name: 'Shipped', icon: Truck, date: 'Pending', completed: order.status === 'Shipped' || order.status === 'Delivered' },
    { name: 'Delivered', icon: CheckCircle, date: 'Pending', completed: order.status === 'Delivered' }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <Link to="/orders" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground mb-6 transition-colors w-fit">
        <ArrowLeft size={16} /> Back to Orders
      </Link>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Order Details</h1>
          <p className="text-muted-foreground">Order {order.id} • {new Date(order.date).toLocaleString()}</p>
        </div>
        <button className="bg-background text-foreground border border-border px-4 py-2 rounded-lg text-sm font-medium hover:bg-muted transition-colors">
          Download Invoice
        </button>
      </div>

      {/* Tracking Timeline */}
      <div className="bg-card border border-border rounded-xl p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-foreground mb-6">Tracking Status</h2>
        
        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute top-6 left-6 right-6 h-0.5 bg-border -z-10 hidden sm:block"></div>
          
          <div className="flex flex-col sm:flex-row justify-between gap-6 sm:gap-0">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="flex sm:flex-col items-center sm:items-center gap-4 sm:gap-2 relative">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center border-4 border-card transition-colors ${
                    step.completed ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}>
                    <Icon size={20} />
                  </div>
                  {/* Mobile connecting line */}
                  {idx < steps.length - 1 && (
                    <div className="absolute left-6 top-12 bottom-[-24px] w-0.5 bg-border -z-10 sm:hidden"></div>
                  )}
                  <div className="sm:text-center">
                    <p className={`font-bold text-sm ${step.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {step.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{step.date}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {/* Shipping Address */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <h3 className="font-bold text-foreground mb-4">Shipping Address</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            <span className="font-medium text-foreground">{order.shippingAddress.name}</span><br />
            {order.shippingAddress.address}<br />
            {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}<br />
            {order.shippingAddress.country}
          </p>
        </div>

        {/* Payment Method */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <h3 className="font-bold text-foreground mb-4">Payment Method</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {order.paymentMethod === 'credit_card' ? 'Credit Card' : 
             order.paymentMethod === 'paypal' ? 'PayPal' : 'Cash on Delivery'}
          </p>
        </div>

        {/* Order Summary Sidebar */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <h3 className="font-bold text-foreground mb-4">Order Summary</h3>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Subtotal</span>
              <span className="text-foreground">${order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Shipping</span>
              <span className="text-foreground">{order.shipping === 0 ? 'Free' : `$${order.shipping.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Tax</span>
              <span className="text-foreground">${order.tax.toFixed(2)}</span>
            </div>
          </div>
          <div className="flex justify-between items-end border-t border-border pt-4">
            <span className="font-bold text-foreground">Total</span>
            <span className="font-bold text-primary text-xl">${order.total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Items */}
      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        <div className="p-6 border-b border-border">
          <h3 className="font-bold text-foreground">Items in this order ({order.items.length})</h3>
        </div>
        <div className="divide-y divide-border">
          {order.items.map((item, idx) => (
            <div key={idx} className="p-6 flex flex-col sm:flex-row gap-6">
              <Link to={`/products/${item.id}`} className="w-20 h-24 sm:w-24 sm:h-24 flex-shrink-0 bg-muted rounded-md overflow-hidden">
                <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
              </Link>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:justify-between gap-2 mb-2">
                  <Link to={`/products/${item.id}`}>
                    <h4 className="font-bold text-foreground hover:text-primary transition-colors">{item.name}</h4>
                  </Link>
                  <span className="font-bold text-foreground">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  {item.brand}
                  {item.color && ` • Color: ${item.color}`}
                  {item.size && ` • Size: ${item.size}`}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-sm font-medium text-muted-foreground bg-muted px-2 py-1 rounded">Qty: {item.quantity}</span>
                  <button className="text-sm font-medium text-primary hover:underline">Write a Review</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
