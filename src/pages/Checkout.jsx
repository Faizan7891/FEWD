import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { CheckCircle, ShieldCheck, Truck, CreditCard } from 'lucide-react';

export default function Checkout() {
  const { cart, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { subtotal, shipping, tax, total } = getCartTotal();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ').slice(1).join(' ') || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    paymentMethod: 'credit_card',
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvc: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (cart.length === 0 && step !== 4) {
      navigate('/cart');
    }
    window.scrollTo(0, 0);
  }, [cart, navigate, step]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.zipCode) newErrors.zipCode = 'ZIP code is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (formData.paymentMethod === 'credit_card') {
      if (!formData.cardNumber) newErrors.cardNumber = 'Card number is required';
      if (!formData.cardName) newErrors.cardName = 'Name on card is required';
      if (!formData.cardExpiry) newErrors.cardExpiry = 'Expiry date is required';
      if (!formData.cardCvc) newErrors.cardCvc = 'CVC is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (step === 1 && validateStep1()) setStep(2);
    else if (step === 2 && validateStep2()) setStep(3);
  };

  const handlePlaceOrder = () => {
    // Generate order ID
    const orderId = `SPH-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
    
    // Create order object
    const newOrder = {
      id: orderId,
      date: new Date().toISOString(),
      status: 'Order Placed',
      items: [...cart],
      total,
      subtotal,
      shipping,
      tax,
      shippingAddress: {
        name: `${formData.firstName} ${formData.lastName}`,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        country: formData.country
      },
      paymentMethod: formData.paymentMethod
    };
    
    // Save to localStorage
    const existingOrders = JSON.parse(localStorage.getItem('shopsphere-orders') || '[]');
    localStorage.setItem('shopsphere-orders', JSON.stringify([newOrder, ...existingOrders]));
    
    clearCart();
    setStep(4);
  };

  if (cart.length === 0 && step !== 4) return null;

  return (
    <div className="bg-muted/30 min-h-[calc(100vh-64px)] py-8 md:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {step < 4 && (
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-6">Checkout</h1>
            
            {/* Progress Bar */}
            <div className="flex items-center justify-between relative">
              <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-border -z-10"></div>
              
              <div className="flex flex-col items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 1 ? 'bg-primary text-primary-foreground' : 'bg-background border-2 border-border text-muted-foreground'}`}>1</div>
                <span className={`text-xs font-medium ${step >= 1 ? 'text-primary' : 'text-muted-foreground'}`}>Shipping</span>
              </div>
              
              <div className="flex flex-col items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 2 ? 'bg-primary text-primary-foreground' : 'bg-background border-2 border-border text-muted-foreground'}`}>2</div>
                <span className={`text-xs font-medium ${step >= 2 ? 'text-primary' : 'text-muted-foreground'}`}>Payment</span>
              </div>
              
              <div className="flex flex-col items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 3 ? 'bg-primary text-primary-foreground' : 'bg-background border-2 border-border text-muted-foreground'}`}>3</div>
                <span className={`text-xs font-medium ${step >= 3 ? 'text-primary' : 'text-muted-foreground'}`}>Review</span>
              </div>
            </div>
          </div>
        )}

        {step === 4 ? (
          <div className="bg-card border border-border rounded-2xl p-8 md:p-16 text-center max-w-2xl mx-auto mt-12 shadow-sm">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={40} />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4">Order Confirmed!</h1>
            <p className="text-muted-foreground text-lg mb-8">
              Thank you for your purchase. Your order has been placed and is being processed. 
              You will receive an email confirmation shortly.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button 
                onClick={() => navigate('/orders')}
                className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors"
              >
                View Order Details
              </button>
              <button 
                onClick={() => navigate('/products')}
                className="bg-background text-foreground border border-border px-8 py-3 rounded-full font-medium hover:bg-muted transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Form Area */}
            <div className="w-full lg:w-2/3">
              {step === 1 && (
                <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                  <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                    <Truck size={20} className="text-primary" /> Shipping Information
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">First Name</label>
                      <input 
                        type="text" 
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 bg-background border ${errors.firstName ? 'border-red-500' : 'border-border'} rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary`}
                      />
                      {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Last Name</label>
                      <input 
                        type="text" 
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 bg-background border ${errors.lastName ? 'border-red-500' : 'border-border'} rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary`}
                      />
                      {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Email Address</label>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 bg-background border ${errors.email ? 'border-red-500' : 'border-border'} rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary`}
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Phone Number (Optional)</label>
                      <input 
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-foreground mb-1">Street Address</label>
                    <input 
                      type="text" 
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 bg-background border ${errors.address ? 'border-red-500' : 'border-border'} rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary`}
                    />
                    {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-foreground mb-1">City</label>
                      <input 
                        type="text" 
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 bg-background border ${errors.city ? 'border-red-500' : 'border-border'} rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary`}
                      />
                      {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">State</label>
                      <input 
                        type="text" 
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 bg-background border ${errors.state ? 'border-red-500' : 'border-border'} rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary`}
                      />
                      {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">ZIP Code</label>
                      <input 
                        type="text" 
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 bg-background border ${errors.zipCode ? 'border-red-500' : 'border-border'} rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary`}
                      />
                      {errors.zipCode && <p className="text-red-500 text-xs mt-1">{errors.zipCode}</p>}
                    </div>
                  </div>
                  
                  <div className="flex justify-end pt-4 border-t border-border">
                    <button 
                      onClick={handleNextStep}
                      className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                    >
                      Continue to Payment
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                  <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                    <CreditCard size={20} className="text-primary" /> Payment Method
                  </h2>
                  
                  <div className="space-y-4 mb-8">
                    <label className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-colors ${formData.paymentMethod === 'credit_card' ? 'border-primary bg-primary/5' : 'border-border bg-background'}`}>
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        value="credit_card"
                        checked={formData.paymentMethod === 'credit_card'}
                        onChange={handleChange}
                        className="w-4 h-4 text-primary focus:ring-primary accent-primary"
                      />
                      <div className="flex-1">
                        <span className="font-medium block text-foreground">Credit or Debit Card</span>
                        <span className="text-sm text-muted-foreground">Safe money transfer using your bank account</span>
                      </div>
                      <div className="flex gap-1">
                        <div className="w-8 h-5 bg-blue-600 rounded text-white text-[8px] flex items-center justify-center font-bold">VISA</div>
                        <div className="w-8 h-5 bg-red-500 rounded text-white text-[8px] flex items-center justify-center font-bold">MC</div>
                      </div>
                    </label>
                    
                    {formData.paymentMethod === 'credit_card' && (
                      <div className="pl-8 pr-4 py-4 space-y-4 border-l-2 border-primary ml-2 mb-4">
                        <div className="relative">
                          <label className="block text-sm font-medium text-foreground mb-1">Card Number</label>
                          <input 
                            type="text" 
                            name="cardNumber"
                            placeholder="0000 0000 0000 0000"
                            value={formData.cardNumber}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 bg-background border ${errors.cardNumber ? 'border-red-500' : 'border-border'} rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary`}
                          />
                          {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-1">Name on Card</label>
                          <input 
                            type="text" 
                            name="cardName"
                            placeholder="John Doe"
                            value={formData.cardName}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 bg-background border ${errors.cardName ? 'border-red-500' : 'border-border'} rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary`}
                          />
                          {errors.cardName && <p className="text-red-500 text-xs mt-1">{errors.cardName}</p>}
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-1">Expiry Date</label>
                            <input 
                              type="text" 
                              name="cardExpiry"
                              placeholder="MM/YY"
                              value={formData.cardExpiry}
                              onChange={handleChange}
                              className={`w-full px-4 py-2 bg-background border ${errors.cardExpiry ? 'border-red-500' : 'border-border'} rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary`}
                            />
                            {errors.cardExpiry && <p className="text-red-500 text-xs mt-1">{errors.cardExpiry}</p>}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-1">CVC</label>
                            <input 
                              type="text" 
                              name="cardCvc"
                              placeholder="123"
                              value={formData.cardCvc}
                              onChange={handleChange}
                              className={`w-full px-4 py-2 bg-background border ${errors.cardCvc ? 'border-red-500' : 'border-border'} rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary`}
                            />
                            {errors.cardCvc && <p className="text-red-500 text-xs mt-1">{errors.cardCvc}</p>}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <label className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-colors ${formData.paymentMethod === 'paypal' ? 'border-primary bg-primary/5' : 'border-border bg-background'}`}>
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        value="paypal"
                        checked={formData.paymentMethod === 'paypal'}
                        onChange={handleChange}
                        className="w-4 h-4 text-primary focus:ring-primary accent-primary"
                      />
                      <div className="flex-1">
                        <span className="font-medium block text-foreground">PayPal</span>
                        <span className="text-sm text-muted-foreground">You will be redirected to PayPal website</span>
                      </div>
                      <div className="w-12 h-6 bg-[#003087] rounded text-white text-[10px] italic font-bold flex items-center justify-center">PayPal</div>
                    </label>

                    <label className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-colors ${formData.paymentMethod === 'cod' ? 'border-primary bg-primary/5' : 'border-border bg-background'}`}>
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        value="cod"
                        checked={formData.paymentMethod === 'cod'}
                        onChange={handleChange}
                        className="w-4 h-4 text-primary focus:ring-primary accent-primary"
                      />
                      <div className="flex-1">
                        <span className="font-medium block text-foreground">Cash on Delivery</span>
                        <span className="text-sm text-muted-foreground">Pay with cash when your order is delivered</span>
                      </div>
                    </label>
                  </div>
                  
                  <div className="flex justify-between pt-4 border-t border-border">
                    <button 
                      onClick={() => setStep(1)}
                      className="text-foreground hover:bg-muted px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                      Back
                    </button>
                    <button 
                      onClick={handleNextStep}
                      className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                    >
                      Review Order
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                  <h2 className="text-xl font-bold text-foreground mb-6">Review Your Order</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="bg-muted p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-bold text-foreground">Shipping Address</h3>
                        <button onClick={() => setStep(1)} className="text-sm text-primary hover:underline">Edit</button>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {formData.firstName} {formData.lastName}<br />
                        {formData.address}<br />
                        {formData.city}, {formData.state} {formData.zipCode}<br />
                        {formData.country}<br />
                        {formData.phone}
                      </p>
                    </div>
                    
                    <div className="bg-muted p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-bold text-foreground">Payment Method</h3>
                        <button onClick={() => setStep(2)} className="text-sm text-primary hover:underline">Edit</button>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {formData.paymentMethod === 'credit_card' && `Credit Card ending in ${formData.cardNumber.slice(-4) || '****'}`}
                        {formData.paymentMethod === 'paypal' && 'PayPal Account'}
                        {formData.paymentMethod === 'cod' && 'Cash on Delivery'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <h3 className="font-bold text-foreground mb-4">Items ({cart.length})</h3>
                    <div className="divide-y divide-border border border-border rounded-lg overflow-hidden">
                      {cart.map((item, idx) => (
                        <div key={idx} className="p-3 flex items-center gap-3 bg-background">
                          <img src={item.images[0]} alt={item.name} className="w-12 h-12 object-cover rounded" />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-foreground truncate">{item.name}</h4>
                            <p className="text-xs text-muted-foreground">
                              Qty: {item.quantity} 
                              {item.color && ` • ${item.color}`}
                              {item.size && ` • ${item.size}`}
                            </p>
                          </div>
                          <div className="text-sm font-bold text-foreground">
                            ${(item.price * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pt-4 border-t border-border">
                    <button 
                      onClick={() => setStep(2)}
                      className="text-foreground hover:bg-muted px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                      Back
                    </button>
                    <button 
                      onClick={handlePlaceOrder}
                      className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors flex items-center gap-2"
                    >
                      <ShieldCheck size={20} /> Place Order
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary Sidebar */}
            <div className="w-full lg:w-1/3">
              <div className="bg-card border border-border rounded-xl p-6 shadow-sm sticky top-24">
                <h2 className="text-lg font-bold text-foreground mb-6">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Items ({cart.length})</span>
                    <span className="text-foreground font-medium">${subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Shipping</span>
                    <span className="text-foreground font-medium">
                      {shipping === 0 ? <span className="text-green-500">Free</span> : `$${shipping}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Tax</span>
                    <span className="text-foreground font-medium">${tax}</span>
                  </div>
                </div>
                
                <div className="border-t border-border pt-4 mb-6">
                  <div className="flex justify-between items-end">
                    <span className="text-base font-bold text-foreground">Order Total</span>
                    <span className="text-2xl font-bold text-primary">${total}</span>
                  </div>
                </div>
                
                {step === 3 && (
                  <button 
                    onClick={handlePlaceOrder}
                    className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    <ShieldCheck size={18} /> Place Order
                  </button>
                )}
                
                <p className="text-xs text-muted-foreground text-center mt-4">
                  By placing your order, you agree to ShopSphere's <a href="#" className="underline">Terms of Use</a> and <a href="#" className="underline">Privacy Policy</a>.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
