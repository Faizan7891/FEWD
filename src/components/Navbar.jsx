import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Heart, Search, Menu, X, User, Sun, Moon } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const { getCartItemCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Categories', path: '/categories' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-background/80 backdrop-blur-md shadow-sm border-b border-border' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary text-primary-foreground rounded-md flex items-center justify-center font-bold text-xl">
              S
            </div>
            <span className="font-bold text-xl tracking-tight text-foreground">ShopSphere</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === link.path ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center gap-4">
            <button onClick={toggleTheme} className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-muted">
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <Link to="/products" className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-muted">
              <Search size={20} />
            </Link>
            <Link to="/wishlist" className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-muted relative">
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <Link to="/cart" className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-muted relative">
              <ShoppingBag size={20} />
              {getCartItemCount() > 0 && (
                <span className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {getCartItemCount()}
                </span>
              )}
            </Link>
            <Link to={isAuthenticated ? "/profile" : "/login"} className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-muted">
              <User size={20} />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 md:hidden">
            <Link to="/cart" className="relative p-2">
              <ShoppingBag size={24} />
              {getCartItemCount() > 0 && (
                <span className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {getCartItemCount()}
                </span>
              )}
            </Link>
            <button 
              className="p-2 text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-b border-border shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-1 flex flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`block px-3 py-3 rounded-md text-base font-medium ${
                  location.pathname === link.path ? 'bg-muted text-primary' : 'text-foreground hover:bg-muted/50'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="h-px bg-border my-2 mx-3"></div>
            
            <Link to="/wishlist" className="flex items-center gap-3 px-3 py-3 rounded-md text-base font-medium text-foreground hover:bg-muted/50">
              <Heart size={20} /> 
              Wishlist
              {wishlistCount > 0 && (
                <span className="ml-auto bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full">
                  {wishlistCount}
                </span>
              )}
            </Link>
            
            <Link to={isAuthenticated ? "/profile" : "/login"} className="flex items-center gap-3 px-3 py-3 rounded-md text-base font-medium text-foreground hover:bg-muted/50">
              <User size={20} /> 
              {isAuthenticated ? "My Profile" : "Login / Register"}
            </Link>

            <button 
              onClick={toggleTheme}
              className="flex items-center gap-3 px-3 py-3 rounded-md text-base font-medium text-foreground hover:bg-muted/50 text-left w-full"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
