import { Link } from 'react-router-dom';
import { ArrowRight, Truck, ShieldCheck, RefreshCw, Star } from 'lucide-react';
import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const trendingProducts = products.filter(p => p.featured).slice(0, 4);
  const bestSellers = products.filter(p => p.bestSeller).slice(0, 4);

  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <section className="relative bg-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 via-black/60 to-transparent z-10"></div>
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2000&auto=format&fit=crop" 
            alt="Hero background" 
            className="w-full h-full object-cover object-center"
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 py-24 md:py-32 lg:py-40">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 drop-shadow-sm">
              Discover Something You'll Love
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 font-light drop-shadow">
              Explore our curated collection of premium products designed to elevate your everyday life.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/products" 
                className="bg-primary text-white px-8 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors flex items-center gap-2 border border-primary shadow-lg"
              >
                Shop Now <ArrowRight size={18} />
              </Link>
              <Link 
                to="/categories" 
                className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-3 rounded-full font-medium hover:bg-white/20 transition-colors shadow-lg"
              >
                Explore Categories
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Shop by Category</h2>
            <p className="text-muted-foreground">Find exactly what you're looking for</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => {
            const catImages = [
              "https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=500&auto=format&fit=crop", // Electronics
              "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=500&auto=format&fit=crop", // Fashion
              "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=500&auto=format&fit=crop", // Shoes
              "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?q=80&w=500&auto=format&fit=crop", // Accessories
              "https://images.unsplash.com/photo-1599305090598-fe179d501227?q=80&w=500&auto=format&fit=crop", // Beauty
              "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=500&auto=format&fit=crop"  // Home
            ];
            
            return (
              <Link 
                key={category} 
                to={`/products?category=${category}`}
                className="group relative overflow-hidden rounded-xl aspect-[4/5] bg-muted block"
              >
                <img 
                  src={catImages[index]} 
                  alt={category} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white font-bold text-lg tracking-wide">{category}</h3>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Trending Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Trending Now</h2>
            <p className="text-muted-foreground">Our most sought-after products</p>
          </div>
          <Link to="/products?sort=popular" className="hidden sm:flex text-primary font-medium items-center gap-1 hover:underline">
            View All <ArrowRight size={16} />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="relative rounded-2xl overflow-hidden bg-primary text-primary-foreground shadow-xl">
          <div className="absolute inset-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay"></div>
          <div className="relative z-10 px-6 py-12 md:py-16 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Summer Clearance Event</h2>
              <p className="text-primary-foreground/80 text-lg mb-6">
                Get up to 50% off on selected items. Limited time offer, don't miss out on these amazing deals.
              </p>
              <Link 
                to="/products?discount=true" 
                className="inline-block bg-background text-foreground px-8 py-3 rounded-full font-medium hover:bg-background/90 transition-colors"
              >
                Shop the Sale
              </Link>
            </div>
            <div className="hidden md:block text-8xl font-black opacity-20 rotate-12">
              -50%
            </div>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Best Sellers</h2>
            <p className="text-muted-foreground">Loved by thousands of customers</p>
          </div>
          <Link to="/products?sort=bestseller" className="hidden sm:flex text-primary font-medium items-center gap-1 hover:underline">
            View All <ArrowRight size={16} />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Features/Why Us */}
      <section className="bg-muted py-16 border-t border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Why ShopSphere?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We're committed to providing the best shopping experience possible with premium services.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-background p-6 rounded-xl border border-border text-center flex flex-col items-center">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
                <Truck size={24} />
              </div>
              <h3 className="font-bold text-lg mb-2">Fast Delivery</h3>
              <p className="text-muted-foreground text-sm">Free shipping on all orders over $50 with rapid delivery times.</p>
            </div>
            
            <div className="bg-background p-6 rounded-xl border border-border text-center flex flex-col items-center">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
                <ShieldCheck size={24} />
              </div>
              <h3 className="font-bold text-lg mb-2">Secure Shopping</h3>
              <p className="text-muted-foreground text-sm">Your payment information is processed securely with bank-level encryption.</p>
            </div>
            
            <div className="bg-background p-6 rounded-xl border border-border text-center flex flex-col items-center">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
                <RefreshCw size={24} />
              </div>
              <h3 className="font-bold text-lg mb-2">Easy Returns</h3>
              <p className="text-muted-foreground text-sm">Not satisfied? Return your items within 30 days for a full refund.</p>
            </div>
            
            <div className="bg-background p-6 rounded-xl border border-border text-center flex flex-col items-center">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
                <Star size={24} />
              </div>
              <h3 className="font-bold text-lg mb-2">Quality Products</h3>
              <p className="text-muted-foreground text-sm">We carefully curate our inventory to ensure only premium products.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
