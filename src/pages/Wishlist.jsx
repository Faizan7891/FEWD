import { Link } from 'react-router-dom';
import { Heart, Trash2, ShoppingCart } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import EmptyState from '../components/EmptyState';
import ProductCard from '../components/ProductCard';

export default function Wishlist() {
  const { wishlist, removeFromWishlist, moveToCart, clearWishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <EmptyState 
        icon={Heart}
        title="Your wishlist is empty"
        description="Save items you love here and purchase them later. Start exploring our collections to find your new favorites."
        actionText="Discover Products"
        actionLink="/products"
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">My Wishlist</h1>
          <p className="text-muted-foreground">{wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved</p>
        </div>
        <button 
          onClick={clearWishlist}
          className="text-sm font-medium text-muted-foreground hover:text-red-500 transition-colors"
        >
          Clear Wishlist
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlist.map((product) => (
          <div key={product.id} className="relative group">
            <button
              onClick={(e) => {
                e.preventDefault();
                removeFromWishlist(product.id);
              }}
              className="absolute top-3 right-3 z-10 p-2 bg-background/80 backdrop-blur-sm rounded-full text-muted-foreground hover:text-red-500 hover:bg-background transition-colors opacity-0 group-hover:opacity-100 sm:opacity-100 shadow-sm"
              aria-label="Remove from wishlist"
            >
              <Trash2 size={16} />
            </button>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
