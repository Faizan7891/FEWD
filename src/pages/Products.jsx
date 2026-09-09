import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, ChevronDown, Grid, List, X } from 'lucide-react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';
import EmptyState from '../components/EmptyState';
import { Search } from 'lucide-react';

export default function Products() {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category');
  const initialSearch = searchParams.get('search') || '';

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [sortOrder, setSortOrder] = useState('featured');
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const [filters, setFilters] = useState({
    categories: initialCategory ? [initialCategory] : [],
    minPrice: '',
    maxPrice: ''
  });

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sortOrder, searchQuery]);

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // Search filter
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(lowerQuery) || 
        p.brand.toLowerCase().includes(lowerQuery) ||
        p.category.toLowerCase().includes(lowerQuery)
      );
    }

    // Category filter
    if (filters.categories.length > 0) {
      result = result.filter(p => filters.categories.includes(p.category));
    }

    // Price filter
    if (filters.minPrice) {
      result = result.filter(p => p.price >= parseFloat(filters.minPrice));
    }
    if (filters.maxPrice) {
      result = result.filter(p => p.price <= parseFloat(filters.maxPrice));
    }

    // Sorting
    switch (sortOrder) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'popular':
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case 'newest':
        // Mock newest by reversing array for demo purposes
        result.reverse();
        break;
      case 'featured':
      default:
        result.sort((a, b) => (b.featured === a.featured) ? 0 : b.featured ? 1 : -1);
        break;
    }

    return result;
  }, [filters, sortOrder, searchQuery]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);
  const currentProducts = filteredAndSortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">All Products</h1>
          <p className="text-muted-foreground">
            Showing {currentProducts.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} - {Math.min(currentPage * itemsPerPage, filteredAndSortedProducts.length)} of {filteredAndSortedProducts.length} results
          </p>
        </div>
        
        {/* Search Bar */}
        <div className="w-full md:w-auto flex-1 max-w-md relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-full text-sm focus:outline-none focus:border-primary transition-colors"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden flex items-center justify-between mb-4">
          <button 
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-2 bg-background border border-border px-4 py-2 rounded-md text-sm font-medium hover:bg-muted transition-colors"
          >
            <Filter size={18} />
            Filters
          </button>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <select 
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="appearance-none bg-background border border-border px-4 py-2 pr-10 rounded-md text-sm font-medium hover:bg-muted transition-colors focus:outline-none"
              >
                <option value="featured">Featured</option>
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="newest">Newest Arrivals</option>
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Filter Sidebar */}
        <FilterSidebar 
          filters={filters} 
          setFilters={setFilters} 
          isOpen={isFilterOpen} 
          setIsOpen={setIsFilterOpen} 
        />

        {/* Main Content */}
        <div className="flex-1">
          {/* Top Bar */}
          <div className="hidden lg:flex items-center justify-between mb-6 pb-6 border-b border-border">
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted'}`}
              >
                <Grid size={20} />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted'}`}
              >
                <List size={20} />
              </button>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <div className="relative">
                <select 
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="appearance-none bg-transparent border-none py-1 pr-6 text-sm font-medium cursor-pointer focus:outline-none focus:ring-0"
                >
                  <option value="featured">Featured</option>
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="newest">Newest Arrivals</option>
                </select>
                <ChevronDown size={16} className="absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Product Grid/List */}
          {currentProducts.length > 0 ? (
            <>
              <div className={
                viewMode === 'grid' 
                  ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6" 
                  : "flex flex-col gap-6"
              }>
                {currentProducts.map(product => (
                  <div key={product.id} className={viewMode === 'list' ? 'flex flex-col sm:flex-row gap-6 bg-card border border-border rounded-xl overflow-hidden p-4' : ''}>
                    {viewMode === 'grid' ? (
                      <ProductCard product={product} />
                    ) : (
                      <>
                        <div className="w-full sm:w-48 flex-shrink-0 aspect-[4/5] sm:aspect-square bg-muted rounded-lg overflow-hidden">
                          <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col flex-1 py-2">
                          <div className="mb-1 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            {product.brand}
                          </div>
                          <h3 className="text-xl font-medium text-foreground mb-2">
                            {product.name}
                          </h3>
                          <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                            {product.description}
                          </p>
                          <div className="flex items-center gap-1 mb-4">
                            <div className="flex text-yellow-400">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} size={14} className={i < Math.floor(product.rating) ? "fill-yellow-400" : "fill-muted text-muted"} />
                              ))}
                            </div>
                            <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
                          </div>
                          <div className="mt-auto flex items-center justify-between">
                            <div className="flex flex-col">
                              <span className="font-bold text-xl text-foreground">
                                ${product.price.toFixed(2)}
                              </span>
                              {product.discount > 0 && (
                                <span className="text-sm text-muted-foreground line-through">
                                  ${product.originalPrice.toFixed(2)}
                                </span>
                              )}
                            </div>
                            <button className="bg-primary text-primary-foreground px-6 py-2 rounded-full font-medium hover:bg-primary/90 transition-colors">
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-12 gap-2">
                  <button 
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border border-border rounded-md text-sm font-medium hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Previous
                  </button>
                  
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-10 h-10 rounded-md text-sm font-medium transition-colors ${
                        currentPage === i + 1 
                          ? 'bg-primary text-primary-foreground' 
                          : 'border border-border hover:bg-muted text-foreground'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  
                  <button 
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border border-border rounded-md text-sm font-medium hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            <EmptyState 
              icon={Filter}
              title="No products found"
              description="We couldn't find any products matching your current filters. Try adjusting your search criteria."
              actionText="Clear Filters"
              actionLink="#"
              // We'll mock the actionLink by just resetting filters via onClick, wait, empty state only supports links currently. Let's update EmptyState to support onClick.
            />
          )}
          {currentProducts.length === 0 && (
            <div className="flex justify-center mt-4">
               <button 
                  onClick={() => setFilters({ categories: [], minPrice: '', maxPrice: '' })}
                  className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors"
                >
                  Clear All Filters
                </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
