import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, LogOut, Package, Heart, MapPin, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';

export default function Profile() {
  const { user, logout, isAuthenticated } = useAuth();
  const { wishlistCount } = useWishlist();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!user) return null;

  // Mock order count since we use localStorage for orders
  const orders = JSON.parse(localStorage.getItem('shopsphere-orders') || '[]');
  const orderCount = orders.length;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">My Account</h1>
        <p className="text-muted-foreground">Manage your profile and orders</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
            <div className="p-6 text-center border-b border-border">
              <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <h2 className="font-bold text-lg text-foreground">{user.name}</h2>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
            
            <nav className="p-2">
              <Link to="/profile" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium bg-primary/10 text-primary transition-colors">
                <User size={18} /> Profile Info
              </Link>
              <Link to="/orders" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors">
                <Package size={18} /> My Orders
                {orderCount > 0 && <span className="ml-auto bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">{orderCount}</span>}
              </Link>
              <Link to="/wishlist" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors">
                <Heart size={18} /> Wishlist
                {wishlistCount > 0 && <span className="ml-auto bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">{wishlistCount}</span>}
              </Link>
              <button 
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors"
                onClick={() => alert('Settings page demo')}
              >
                <Settings size={18} /> Settings
              </button>
              <div className="h-px bg-border my-2 mx-4"></div>
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
              >
                <LogOut size={18} /> Log Out
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 space-y-8">
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-foreground">Personal Information</h3>
              <button className="text-sm text-primary font-medium hover:underline">Edit</button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Full Name</p>
                <p className="font-medium text-foreground">{user.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Email Address</p>
                <p className="font-medium text-foreground">{user.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Phone Number</p>
                <p className="font-medium text-foreground">+1 (555) 123-4567</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Date of Birth</p>
                <p className="font-medium text-foreground">Jan 1, 1990</p>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-foreground">Saved Addresses</h3>
              <button className="text-sm text-primary font-medium hover:underline">Add New</button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border border-primary rounded-lg p-4 relative bg-primary/5">
                <div className="absolute top-4 right-4 text-xs font-bold bg-primary text-primary-foreground px-2 py-1 rounded">DEFAULT</div>
                <div className="flex items-start gap-3">
                  <MapPin size={20} className="text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-foreground mb-1">{user.name}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      123 Main Street<br />
                      Apt 4B<br />
                      New York, NY 10001<br />
                      United States
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex gap-4 text-sm font-medium">
                  <button className="text-primary hover:underline">Edit</button>
                  <button className="text-red-500 hover:underline">Remove</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
