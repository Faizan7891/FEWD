import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { categories } from '../data/products';

export default function Categories() {
  const categoryImages = {
    "Electronics": "https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=1000&auto=format&fit=crop",
    "Fashion": "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1000&auto=format&fit=crop",
    "Shoes": "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1000&auto=format&fit=crop",
    "Accessories": "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?q=80&w=1000&auto=format&fit=crop",
    "Beauty": "https://images.unsplash.com/photo-1599305090598-fe179d501227?q=80&w=1000&auto=format&fit=crop",
    "Home": "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1000&auto=format&fit=crop"
  };

  const categoryDescriptions = {
    "Electronics": "Latest gadgets, smart devices, and high-tech accessories.",
    "Fashion": "Trendy apparel for men and women. Look your best.",
    "Shoes": "From running sneakers to elegant boots.",
    "Accessories": "Watches, sunglasses, bags, and more.",
    "Beauty": "Skincare, makeup, and wellness products.",
    "Home": "Decor, essentials, and furnishings for your space."
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Explore Categories</h1>
        <p className="text-lg text-muted-foreground">
          Find exactly what you're looking for by browsing through our curated collections.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category) => (
          <Link 
            key={category} 
            to={`/products?category=${category}`}
            className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-muted shadow-sm hover:shadow-md transition-shadow"
          >
            <img 
              src={categoryImages[category]} 
              alt={category} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
            <div className="absolute inset-0 p-6 flex flex-col justify-end">
              <div className="flex items-end justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">{category}</h2>
                  <p className="text-white/80 text-sm max-w-[80%]">{categoryDescriptions[category]}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white group-hover:bg-primary transition-colors">
                  <ArrowRight size={20} className="group-hover:-rotate-45 transition-transform" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
