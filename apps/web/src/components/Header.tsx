'use client';

import { useState, useEffect } from 'react';
import { Button } from '@cargolinked/ui';
import { 
  Truck, 
  Bell, 
  User, 
  ChevronDown, 
  Menu, 
  X,
  LogOut,
  Settings,
  CreditCard
} from 'lucide-react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

interface HeaderProps {
  currentPage?: string;
}

export default function Header({ currentPage }: HeaderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<'agent' | 'shipper' | null>(null);
  const [userName, setUserName] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check authentication status
    const checkAuth = async () => {
      try {
        const { createClient } = await import('../lib/supabase');
        const supabase = createClient();
        
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          setIsAuthenticated(true);
          
          // Get user profile
          const { data: profile } = await supabase
            .from('users')
            .select('role, first_name, last_name')
            .eq('id', user.id)
            .single();
          
          if (profile) {
            setUserRole(profile.role === 'individual' || profile.role === 'business' ? 'shipper' : profile.role);
            setUserName(`${profile.first_name} ${profile.last_name}`);
          }
        } else {
          setIsAuthenticated(false);
          setUserRole(null);
          setUserName('');
        }
      } catch (error) {
        console.error('Auth check error:', error);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      const { createClient } = await import('../lib/supabase');
      const supabase = createClient();
      
      await supabase.auth.signOut();
      setIsAuthenticated(false);
      setUserRole(null);
      setUserName('');
      setShowProfileMenu(false);
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const getNavLinks = () => {
    if (!isAuthenticated) {
      return [
        { href: '/', label: 'Home', active: pathname === '/' },
        { href: '/browse-directory', label: 'Browse Directory', active: pathname === '/browse-directory' },
        { href: '/post-request', label: 'Post a Request', active: pathname === '/post-request' },
        { href: '/blog', label: 'Blog', active: pathname === '/blog' },
      ];
    }

    if (userRole === 'agent') {
      return [
        { href: '/agent/dashboard', label: 'Dashboard', active: pathname === '/agent/dashboard' },
        { href: '/browse-requests', label: 'Browse Requests', active: pathname === '/browse-requests' },
        { href: '/browse-directory', label: 'Directory', active: pathname === '/browse-directory' },
        { href: '/messages', label: 'Messages', active: pathname === '/messages' },
        { href: '/analytics', label: 'Analytics', active: pathname === '/analytics' },
      ];
    } else {
      return [
        { href: '/shipper/dashboard', label: 'Dashboard', active: pathname === '/shipper/dashboard' },
        { href: '/post-request', label: 'Post Request', active: pathname === '/post-request' },
        { href: '/browse-directory', label: 'Find Agents', active: pathname === '/browse-directory' },
        { href: '/tracking', label: 'Track Shipments', active: pathname === '/tracking' },
        { href: '/messages', label: 'Messages', active: pathname === '/messages' },
      ];
    }
  };

  const navLinks = getNavLinks();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Truck className="text-primary text-2xl mr-3" />
              <span className="text-2xl font-bold text-gray-900">CargoLinked</span>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:ml-8 md:flex md:space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-md transition-colors cursor-pointer ${
                    link.active || currentPage === link.label
                      ? 'text-primary font-medium'
                      : 'text-gray-600 hover:text-primary'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {/* Notifications */}
                <Link href="/notifications" className="relative">
                  <Button variant="ghost" size="sm" className="p-2">
                    <Bell className="h-5 w-5 text-gray-600" />
                    {notificationCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {notificationCount}
                      </span>
                    )}
                  </Button>
                </Link>

                {/* Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 focus:outline-none"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <span className="hidden md:block text-sm font-medium">{userName}</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>

                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                      <Link
                        href="/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowProfileMenu(false)}
                      >
                        <User className="w-4 h-4 mr-2" />
                        Profile
                      </Link>
                      <Link
                        href="/subscription"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowProfileMenu(false)}
                      >
                        <CreditCard className="w-4 h-4 mr-2" />
                        Subscription
                      </Link>
                      <Link
                        href="/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowProfileMenu(false)}
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        Settings
                      </Link>
                      <hr className="my-1" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                {/* Login/Signup for non-authenticated users */}
                <Link href="/login">
                  <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                    Log In
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="bg-primary hover:bg-primary-700">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              {showMobileMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-3 py-2 rounded-md transition-colors ${
                    link.active || currentPage === link.label
                      ? 'text-primary font-medium bg-blue-50'
                      : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                  }`}
                  onClick={() => setShowMobileMenu(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            
            {!isAuthenticated && (
              <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
                <Link href="/login" onClick={() => setShowMobileMenu(false)}>
                  <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-50">
                    Log In
                  </Button>
                </Link>
                <Link href="/signup" onClick={() => setShowMobileMenu(false)}>
                  <Button className="w-full bg-primary hover:bg-primary-700">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
