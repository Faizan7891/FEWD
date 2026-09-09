import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-md">
        <div className="text-9xl font-black text-muted mb-4 tracking-tighter">404</div>
        <h1 className="text-3xl font-bold text-foreground mb-4">Page Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/" 
            className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors"
          >
            <Home size={18} /> Back to Home
          </Link>
          <Link 
            to="/products" 
            className="flex items-center justify-center gap-2 bg-background text-foreground border border-border px-6 py-3 rounded-full font-medium hover:bg-muted transition-colors"
          >
            <Search size={18} /> Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
}
