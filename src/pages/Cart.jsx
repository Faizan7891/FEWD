import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import EmptyState from '../components/EmptyState';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart, getCartTotal, getCartItemCount } = useCart();
  const { subtotal, shipping, tax, total } = getCartTotal();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <EmptyState 
        icon={ShoppingBag}
        title="Your cart is empty"
        description="Looks like you haven't added anything to your cart yet. Browse our products to find something you'll love."
        actionText="Continue Shopping"
        actionLink="/products"
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <h1 className="text-3xl font-bold text-foreground mb-8">Shopping Cart ({getCartItemCount()})</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="w-full lg:w-2/3">
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="hidden sm:grid grid-cols-12 gap-4 p-4 bg-muted text-sm font-medium text-muted-foreground border-b border-border">
              <div className="col-span-6">Product</div>
              <div className="col-span-3 text-center">Quantity</div>
              <div className="col-span-2 text-right">Price</div>
              <div className="col-span-1"></div>
            </div>

            <div className="divide-y divide-border">
              {cart.map((item, index) => (
                <div key={`${item.id}-${item.color}-${item.size}-${index}`} className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                  {/* Product Info */}
                  <div className="col-span-1 sm:col-span-6 flex gap-4">
                    <Link to={`/products/${item.id}`} className="w-20 h-24 sm:w-24 sm:h-24 flex-shrink-0 bg-muted rounded-md overflow-hidden">
                      <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                    </Link>
                    <div className="flex flex-col justify-center">
                      <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">{item.brand}</div>
                      <Link to={`/products/${item.id}`} className="font-medium text-foreground hover:text-primary transition-colors line-clamp-2 sm:line-clamp-1 mb-1">
                        {item.name}
                      </Link>
                      <div className="text-sm text-muted-foreground flex flex-wrap gap-2">
                        {item.color && <span>Color: {item.color}</span>}
                        {item.color && item.size && <span>|</span>}
                        {item.size && <span>Size: {item.size}</span>}
                      </div>
                      
                      {/* Mobile Price & Quantity (hidden on sm+) */}
                      <div className="sm:hidden flex items-center justify-between mt-3">
                        <span className="font-bold text-foreground">${item.price.toFixed(2)}</span>
                        <div className="flex items-center border border-border rounded bg-background">
                          <button 
                            onClick={() => updateQuantity(item.id, item.color, item.size, item.quantity - 1)}
                            className="p-1.5 text-foreground hover:bg-muted transition-colors rounded-l"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.color, item.size, item.quantity + 1)}
                            disabled={item.quantity >= item.stock}
                            className="p-1.5 text-foreground hover:bg-muted transition-colors rounded-r disabled:opacity-50"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Desktop Quantity */}
                  <div className="hidden sm:flex col-span-3 justify-center">
                    <div className="flex items-center border border-border rounded-md bg-background">
                      <button 
                        onClick={() => updateQuantity(item.id, item.color, item.size, item.quantity - 1)}
                        className="p-2 text-foreground hover:bg-muted transition-colors rounded-l-md"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-10 text-center font-medium">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.color, item.size, item.quantity + 1)}
                        disabled={item.quantity >= item.stock}
                        className="p-2 text-foreground hover:bg-muted transition-colors rounded-r-md disabled:opacity-50"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Desktop Price */}
                  <div className="hidden sm:block col-span-2 text-right">
                    <div className="font-bold text-foreground">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                    {item.quantity > 1 && (
                      <div className="text-xs text-muted-foreground mt-1">
                        ${item.price.toFixed(2)} each
                      </div>
                    )}
                  </div>

                  {/* Remove Action */}
                  <div className="absolute right-4 sm:relative sm:right-auto sm:col-span-1 flex justify-end">
                    <button 
                      onClick={() => removeFromCart(item.id, item.color, item.size)}
                      className="p-2 text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-full transition-colors"
                      title="Remove item"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 sm:p-6 bg-muted/50 border-t border-border flex justify-between items-center">
              <Link to="/products" className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
                <ArrowRight size={16} className="rotate-180" /> Continue Shopping
              </Link>
              <button 
                onClick={clearCart}
                className="text-sm font-medium text-muted-foreground hover:text-red-500 transition-colors"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-1/3">
          <div className="bg-card border border-border rounded-xl p-6 sticky top-24">
            <h2 className="text-xl font-bold text-foreground mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span className="text-foreground font-medium">${subtotal}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span className="text-foreground font-medium">
                  {shipping === 0 ? <span className="text-green-500">Free</span> : `$${shipping}`}
                </span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Estimated Tax</span>
                <span className="text-foreground font-medium">${tax}</span>
              </div>
              {shipping > 0 && (
                <div className="text-xs text-muted-foreground bg-muted p-2 rounded text-center">
                  Add ${(500 - subtotal).toFixed(2)} more for free shipping!
                </div>
              )}
            </div>
            
            <div className="border-t border-border pt-4 mb-6">
              <div className="flex justify-between items-end">
                <span className="text-lg font-bold text-foreground">Total</span>
                <span className="text-2xl font-bold text-foreground">${total}</span>
              </div>
            </div>
            
            <button 
              onClick={() => navigate('/checkout')}
              className="w-full bg-primary text-primary-foreground py-3 sm:py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              Proceed to Checkout <ArrowRight size={20} />
            </button>
            
            <div className="mt-6">
              <div className="flex items-center justify-center gap-4 text-muted-foreground">
                {/* Mock payment icons */}
                <div className="h-8 w-12 bg-muted rounded border border-border flex items-center justify-center text-[10px] font-bold">VISA</div>
                <div className="h-8 w-12 bg-muted rounded border border-border flex items-center justify-center text-[10px] font-bold">MC</div>
                <div className="h-8 w-12 bg-muted rounded border border-border flex items-center justify-center text-[10px] font-bold">AMEX</div>
                <div className="h-8 w-12 bg-muted rounded border border-border flex items-center justify-center text-[10px] font-bold">PAYPAL</div>
              </div>
              <p className="text-center text-xs text-muted-foreground mt-4 flex items-center justify-center gap-1">
                Secure SSL Encrypted Checkout
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
