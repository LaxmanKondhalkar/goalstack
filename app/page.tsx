'use client';

import { useState } from 'react';
import { mockSavingsGoals, mockMonthlySummary, mockGamificationData } from './data/mockData';
import GoalsList from './components/GoalsList';
import MonthlySummary from './components/MonthlySummary';
import GamificationPanel from './components/GamificationPanel';
import ThemeToggle from './components/ThemeToggle';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PieChart, Target, 
  Users, Bell, Settings, Menu, X, Home, CreditCard, BarChart3, 
  Search, ChevronLeft, ChevronRight,
  DollarSign, Download, Share2, Zap
} from 'lucide-react';

/**
 * Dashboard component serving as the homepage for GoalStack
 * 
 * Displays a comprehensive financial dashboard including:
 * - Overview of user's financial metrics
 * - Savings goals progress
 * - Monthly spending and income summaries
 * - Recent transactions
 * - Financial tips
 * 
 * @returns {JSX.Element} The rendered dashboard interface
 */
export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab] = useState('overview');
  const [notifications] = useState([
    { id: 1, title: "Monthly report available", time: "Just now" },
    { id: 2, title: "Goal completed: Emergency Fund", time: "2 hours ago" },
    { id: 3, title: "New badge earned: Consistency King", time: "Yesterday" }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  // Months for chart data visualization
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  // Sample data for expense visualization
  const expenseData = [1200, 980, 1400, 1100, 1600, 1350];
  // Sample data for savings visualization
  const savingsData = [400, 500, 350, 450, 700, 620];

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
            
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-[var(--primary-400)] to-[var(--primary-600)] rounded-md flex items-center justify-center text-[var(--background-50)] font-bold shadow-sm">G</div>
              <motion.span 
                className="font-bold text-xl"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                GoalStack
              </motion.span>
            </div>
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
                  src="/avatars/profile.png" 
                  alt="User profile" 
                  width={32}
                  height={32}
                  className="object-cover"
                />
              </div>
              <span className="hidden sm:inline text-sm font-medium">Alex Johnson</span>
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
                        className={`flex items-center gap-3 w-full p-2.5 rounded-lg ${activeTab === 'overview' ? 'bg-[var(--primary-100)] text-[var(--primary-600)]' : 'hover:bg-[var(--background-100)]'}`}
                      >
                        <Home size={18} />
                        <span>Dashboard</span>
                      </Link>
                    </motion.li>
                    <motion.li whileHover={{ x: 3 }}>
                      <Link 
                        href="/goals"
                        className={`flex items-center gap-3 w-full p-2.5 rounded-lg ${activeTab === 'goals' ? 'bg-[var(--primary-100)] text-[var(--primary-600)]' : 'hover:bg-[var(--background-100)]'}`}
                      >
                        <Target size={18} />
                        <span>Goals</span>
                      </Link>
                    </motion.li>
                    <motion.li whileHover={{ x: 3 }}>
                      <Link 
                        href="/analytics"
                        className={`flex items-center gap-3 w-full p-2.5 rounded-lg ${activeTab === 'analytics' ? 'bg-[var(--primary-100)] text-[var(--primary-600)]' : 'hover:bg-[var(--background-100)]'}`}
                      >
                        <BarChart3 size={18} />
                        <span>Analytics</span>
                      </Link>
                    </motion.li>
                    <motion.li whileHover={{ x: 3 }}>
                      <Link 
                        href="/transactions"
                        className={`flex items-center gap-3 w-full p-2.5 rounded-lg ${activeTab === 'transactions' ? 'bg-[var(--primary-100)] text-[var(--primary-600)]' : 'hover:bg-[var(--background-100)]'}`}
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
                        className={`flex items-center gap-3 w-full p-2.5 rounded-lg ${activeTab === 'testimonials' ? 'bg-[var(--primary-100)] text-[var(--primary-600)]' : 'hover:bg-[var(--background-100)]'}`}
                      >
                        <Users size={18} />
                        <span>Testimonials</span>
                      </Link>
                    </motion.li>
                    <motion.li whileHover={{ x: 3 }}>
                      <Link
                        href="/settings"
                        className={`flex items-center gap-3 w-full p-2.5 rounded-lg ${activeTab === 'settings' ? 'bg-[var(--primary-100)] text-[var(--primary-600)]' : 'hover:bg-[var(--background-100)]'}`}
                      >
                        <Settings size={18} />
                        <span>Settings</span>
                      </Link>
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
          {/* Dashboard Header/Title */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold">Dashboard Overview</h1>
              <p className="text-sm opacity-70">Welcome back, Alex! Here&apos;s what&apos;s happening with your finances.</p>
            </div>
            <div className="flex items-center mt-4 md:mt-0 gap-3">
              <div className="flex items-center border border-[var(--primary-300)]/30 rounded-lg overflow-hidden shadow-sm">
                <button className="py-1.5 px-3 bg-gradient-to-r from-[var(--primary-400)] to-[var(--primary-500)] text-[var(--background-50)] text-sm font-medium">Today</button>
                <button className="py-1.5 px-3 text-sm hover:bg-[var(--background-100)]">Week</button>
                <button className="py-1.5 px-3 text-sm hover:bg-[var(--background-100)]">Month</button>
              </div>
              <motion.button 
                className="p-2 rounded-lg border border-[var(--primary-300)]/30 hover:bg-[var(--background-100)] shadow-sm"
                whileTap={{ scale: 0.95 }}
              >
                <Download size={16} />
              </motion.button>
              <motion.button 
                className="p-2 rounded-lg border border-[var(--primary-300)]/30 hover:bg-[var(--background-100)] shadow-sm"
                whileTap={{ scale: 0.95 }}
              >
                <Share2 size={16} />
              </motion.button>
            </div>
          </div>
          
          {/* Quick Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { title: "Total Balance", value: "$12,560", change: "+8.2%", color: "text-[var(--primary-500)]", gradient: "from-[var(--primary-100)] to-[var(--primary-200)]", variant: "elevated" },
              { title: "Monthly Savings", value: "$2,140", change: "+12.5%", color: "text-[var(--accent-500)]", gradient: "from-[var(--accent-100)] to-[var(--accent-200)]", variant: "elevated" },
              { title: "Total Expenses", value: "$4,230", change: "-3.1%", color: "text-[var(--secondary-500)]", gradient: "from-[var(--secondary-100)] to-[var(--secondary-200)]", variant: "bordered" },
              { title: "Goals Progress", value: "68%", change: "+5.3%", color: "text-[var(--primary-500)]", gradient: "from-[var(--primary-100)] to-[var(--primary-200)]", variant: "bordered" }
            ].map((card, index) => (
              <motion.div 
                key={index}
                className={`${card.variant === 'elevated' ? 'card-elevated' : 'card-bordered'} p-5`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
              >
                <div className="flex justify-between items-center">
                  <p className="text-sm opacity-70">{card.title}</p>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${card.change.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {card.change}
                  </span>
                </div>
                <h2 className={`text-2xl md:text-3xl font-bold mt-2 ${card.color}`}>{card.value}</h2>
                <div className="mt-4 h-2 bg-[var(--background-100)] rounded-full overflow-hidden">
                  <motion.div 
                    className={`h-full bg-gradient-to-r ${card.gradient}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${index === 3 ? 68 : 70 + index * 10}%` }}
                    transition={{ duration: 1.2, delay: 0.2 }}
                  ></motion.div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Charts and Analytics Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <motion.div 
              className="card-elevated p-5 lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div className="flex justify-between mb-6">
                <div>
                  <h3 className="font-medium">Expenses vs. Savings</h3>
                  <p className="text-xs opacity-70">Last 6 months comparison</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[var(--secondary-400)]"></span>
                    <span className="text-xs">Expenses</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[var(--primary-400)]"></span>
                    <span className="text-xs">Savings</span>
                  </div>
                </div>
              </div>
              
              {/* Chart mockup */}
              <div className="h-60 relative">
                <div className="absolute inset-0">
                  {/* X axis labels */}
                  <div className="absolute bottom-0 inset-x-0 flex justify-between px-4">
                    {months.map((month) => (
                      <span key={month} className="text-xs opacity-50">{month}</span>
                    ))}
                  </div>
                  
                  {/* Y axis grid lines */}
                  {[0, 1, 2, 3, 4].map((line) => (
                    <div 
                      key={line} 
                      className="absolute w-full border-t border-[var(--primary-200)]/10" 
                      style={{ bottom: `${line * 25}%` }}
                    ></div>
                  ))}
                  
                  {/* Expense bars */}
                  <div className="absolute bottom-6 inset-x-0 px-4 flex justify-between items-end h-[calc(100%-2rem)]">
                    {expenseData.map((value, i) => (
                      <motion.div 
                        key={`expense-${i}`}
                        className="w-4 bg-gradient-to-t from-[var(--secondary-400)] to-[var(--secondary-300)] rounded-t-sm opacity-80"
                        style={{ height: `${(value / 2000) * 100}%` }}
                        initial={{ height: 0 }}
                        animate={{ height: `${(value / 2000) * 100}%` }}
                        transition={{ duration: 1, delay: 0.1 + i * 0.1 }}
                      ></motion.div>
                    ))}
                  </div>
                  
                  {/* Savings bars */}
                  <div className="absolute bottom-6 inset-x-0 px-[26px] flex justify-between items-end h-[calc(100%-2rem)]">
                    {savingsData.map((value, i) => (
                      <motion.div 
                        key={`savings-${i}`}
                        className="w-4 bg-gradient-to-t from-[var(--primary-500)] to-[var(--primary-300)] rounded-t-sm"
                        style={{ height: `${(value / 2000) * 100}%` }}
                        initial={{ height: 0 }}
                        animate={{ height: `${(value / 2000) * 100}%` }}
                        transition={{ duration: 1, delay: 0.2 + i * 0.1 }}
                      ></motion.div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-4">
                <button className="text-xs text-[var(--primary-500)] font-medium">Detailed Report</button>
                <div className="flex gap-1">
                  <button className="p-1.5 rounded-md bg-[var(--background-100)] hover:bg-[var(--background-200)]">
                    <ChevronLeft size={16} />
                  </button>
                  <button className="p-1.5 rounded-md bg-[var(--background-100)] hover:bg-[var(--background-200)]">
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="card-bordered p-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <div className="mb-4">
                <h3 className="font-medium">Spending Categories</h3>
                <p className="text-xs opacity-70">Where your money is going</p>
              </div>
              
              {/* Pie chart mockup */}
              <div className="relative h-48 w-48 mx-auto my-4">
                <div className="absolute inset-0 rounded-full border-8 border-[var(--background-200)]"></div>
                <motion.div 
                  className="absolute inset-0 rounded-full border-8 border-[var(--primary-400)]"
                  style={{ borderLeftColor: 'transparent', borderBottomColor: 'transparent' }}
                  initial={{ rotate: -90 }}
                  animate={{ rotate: 45 }}
                  transition={{ duration: 1, delay: 0.3 }}
                ></motion.div>
                <motion.div 
                  className="absolute inset-0 rounded-full border-8 border-[var(--secondary-400)]"
                  style={{ borderRightColor: 'transparent', borderBottomColor: 'transparent' }}
                  initial={{ rotate: -90 }}
                  animate={{ rotate: 0 }}
                  transition={{ duration: 1, delay: 0.4 }}
                ></motion.div>
                <motion.div 
                  className="absolute inset-0 rounded-full border-8 border-[var(--accent-400)]"
                  style={{ borderLeftColor: 'transparent', borderTopColor: 'transparent', borderRightColor: 'transparent' }}
                  initial={{ rotate: -90 }}
                  animate={{ rotate: 115 }}
                  transition={{ duration: 1, delay: 0.5 }}
                ></motion.div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-bold text-lg">$4,230</span>
                </div>
              </div>
              
              <div className="space-y-2 mt-6">
                {[
                  { name: "Housing", percentage: 35, amount: "$1,480", color: "bg-[var(--primary-400)]" },
                  { name: "Food", percentage: 25, amount: "$1,060", color: "bg-[var(--secondary-400)]" },
                  { name: "Entertainment", percentage: 15, amount: "$635", color: "bg-[var(--accent-400)]" },
                  { name: "Other", percentage: 25, amount: "$1,055", color: "bg-[var(--background-800)]" }
                ].map((category, index) => (
                  <div key={index} className="flex items-center justify-between p-2 hover:bg-[var(--background-100)] rounded-lg transition-colors">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                      <span className="text-sm">{category.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium">{category.amount}</span>
                      <span className="text-xs opacity-70 ml-2">{category.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
          
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Left Column - Savings Goals */}
            <motion.div 
              className="lg:col-span-2 order-2 lg:order-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <GoalsList initialGoals={mockSavingsGoals} />
            </motion.div>

            {/* Right Column - Monthly Summary & Gamification */}
            <div className="space-y-6 order-1 lg:order-2">
              <MonthlySummary data={mockMonthlySummary} />
              <GamificationPanel data={mockGamificationData} />
            </div>
          </div>
          
          {/* Recent Transactions */}
          <motion.div 
            className="mt-8 card-elevated p-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-medium">Recent Transactions</h3>
                <p className="text-xs opacity-70">Your latest financial activity</p>
              </div>
              <button className="text-sm text-[var(--primary-500)] font-medium">View All</button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[var(--primary-200)]/20">
                    <th className="text-left py-3 px-4 text-sm font-medium opacity-70">Transaction</th>
                    <th className="text-left py-3 px-4 text-sm font-medium opacity-70">Date</th>
                    <th className="text-left py-3 px-4 text-sm font-medium opacity-70">Category</th>
                    <th className="text-right py-3 px-4 text-sm font-medium opacity-70">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: "Spotify Premium", date: "Apr 15, 2025", category: "Entertainment", amount: "-$9.99", color: "text-red-500" },
                    { name: "Savings Deposit", date: "Apr 14, 2025", category: "Savings", amount: "+$200.00", color: "text-green-500" },
                    { name: "Grocery Store", date: "Apr 12, 2025", category: "Food", amount: "-$65.47", color: "text-red-500" },
                    { name: "Uber Ride", date: "Apr 10, 2025", category: "Transport", amount: "-$12.50", color: "text-red-500" },
                    { name: "Paycheck", date: "Apr 01, 2025", category: "Income", amount: "+$2,450.00", color: "text-green-500" }
                  ].map((transaction, index) => (
                    <motion.tr 
                      key={index} 
                      className="border-b border-[var(--primary-200)]/10 hover:bg-[var(--background-100)]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                    >
                      <td className="py-3 px-4">
                        <span className="text-sm font-medium">{transaction.name}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm opacity-70">{transaction.date}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-[var(--primary-100)]">{transaction.category}</span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className={`text-sm font-medium ${transaction.color}`}>{transaction.amount}</span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-4 text-center">
              <button className="text-[var(--primary-500)] text-sm hover:underline font-medium">Load more transactions</button>
            </div>
          </motion.div>
          
          {/* Financial Tips */}
          <div className="mt-8 mb-12">
            <h3 className="text-lg font-medium mb-4">Financial Tips</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  title: "50/30/20 Budgeting Rule",
                  description: "Allocate 50% to needs, 30% to wants, and 20% to savings and debt repayment.",
                  icon: <PieChart size={20} />,
                  variant: "elevated"
                },
                {
                  title: "Start Emergency Fund",
                  description: "Aim to save 3-6 months of expenses in an easily accessible account.",
                  icon: <DollarSign size={20} />,
                  variant: "bordered"
                },
                {
                  title: "Track Your Spending",
                  description: "Review your spending patterns to find opportunities to save more.",
                  icon: <BarChart3 size={20} />,
                  variant: "elevated"
                }
              ].map((tip, index) => (
                <motion.div 
                  key={index}
                  className={`${tip.variant === 'elevated' ? 'card-elevated' : 'card-bordered'} p-4 flex items-start gap-3`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="p-2.5 rounded-full bg-[var(--primary-100)] text-[var(--primary-600)] mt-0.5">
                    {tip.icon}
                  </div>
                  <div>
                    <h4 className="font-medium text-sm mb-1">{tip.title}</h4>
                    <p className="text-xs opacity-70">{tip.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Footer */}
          <footer className="border-t border-[var(--primary-200)]/20 pt-6 pb-8 text-center text-xs opacity-70">
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
