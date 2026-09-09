import { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useLocalStorage('shopsphere-cart', []);

  const addToCart = (product, quantity = 1, color = null, size = null) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => item.id === product.id && item.color === color && item.size === size
      );

      if (existingItemIndex >= 0) {
        const newCart = [...prevCart];
        const newQuantity = newCart[existingItemIndex].quantity + quantity;
        
        // Prevent exceeding stock
        if (newQuantity <= product.stock) {
          newCart[existingItemIndex].quantity = newQuantity;
        } else {
          newCart[existingItemIndex].quantity = product.stock;
        }
        return newCart;
      } else {
        return [...prevCart, { ...product, quantity: Math.min(quantity, product.stock), color, size }];
      }
    });
  };

  const removeFromCart = (id, color = null, size = null) => {
    setCart((prevCart) => prevCart.filter(
      (item) => !(item.id === id && item.color === color && item.size === size)
    ));
  };

  const updateQuantity = (id, color, size, quantity) => {
    setCart((prevCart) => prevCart.map((item) => {
      if (item.id === id && item.color === color && item.size === size) {
        return { ...item, quantity: Math.min(Math.max(1, quantity), item.stock) };
      }
      return item;
    }));
  };

  const increaseQuantity = (id, color, size) => {
    setCart((prevCart) => prevCart.map((item) => {
      if (item.id === id && item.color === color && item.size === size && item.quantity < item.stock) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    }));
  };

  const decreaseQuantity = (id, color, size) => {
    setCart((prevCart) => prevCart.map((item) => {
      if (item.id === id && item.color === color && item.size === size && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    }));
  };

  const clearCart = () => setCart([]);

  const getCartTotal = () => {
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = subtotal > 0 && subtotal < 500 ? 50 : 0;
    const tax = subtotal * 0.05; // 5% tax for example
    const total = subtotal + shipping + tax;
    
    return { subtotal, shipping, tax, total };
  };

  const getCartItemCount = () => cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      increaseQuantity,
      decreaseQuantity,
      clearCart,
      getCartTotal,
      getCartItemCount
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
