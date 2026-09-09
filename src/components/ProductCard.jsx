import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, ShoppingCart, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [isAdding, setIsAdding] = useState(false);
  
  const isWished = isInWishlist(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent navigating to product detail
    setIsAdding(true);
    addToCart(product);
    setTimeout(() => setIsAdding(false), 1500);
  };

  const handleWishlist = (e) => {
    e.preventDefault(); // Prevent navigating
    toggleWishlist(product);
  };

  return (
    <div className="group relative bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full">
      {/* Discount Badge */}
      {product.discount > 0 && (
        <div className="absolute top-3 left-3 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
          {product.discount}% OFF
        </div>
      )}

      {/* Wishlist Button */}
      <button 
        onClick={handleWishlist}
        className="absolute top-3 right-3 z-10 p-2 bg-background/80 backdrop-blur-sm rounded-full text-muted-foreground hover:text-red-500 hover:bg-background transition-colors opacity-0 group-hover:opacity-100 sm:opacity-100"
        aria-label="Add to wishlist"
      >
        <Heart size={18} className={isWished ? "fill-red-500 text-red-500" : ""} />
      </button>

      {/* Image */}
      <Link to={`/products/${product.id}`} className="relative block aspect-[4/5] overflow-hidden bg-muted">
        <img 
          src={product.images[0]} 
          alt={product.name} 
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Hover Image if exists */}
        {product.images[1] && (
          <img 
            src={product.images[1]} 
            alt={product.name} 
            className="absolute inset-0 object-cover w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            loading="lazy"
          />
        )}
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="mb-1 text-xs font-medium text-muted-foreground uppercase tracking-wider">
          {product.brand}
        </div>
        <Link to={`/products/${product.id}`} className="flex-grow">
          <h3 className="font-medium text-foreground line-clamp-2 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        
        {/* Rating */}
        <div className="flex items-center gap-1 mt-2 mb-3">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={14} 
                className={i < Math.floor(product.rating) ? "fill-yellow-400" : "fill-muted text-muted"} 
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
        </div>

        {/* Price & Action */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
          <div className="flex flex-col">
            <span className="font-bold text-lg text-foreground">
              ${product.price.toFixed(2)}
            </span>
            {product.discount > 0 && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          
          <button 
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
              product.stock === 0 
                ? 'bg-muted text-muted-foreground cursor-not-allowed'
                : isAdding 
                  ? 'bg-green-500 text-white' 
                  : 'bg-primary text-primary-foreground hover:bg-primary/90'
            }`}
            aria-label="Add to cart"
          >
            {isAdding ? <Check size={18} /> : <ShoppingCart size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
}
