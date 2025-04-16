'use client';

import { useState } from 'react';
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

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();
  const [notifications] = useState([
    { id: 1, title: "Monthly report available", time: "Just now" },
    { id: 2, title: "Goal completed: Emergency Fund", time: "2 hours ago" },
    { id: 3, title: "New badge earned: Consistency King", time: "Yesterday" }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <>
      {/* Dashboard Header */}
      <header className="py-3 px-6 sticky top-0 z-50 backdrop-blur-md bg-[var(--background-50)]/90 border-b border-[var(--primary-200)]/20">
        <div className="flex justify-between items-center">
          {/* Left side */}
          <div className="flex items-center gap-3">
            <motion.button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-md hover:bg-[var(--primary-100)]"
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle sidebar"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
            
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-[var(--primary-400)] to-[var(--primary-600)] rounded-md flex items-center justify-center text-[var(--background-50)] font-bold shadow-sm">G</div>
              <motion.span 
                className="font-bold text-xl"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                GoalStack
              </motion.span>
            </Link>
          </div>
          
          {/* Center - Search */}
          <div className="hidden md:flex items-center w-1/3 relative">
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full py-2 px-4 pr-10 rounded-lg bg-[var(--background-100)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-300)] transition-all"
            />
            <Search size={18} className="absolute right-3 opacity-50" />
          </div>
          
          {/* Right side */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <motion.button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-full hover:bg-[var(--primary-100)] relative"
                whileTap={{ scale: 0.9 }}
              >
                <Bell size={20} />
                <span className="absolute top-0 right-0 w-2 h-2 bg-[var(--accent)] rounded-full"></span>
              </motion.button>
              
              <AnimatePresence>
                {showNotifications && (
                  <motion.div 
                    className="absolute right-0 mt-2 w-72 bg-[var(--background-50)] border border-[var(--primary-200)]/30 rounded-lg shadow-lg overflow-hidden z-50"
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
              <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-[var(--primary-300)]">
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

      <div className="flex">
        {/* Sidebar */}
        <AnimatePresence mode="wait">
          {isSidebarOpen && (
            <motion.aside 
              className="w-64 border-r border-[var(--primary-200)]/20 h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto bg-[var(--background-50)]"
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
                      >
                        <Home size={18} />
                        <span>Dashboard</span>
                      </Link>
                    </motion.li>
                    <motion.li whileHover={{ x: 3 }}>
                      <Link 
                        href="/goals"
                        className={`flex items-center gap-3 w-full p-2.5 rounded-lg ${isActive('/goals') ? 'bg-[var(--primary-100)] text-[var(--primary-600)]' : 'hover:bg-[var(--background-100)]'}`}
                      >
                        <Target size={18} />
                        <span>Goals</span>
                      </Link>
                    </motion.li>
                    <motion.li whileHover={{ x: 3 }}>
                      <Link 
                        href="/analytics"
                        className={`flex items-center gap-3 w-full p-2.5 rounded-lg ${isActive('/analytics') ? 'bg-[var(--primary-100)] text-[var(--primary-600)]' : 'hover:bg-[var(--background-100)]'}`}
                      >
                        <BarChart3 size={18} />
                        <span>Analytics</span>
                      </Link>
                    </motion.li>
                    <motion.li whileHover={{ x: 3 }}>
                      <Link 
                        href="/transactions"
                        className={`flex items-center gap-3 w-full p-2.5 rounded-lg ${isActive('/transactions') ? 'bg-[var(--primary-100)] text-[var(--primary-600)]' : 'hover:bg-[var(--background-100)]'}`}
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
                      >
                        <Users size={18} />
                        <span>Testimonials</span>
                      </Link>
                    </motion.li>
                    <motion.li whileHover={{ x: 3 }}>
                      <Link
                        href="/settings"
                        className={`flex items-center gap-3 w-full p-2.5 rounded-lg ${isActive('/settings') ? 'bg-[var(--primary-100)] text-[var(--primary-600)]' : 'hover:bg-[var(--background-100)]'}`}
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
        <main className={`flex-1 p-6 transition-all duration-300 ${isSidebarOpen ? 'max-w-[calc(100%-16rem)]' : ''}`}>
          {children}
          
          {/* Footer */}
          <footer className="border-t border-[var(--primary-200)]/20 pt-6 pb-8 mt-12 text-center text-xs opacity-70">
            <p>© 2025 GoalStack. All rights reserved.</p>
            <div className="flex justify-center gap-4 mt-2">
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