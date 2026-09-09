import { Link } from 'react-router-dom';
import { MessageCircle, Share2, Hash, Video, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-muted pt-16 pb-8 border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-md flex items-center justify-center font-bold text-xl">
                S
              </div>
              <span className="font-bold text-xl tracking-tight text-foreground">ShopSphere</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Your premium destination for discovering exceptional products. We curate the finest items to elevate your everyday life.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <MessageCircle size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Share2 size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Hash size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Video size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-bold text-foreground">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/products" className="text-sm text-muted-foreground hover:text-primary transition-colors">All Products</Link></li>
              <li><Link to="/categories" className="text-sm text-muted-foreground hover:text-primary transition-colors">Categories</Link></li>
              <li><Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">Our Blog</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="font-bold text-foreground">Customer Service</h3>
            <ul className="space-y-2">
              <li><Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link to="/faq" className="text-sm text-muted-foreground hover:text-primary transition-colors">FAQs</Link></li>
              <li><Link to="/shipping" className="text-sm text-muted-foreground hover:text-primary transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="font-bold text-foreground">Stay Updated</h3>
            <p className="text-sm text-muted-foreground">Subscribe to our newsletter for the latest products and exclusive offers.</p>
            <form className="flex mt-2" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full px-3 py-2 bg-background border border-border rounded-l-md text-sm focus:outline-none focus:border-primary transition-colors"
                required
              />
              <button 
                type="submit" 
                className="bg-primary text-primary-foreground px-4 py-2 rounded-r-md text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                Subscribe
              </button>
            </form>
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail size={16} />
                <span>support@shopsphere.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone size={16} />
                <span>+1 (800) 123-4567</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin size={16} className="mt-0.5" shrink-0="true" />
                <span>123 Commerce Avenue, Suite 100<br/>New York, NY 10001</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} ShopSphere. All rights reserved.
          </p>
          <div className="flex gap-4">
            <span className="w-10 h-6 bg-border rounded"></span>
            <span className="w-10 h-6 bg-border rounded"></span>
            <span className="w-10 h-6 bg-border rounded"></span>
            <span className="w-10 h-6 bg-border rounded"></span>
          </div>
        </div>
      </div>
    </footer>
  );
}
