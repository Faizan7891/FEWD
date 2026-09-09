import { categories, products } from '../data/products';

export default function FilterSidebar({ filters, setFilters, isOpen, setIsOpen }) {
  const brands = [...new Set(products.map(p => p.brand))].sort();

  const handleCategoryChange = (category) => {
    setFilters(prev => {
      const newCategories = prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category];
      return { ...prev, categories: newCategories };
    });
  };

  const handleBrandChange = (brand) => {
    setFilters(prev => {
      const newBrands = prev.brands.includes(brand)
        ? prev.brands.filter(b => b !== brand)
        : [...prev.brands, brand];
      return { ...prev, brands: newBrands };
    });
  };

  return (
    <div className={`w-full lg:w-64 flex-shrink-0 ${isOpen ? 'block' : 'hidden lg:block'}`}>
      <div className="bg-card border border-border rounded-xl p-5 sticky top-24">
        <div className="flex justify-between items-center mb-6 lg:hidden">
          <h2 className="font-bold text-lg">Filters</h2>
          <button onClick={() => setIsOpen(false)} className="text-muted-foreground">Close</button>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <h3 className="font-bold text-foreground mb-4">Categories</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-2 scrollbar-hide">
            {categories.map(category => (
              <label key={category} className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input 
                    type="checkbox" 
                    className="peer sr-only"
                    checked={filters.categories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                  />
                  <div className="w-5 h-5 border border-border rounded bg-background peer-checked:bg-primary peer-checked:border-primary transition-colors flex items-center justify-center">
                    {filters.categories.includes(category) && (
                      <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 5L4.5 8.5L11 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  {category}
                </span>
              </label>
            ))}
          </div>
        </div>


        {/* Price Range */}
        <div className="mb-8">
          <h3 className="font-bold text-foreground mb-4">Price Range</h3>
          <div className="flex items-center gap-2">
            <input 
              type="number" 
              placeholder="Min" 
              value={filters.minPrice}
              onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
              className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:border-primary transition-colors"
            />
            <span className="text-muted-foreground">-</span>
            <input 
              type="number" 
              placeholder="Max" 
              value={filters.maxPrice}
              onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
              className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>


        <button 
          onClick={() => setFilters({ categories: [], minPrice: '', maxPrice: '' })}
          className="w-full py-2 bg-muted text-foreground rounded-md text-sm font-medium hover:bg-muted/80 transition-colors"
        >
          Clear All Filters
        </button>
      </div>
    </div>
  );
}
