'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import { 
  Target, 
  Users, 
  Bell, 
  Settings, 
  Menu, 
  X, 
  Home, 
  CreditCard, 
  BarChart3, 
  Search, 
  Zap,
  LogOut
} from 'lucide-react';
import { mockUserProfile } from '../data/mockData';

/**
 * Props for the AppLayout component
 */
interface AppLayoutProps {
  /** Child components to render within the layout */
  children: React.ReactNode;
}

/**
 * Main application layout component used across most pages
 * 
 * Provides:
 * - Responsive header with app branding, search, notifications, and theme toggle
 * - Responsive sidebar with navigation links
 * - Mobile-friendly layout with collapsible navigation
 * - Main content area with footer
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Content to display in the main area
 * @returns {JSX.Element} The complete page layout
 */
export default function AppLayout({ children }: AppLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const pathname = usePathname();
  const [notifications] = useState([
    { id: 1, title: "Monthly report available", time: "Just now" },
    { id: 2, title: "Goal completed: Emergency Fund", time: "2 hours ago" },
    { id: 3, title: "New badge earned: Consistency King", time: "Yesterday" }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  // Check if we're in mobile view and set sidebar accordingly
  useEffect(() => {
    const checkWindowSize = () => {
      const isMobile = window.innerWidth < 768;
      setIsMobileView(isMobile);
      setIsSidebarOpen(!isMobile);
    };
    
    // Initial check
    checkWindowSize();
    
    // Add event listener
    window.addEventListener('resize', checkWindowSize);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkWindowSize);
  }, []);

  // Close sidebar when navigating in mobile view
  useEffect(() => {
    if (isMobileView) {
      setIsSidebarOpen(false);
    }
  }, [pathname, isMobileView]);

  /**
   * Check if the given path matches the current path
   * 
   * @param {string} path - Path to check against current location
   * @returns {boolean} True if paths match
   */
  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <>
      {/* Dashboard Header */}
      <header className="py-2 md:py-3 px-3 md:px-6 sticky top-0 z-50 backdrop-blur-md bg-[var(--background-50)]/90 border-b border-[var(--primary-200)]/20">
        {/* Header content */}
        <div className="flex justify-between items-center">
          {/* Left side - Logo and toggle */}
          <div className="flex items-center gap-2 md:gap-3">
            <motion.button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-1.5 md:p-2 rounded-md hover:bg-[var(--primary-100)]"
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle sidebar"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
            
            <Link href="/" className="flex items-center gap-1 md:gap-2">
              <div className="w-7 h-7 md:w-8 md:h-8 bg-gradient-to-br from-[var(--primary-400)] to-[var(--primary-600)] rounded-md flex items-center justify-center text-[var(--background-50)] font-bold shadow-sm">G</div>
              <motion.span 
                className="font-bold text-lg md:text-xl"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                GoalStack
              </motion.span>
            </Link>
          </div>
          
          {/* Center - Search (hidden on mobile, toggleable) */}
          <AnimatePresence>
            {(!isMobileView || showMobileSearch) && (
              <motion.div 
                className={`${showMobileSearch ? 'absolute top-full left-0 right-0 p-3 bg-[var(--background-50)] shadow-md' : 'hidden'} md:relative md:flex md:shadow-none items-center md:w-1/3 z-50`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="relative w-full flex items-center">
                  <input 
                    type="text" 
                    placeholder="Search..." 
                    className="w-full py-2 px-4 pr-10 rounded-lg bg-[var(--background-100)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-300)] transition-all"
                  />
                  <Search size={18} className="absolute right-3 opacity-50" />
                  {showMobileSearch && (
                    <button 
                      className="absolute -right-2 -top-2 bg-[var(--primary-100)] rounded-full p-1"
                      onClick={() => setShowMobileSearch(false)}
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Right side - User actions */}
          <div className="flex items-center gap-1 md:gap-4">
            {/* Search button for mobile view */}
            <motion.button
              onClick={() => setShowMobileSearch(!showMobileSearch)}
              className="md:hidden p-1.5 rounded-md hover:bg-[var(--primary-100)]"
              whileTap={{ scale: 0.9 }}
              aria-label="Search"
            >
              <Search size={18} />
            </motion.button>
            
            {/* Notifications */}
            <div className="relative">
              <motion.button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-1.5 rounded-md hover:bg-[var(--primary-100)] relative"
                whileTap={{ scale: 0.9 }}
                aria-label="Notifications"
              >
                <Bell size={18} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-[var(--background-50)] text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
              </motion.button>
              
              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    className="absolute right-0 mt-2 w-64 md:w-72 bg-[var(--background-50)] border border-[var(--primary-200)]/30 rounded-lg shadow-lg overflow-hidden z-50"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="p-3 border-b border-[var(--primary-200)]/20 flex justify-between items-center bg-gradient-to-r from-[var(--background-50)] to-[var(--background-100)]">
                      <h3 className="font-medium">Notifications</h3>
                      <button className="text-xs text-[var(--primary)]">Mark all as read</button>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.map((notification) => (
                        <motion.div 
                          key={notification.id} 
                          className="p-3 border-b border-[var(--primary-200)]/10 hover:bg-[var(--background-100)] cursor-pointer"
                          whileHover={{ x: 3 }}
                        >
                          <p className="font-medium text-sm">{notification.title}</p>
                          <p className="text-xs opacity-70">{notification.time}</p>
                        </motion.div>
                      ))}
                    </div>
                    <div className="p-2 text-center bg-[var(--background-50)]">
                      <button className="text-xs text-[var(--primary)] hover:underline">View all notifications</button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <ThemeToggle />
            
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 md:w-8 md:h-8 rounded-full overflow-hidden border-2 border-[var(--primary-300)]">
                <Image 
                  src={mockUserProfile.avatar} 
                  alt={mockUserProfile.name} 
                  width={32}
                  height={32}
                  className="object-cover"
                />
              </div>
              <span className="hidden sm:inline text-sm font-medium">{mockUserProfile.name}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex relative">
        {/* Overlay for mobile sidebar */}
        {isMobileView && isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
        
        {/* Sidebar */}
        <AnimatePresence mode="wait">
          {isSidebarOpen && (
            <motion.aside 
              className={`${isMobileView ? 'fixed left-0 top-[3.5rem] z-50' : 'relative'} w-64 border-r border-[var(--primary-200)]/20 h-[calc(100vh-3.5rem)] md:h-[calc(100vh-4rem)] overflow-y-auto bg-[var(--background-50)] shadow-lg md:shadow-none`}
              initial={{ x: -260 }}
              animate={{ x: 0 }}
              exit={{ x: -260 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <nav className="p-4">
                <div className="mb-6">
                  <p className="text-xs uppercase opacity-50 font-medium mb-2 px-4">Main</p>
                  <ul className="space-y-1">
                    <motion.li whileHover={{ x: 3 }}>
                      <Link 
                        href="/"
                        className={`flex items-center gap-3 w-full p-2.5 rounded-lg ${isActive('/') ? 'bg-[var(--primary-100)] text-[var(--primary-600)]' : 'hover:bg-[var(--background-100)]'}`}
                        onClick={() => isMobileView && setIsSidebarOpen(false)}
                      >
                        <Home size={18} />
                        <span>Dashboard</span>
                      </Link>
                    </motion.li>
                    <motion.li whileHover={{ x: 3 }}>
                      <Link 
                        href="/goals"
                        className={`flex items-center gap-3 w-full p-2.5 rounded-lg ${isActive('/goals') ? 'bg-[var(--primary-100)] text-[var(--primary-600)]' : 'hover:bg-[var(--background-100)]'}`}
                        onClick={() => isMobileView && setIsSidebarOpen(false)}
                      >
                        <Target size={18} />
                        <span>Goals</span>
                      </Link>
                    </motion.li>
                    <motion.li whileHover={{ x: 3 }}>
                      <Link 
                        href="/analytics"
                        className={`flex items-center gap-3 w-full p-2.5 rounded-lg ${isActive('/analytics') ? 'bg-[var(--primary-100)] text-[var(--primary-600)]' : 'hover:bg-[var(--background-100)]'}`}
                        onClick={() => isMobileView && setIsSidebarOpen(false)}
                      >
                        <BarChart3 size={18} />
                        <span>Analytics</span>
                      </Link>
                    </motion.li>
                    <motion.li whileHover={{ x: 3 }}>
                      <Link 
                        href="/transactions"
                        className={`flex items-center gap-3 w-full p-2.5 rounded-lg ${isActive('/transactions') ? 'bg-[var(--primary-100)] text-[var(--primary-600)]' : 'hover:bg-[var(--background-100)]'}`}
                        onClick={() => isMobileView && setIsSidebarOpen(false)}
                      >
                        <CreditCard size={18} />
                        <span>Transactions</span>
                      </Link>
                    </motion.li>
                  </ul>
                </div>
                
                <div className="mb-6">
                  <p className="text-xs uppercase opacity-50 font-medium mb-2 px-4">Other</p>
                  <ul className="space-y-1">
                    <motion.li whileHover={{ x: 3 }}>
                      <Link 
                        href="/testimonials" 
                        className={`flex items-center gap-3 w-full p-2.5 rounded-lg ${isActive('/testimonials') ? 'bg-[var(--primary-100)] text-[var(--primary-600)]' : 'hover:bg-[var(--background-100)]'}`}
                        onClick={() => isMobileView && setIsSidebarOpen(false)}
                      >
                        <Users size={18} />
                        <span>Testimonials</span>
                      </Link>
                    </motion.li>
                    <motion.li whileHover={{ x: 3 }}>
                      <Link
                        href="/settings"
                        className={`flex items-center gap-3 w-full p-2.5 rounded-lg ${isActive('/settings') ? 'bg-[var(--primary-100)] text-[var(--primary-600)]' : 'hover:bg-[var(--background-100)]'}`}
                        onClick={() => isMobileView && setIsSidebarOpen(false)}
                      >
                        <Settings size={18} />
                        <span>Settings</span>
                      </Link>
                    </motion.li>
                    <motion.li whileHover={{ x: 3 }}>
                      <button className="flex items-center gap-3 w-full p-2.5 rounded-lg text-red-500 hover:bg-red-50 mt-4">
                        <LogOut size={18} />
                        <span>Logout</span>
                      </button>
                    </motion.li>
                  </ul>
                </div>
                
                {/* Premium Card */}
                <div className="mt-6">
                  <motion.div 
                    className="p-4 rounded-lg bg-gradient-to-br from-[var(--accent-100)] to-[var(--accent-200)] border border-[var(--accent-300)] card-elevated shadow-md"
                    whileHover={{ scale: 1.02, boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)' }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-1 bg-[var(--accent-600)] rounded-md text-[var(--background-50)]">
                        <Zap size={16} />
                      </div>
                      <h3 className="text-sm font-medium text-[var(--accent-800)]">Unlock Premium</h3>
                    </div>
                    <p className="text-xs opacity-70 mb-3 text-[var(--accent-900)]">Get advanced insights and exclusive features</p>
                    <motion.button 
                      className="w-full bg-[var(--accent-500)] text-xs text-[var(--background-50)] py-1.5 px-3 rounded-md shadow-sm"
                      whileHover={{ y: -2 }}
                      whileTap={{ y: 0 }}
                    >
                      Upgrade Now
                    </motion.button>
                  </motion.div>
                </div>
              </nav>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 transition-all duration-300">
          {children}
          
          {/* Footer */}
          <footer className="border-t border-[var(--primary-200)]/20 pt-4 md:pt-6 pb-6 md:pb-8 mt-8 md:mt-12 text-center text-xs opacity-70">
            <p>© 2025 GoalStack. All rights reserved.</p>
            <div className="flex flex-wrap justify-center gap-3 md:gap-4 mt-2">
              <Link href="#" className="hover:text-[var(--primary)]">Privacy Policy</Link>
              <Link href="#" className="hover:text-[var(--primary)]">Terms of Service</Link>
              <Link href="/testimonials" className="hover:text-[var(--primary)]">Testimonials</Link>
            </div>
          </footer>
        </main>
      </div>
    </>
  );
}