import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, ShieldCheck, Truck, RefreshCw, Heart, Minus, Plus, ShoppingCart, Check } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [activeTab, setActiveTab] = useState('description');
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const foundProduct = products.find(p => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
      setActiveImage(0);
      setQuantity(1);
      if (foundProduct.colors && foundProduct.colors.length > 0) {
        setSelectedColor(foundProduct.colors[0]);
      }
      if (foundProduct.sizes && foundProduct.sizes.length > 0) {
        setSelectedSize(foundProduct.sizes[0]);
      }
      window.scrollTo(0, 0);
    } else {
      navigate('/404');
    }
  }, [id, navigate]);

  if (!product) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  const isWished = isInWishlist(product.id);
  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    if (product.colors?.length > 0 && !selectedColor) return alert("Please select a color");
    if (product.sizes?.length > 0 && !selectedSize) return alert("Please select a size");
    
    setIsAdding(true);
    addToCart(product, quantity, selectedColor, selectedSize);
    setTimeout(() => setIsAdding(false), 1500);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/checkout');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Breadcrumbs */}
      <nav className="flex text-sm text-muted-foreground mb-8">
        <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <Link to={`/products?category=${product.category}`} className="hover:text-foreground transition-colors">{product.category}</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground truncate">{product.name}</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-12 mb-16">
        {/* Product Images */}
        <div className="w-full lg:w-1/2 flex flex-col-reverse md:flex-row gap-4">
          <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto md:max-h-[600px] scrollbar-hide py-1">
            {product.images.map((img, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`w-20 h-24 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-colors ${activeImage === idx ? 'border-primary' : 'border-transparent opacity-70 hover:opacity-100'}`}
              >
                <img src={img} alt={`${product.name} thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
          <div className="flex-1 bg-muted rounded-2xl overflow-hidden aspect-square md:aspect-auto md:h-[600px] relative">
            <img 
              src={product.images[activeImage]} 
              alt={product.name} 
              className="w-full h-full object-cover object-center"
            />
            {product.discount > 0 && (
              <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-md">
                {product.discount}% OFF
              </div>
            )}
            <button 
              onClick={() => toggleWishlist(product)}
              className="absolute top-4 right-4 p-3 bg-background/80 backdrop-blur-sm rounded-full text-muted-foreground hover:text-red-500 hover:bg-background transition-colors"
            >
              <Heart size={20} className={isWished ? "fill-red-500 text-red-500" : ""} />
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <div className="mb-2 text-sm font-medium text-primary uppercase tracking-wider">
            {product.brand}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {product.name}
          </h1>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-1">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className={i < Math.floor(product.rating) ? "fill-yellow-400" : "fill-muted text-muted"} />
                ))}
              </div>
              <span className="text-sm font-medium text-foreground ml-1">{product.rating}</span>
            </div>
            <a href="#reviews" className="text-sm text-primary hover:underline">
              {product.reviewCount} Reviews
            </a>
          </div>

          <div className="flex items-end gap-4 mb-8">
            <span className="text-4xl font-bold text-foreground">
              ${product.price.toFixed(2)}
            </span>
            {product.discount > 0 && (
              <span className="text-xl text-muted-foreground line-through mb-1">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
            {product.description}
          </p>

          {/* Variants */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-bold text-foreground mb-3">Color: <span className="font-normal text-muted-foreground">{selectedColor}</span></h3>
              <div className="flex flex-wrap gap-3">
                {product.colors.map(color => (
                  <button 
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
                      selectedColor === color 
                        ? 'border-primary bg-primary/5 text-primary' 
                        : 'border-border text-foreground hover:border-muted-foreground'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-bold text-foreground">Size: <span className="font-normal text-muted-foreground">{selectedSize}</span></h3>
                <button className="text-sm text-primary hover:underline">Size Guide</button>
              </div>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map(size => (
                  <button 
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-lg border flex items-center justify-center font-medium transition-colors ${
                      selectedSize === size 
                        ? 'border-primary bg-primary text-primary-foreground' 
                        : 'border-border text-foreground hover:border-muted-foreground'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex items-center border border-border rounded-lg bg-background w-fit">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-12 h-12 flex items-center justify-center text-foreground hover:bg-muted transition-colors rounded-l-lg"
              >
                <Minus size={16} />
              </button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <button 
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="w-12 h-12 flex items-center justify-center text-foreground hover:bg-muted transition-colors rounded-r-lg"
              >
                <Plus size={16} />
              </button>
            </div>
            
            <button 
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-8 rounded-lg font-bold transition-colors ${
                product.stock === 0 
                  ? 'bg-muted text-muted-foreground cursor-not-allowed'
                  : isAdding
                    ? 'bg-green-500 text-white'
                    : 'bg-primary text-primary-foreground hover:bg-primary/90'
              }`}
            >
              {isAdding ? (
                <><Check size={20} /> Added to Cart</>
              ) : (
                <><ShoppingCart size={20} /> Add to Cart</>
              )}
            </button>
          </div>
          
          <div className="flex gap-4">
            <button 
              onClick={handleBuyNow}
              disabled={product.stock === 0}
              className="flex-1 border-2 border-primary text-primary py-3 px-8 rounded-lg font-bold hover:bg-primary/5 transition-colors disabled:border-muted disabled:text-muted-foreground disabled:cursor-not-allowed"
            >
              Buy it Now
            </button>
          </div>

          <p className="mt-4 text-sm text-center md:text-left text-muted-foreground">
            {product.stock > 0 ? (
              <span className="text-green-600 font-medium">In Stock</span>
            ) : (
              <span className="text-red-500 font-medium">Out of Stock</span>
            )}
            {product.stock > 0 && ` — Usually ships within 24 hours`}
          </p>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-8 border-t border-border">
            <div className="flex items-center gap-3 text-sm text-foreground">
              <Truck className="text-primary" size={20} />
              <span>Free Worldwide Shipping</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-foreground">
              <RefreshCw className="text-primary" size={20} />
              <span>30 Days Return Policy</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-foreground">
              <ShieldCheck className="text-primary" size={20} />
              <span>2 Year Warranty</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-16">
        <div className="flex border-b border-border overflow-x-auto scrollbar-hide">
          <button 
            onClick={() => setActiveTab('description')}
            className={`py-4 px-8 font-medium text-sm whitespace-nowrap transition-colors ${
              activeTab === 'description' 
                ? 'border-b-2 border-primary text-primary' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Description
          </button>
          <button 
            onClick={() => setActiveTab('specifications')}
            className={`py-4 px-8 font-medium text-sm whitespace-nowrap transition-colors ${
              activeTab === 'specifications' 
                ? 'border-b-2 border-primary text-primary' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Specifications
          </button>
          <button 
            id="reviews"
            onClick={() => setActiveTab('reviews')}
            className={`py-4 px-8 font-medium text-sm whitespace-nowrap transition-colors ${
              activeTab === 'reviews' 
                ? 'border-b-2 border-primary text-primary' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Reviews ({product.reviewCount})
          </button>
        </div>

        <div className="py-8">
          {activeTab === 'description' && (
            <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none text-muted-foreground">
              <p>{product.description}</p>
              <p>Experience the perfect blend of style, functionality, and durability. Designed to meet the highest standards of quality, this product is crafted using premium materials to ensure lasting satisfaction. Whether for daily use or special occasions, it delivers exceptional performance that you can rely on.</p>
              <ul>
                <li>Premium quality construction</li>
                <li>Designed for everyday comfort and utility</li>
                <li>Rigorous quality control standards</li>
                <li>Eco-friendly packaging</li>
              </ul>
            </div>
          )}

          {activeTab === 'specifications' && (
            <div className="max-w-3xl">
              <table className="w-full text-left border-collapse">
                <tbody>
                  {Object.entries(product.specifications || {}).map(([key, value], idx) => (
                    <tr key={key} className={idx % 2 === 0 ? 'bg-muted/50' : ''}>
                      <td className="py-3 px-4 text-sm font-medium text-foreground w-1/3 border border-border">{key}</td>
                      <td className="py-3 px-4 text-sm text-muted-foreground border border-border">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 mb-12 bg-muted/30 p-8 rounded-2xl">
                <div className="text-center sm:text-left flex-shrink-0">
                  <div className="text-5xl font-bold text-foreground mb-2">{product.rating}</div>
                  <div className="flex text-yellow-400 justify-center sm:justify-start mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={20} className={i < Math.floor(product.rating) ? "fill-yellow-400" : "fill-muted text-muted"} />
                    ))}
                  </div>
                  <div className="text-sm text-muted-foreground">Based on {product.reviewCount} reviews</div>
                </div>
                
                <div className="flex-1 w-full max-w-md">
                  {[5, 4, 3, 2, 1].map((rating) => {
                    const percentage = rating === 5 ? 75 : rating === 4 ? 15 : rating === 3 ? 5 : rating === 2 ? 3 : 2;
                    return (
                      <div key={rating} className="flex items-center gap-4 mb-2">
                        <div className="flex items-center gap-1 w-12 text-sm text-foreground">
                          {rating} <Star size={12} className="fill-current text-yellow-400" />
                        </div>
                        <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
                          <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${percentage}%` }}></div>
                        </div>
                        <div className="w-10 text-right text-xs text-muted-foreground">{percentage}%</div>
                      </div>
                    );
                  })}
                </div>
                
                <div className="flex flex-col justify-center items-center sm:items-end w-full sm:w-auto">
                  <h4 className="font-medium text-foreground mb-2">Share your thoughts</h4>
                  <button className="bg-foreground text-background px-6 py-2 rounded-full font-medium hover:bg-foreground/90 transition-colors whitespace-nowrap">
                    Write a Review
                  </button>
                </div>
              </div>

              {/* Demo Reviews */}
              <div className="space-y-8">
                {[
                  { name: "Sarah J.", rating: 5, date: "2 weeks ago", title: "Absolutely love it!", comment: "Exceeded my expectations. The quality is fantastic and it looks exactly like the pictures." },
                  { name: "Michael T.", rating: 4, date: "1 month ago", title: "Great product, fast shipping", comment: "Really happy with my purchase. The only reason it's 4 stars is because the packaging was slightly damaged." },
                  { name: "Emily R.", rating: 5, date: "2 months ago", title: "Worth every penny", comment: "I was hesitant because of the price, but it's totally worth it. Highly recommend to everyone." }
                ].map((review, idx) => (
                  <div key={idx} className="border-b border-border pb-8 last:border-0 last:pb-0">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="font-bold text-foreground mr-4">{review.name}</span>
                        <span className="text-sm text-muted-foreground">{review.date}</span>
                      </div>
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} className={i < review.rating ? "fill-yellow-400" : "fill-muted text-muted"} />
                        ))}
                      </div>
                    </div>
                    <h4 className="font-medium text-foreground mb-2">{review.title}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-8">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
