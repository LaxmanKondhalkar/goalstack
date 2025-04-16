'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { mockSavingsGoals, mockUserProfile } from '../data/mockData';
import GoalsList from '../components/GoalsList';
import AppLayout from '../components/AppLayout';
import { SavingsGoal } from '../types';
import { 
  Target, Filter, ArrowUp, ArrowDown, 
  CheckSquare, CircleDollarSign, Calendar,
  PieChart, X
} from 'lucide-react';

export default function GoalsPage() {
  const [goals] = useState<SavingsGoal[]>(mockSavingsGoals);
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState<'date' | 'progress' | 'amount'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [filterCategory, setFilterCategory] = useState<string | null>(null);

  // Calculate goal statistics
  const totalSaved = useMemo(() => {
    return goals.reduce((acc, goal) => acc + goal.currentAmount, 0);
  }, [goals]);

  const totalTarget = useMemo(() => {
    return goals.reduce((acc, goal) => acc + goal.targetAmount, 0);
  }, [goals]);

  const averageProgress = useMemo(() => {
    if (goals.length === 0) return 0;
    const progressSum = goals.reduce((acc, goal) => {
      return acc + (goal.currentAmount / goal.targetAmount) * 100;
    }, 0);
    return Math.round(progressSum / goals.length);
  }, [goals]);

  // Available categories
  const categories = useMemo(() => {
    return Array.from(new Set(goals.map(goal => goal.category)));
  }, [goals]);

  // Sort and filter goals
  const sortedAndFilteredGoals = useMemo(() => {
    const filteredGoals = filterCategory 
      ? goals.filter(goal => goal.category === filterCategory) 
      : goals;
    
    return filteredGoals.sort((a, b) => {
      if (sortBy === 'date') {
        return sortOrder === 'asc' 
          ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else if (sortBy === 'progress') {
        const progressA = a.currentAmount / a.targetAmount;
        const progressB = b.currentAmount / b.targetAmount;
        return sortOrder === 'asc' ? progressA - progressB : progressB - progressA;
      } else { // amount
        return sortOrder === 'asc' 
          ? a.targetAmount - b.targetAmount 
          : b.targetAmount - a.targetAmount;
      }
    });
  }, [goals, sortBy, sortOrder, filterCategory]);

  // Toggle sort order
  const toggleSortOrder = () => {
    setSortOrder(prevOrder => prevOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <AppLayout>
      <div className="p-6">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div className="flex items-center gap-3 mb-4 md:mb-0">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--primary-400)] to-[var(--primary-600)] flex items-center justify-center text-[var(--background-50)]">
              <Target size={20} />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Savings Goals</h1>
              <p className="text-sm opacity-70">Track your progress towards financial freedom</p>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <motion.button
              onClick={() => setFilterOpen(!filterOpen)}
              className={`flex items-center gap-2 p-2.5 rounded-lg ${filterOpen ? 'bg-[var(--primary-100)] text-[var(--primary-600)]' : 'bg-[var(--background-100)] hover:bg-[var(--background-200)]'} transition-colors`}
              whileTap={{ scale: 0.95 }}
            >
              <Filter size={16} />
              <span className="text-sm">Filter</span>
            </motion.button>
            
            <div className="flex items-center border border-[var(--primary-300)]/30 rounded-lg overflow-hidden">
              <button 
                onClick={() => setSortBy('date')}
                className={`py-2 px-3 text-sm ${sortBy === 'date' ? 'bg-gradient-to-r from-[var(--primary-400)] to-[var(--primary-500)] text-[var(--background-50)]' : 'hover:bg-[var(--background-100)]'}`}
              >
                Date
              </button>
              <button 
                onClick={() => setSortBy('progress')}
                className={`py-2 px-3 text-sm ${sortBy === 'progress' ? 'bg-gradient-to-r from-[var(--primary-400)] to-[var(--primary-500)] text-[var(--background-50)]' : 'hover:bg-[var(--background-100)]'}`}
              >
                Progress
              </button>
              <button 
                onClick={() => setSortBy('amount')}
                className={`py-2 px-3 text-sm ${sortBy === 'amount' ? 'bg-gradient-to-r from-[var(--primary-400)] to-[var(--primary-500)] text-[var(--background-50)]' : 'hover:bg-[var(--background-100)]'}`}
              >
                Amount
              </button>
            </div>
            
            <motion.button 
              onClick={toggleSortOrder}
              className="p-2.5 rounded-lg bg-[var(--background-100)] hover:bg-[var(--background-200)]"
              whileTap={{ scale: 0.95 }}
            >
              {sortOrder === 'asc' ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
            </motion.button>
          </div>
        </div>
        
        {/* Filters Panel */}
        <motion.div 
          className="mb-6 overflow-hidden"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: filterOpen ? 'auto' : 0, opacity: filterOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="card-bordered p-5 bg-[var(--background-50)]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Filter Goals</h3>
              <button 
                onClick={() => setFilterOpen(false)}
                className="p-1 rounded-full hover:bg-[var(--background-100)]"
              >
                <X size={16} />
              </button>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setFilterCategory(null)}
                className={`px-3 py-1.5 rounded-lg text-sm ${filterCategory === null ? 'bg-[var(--primary-100)] text-[var(--primary-600)]' : 'bg-[var(--background-100)] hover:bg-[var(--background-200)]'}`}
              >
                All Categories
              </button>
              
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setFilterCategory(category || null)}
                  className={`px-3 py-1.5 rounded-lg text-sm ${filterCategory === category ? 'bg-[var(--primary-100)] text-[var(--primary-600)]' : 'bg-[var(--background-100)] hover:bg-[var(--background-200)]'}`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
        
        {/* Goal Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div 
            className="card-elevated p-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            whileHover={{ y: -5 }}
          >
            <div className="flex justify-between items-center mb-3">
              <p className="text-sm opacity-70">Total Goals</p>
              <div className="w-8 h-8 rounded-full bg-[var(--background-100)] flex items-center justify-center text-[var(--primary-500)]">
                <Target size={16} />
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--primary-500)]">{goals.length}</h2>
            <p className="text-xs opacity-70 mt-2">Active savings goals</p>
          </motion.div>
          
          <motion.div 
            className="card-bordered p-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            whileHover={{ y: -5 }}
          >
            <div className="flex justify-between items-center mb-3">
              <p className="text-sm opacity-70">Average Progress</p>
              <div className="w-8 h-8 rounded-full bg-[var(--background-100)] flex items-center justify-center text-[var(--accent-500)]">
                <CheckSquare size={16} />
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--accent-500)]">{averageProgress}%</h2>
            <p className="text-xs opacity-70 mt-2">Across all goals</p>
            
            <div className="mt-3 h-2 bg-[var(--background-100)] rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-[var(--accent-400)] to-[var(--accent-300)]"
                initial={{ width: 0 }}
                animate={{ width: `${averageProgress}%` }}
                transition={{ duration: 1.2, delay: 0.3 }}
              ></motion.div>
            </div>
          </motion.div>
          
          <motion.div 
            className="card-elevated p-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            whileHover={{ y: -5 }}
          >
            <div className="flex justify-between items-center mb-3">
              <p className="text-sm opacity-70">Total Saved</p>
              <div className="w-8 h-8 rounded-full bg-[var(--background-100)] flex items-center justify-center text-[var(--secondary-500)]">
                <CircleDollarSign size={16} />
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--secondary-500)]">${(totalSaved / 1000).toFixed(1)}k</h2>
            <p className="text-xs opacity-70 mt-2">Of ${(totalTarget / 1000).toFixed(1)}k target</p>
            
            <div className="mt-3 h-2 bg-[var(--background-100)] rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-[var(--secondary-400)] to-[var(--secondary-300)]"
                initial={{ width: 0 }}
                animate={{ width: `${(totalSaved / totalTarget) * 100}%` }}
                transition={{ duration: 1.2, delay: 0.4 }}
              ></motion.div>
            </div>
          </motion.div>
          
          <motion.div 
            className="card-bordered p-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            whileHover={{ y: -5 }}
          >
            <div className="flex justify-between items-center mb-3">
              <p className="text-sm opacity-70">Monthly Budget</p>
              <div className="w-8 h-8 rounded-full bg-[var(--background-100)] flex items-center justify-center text-[var(--primary-500)]">
                <Calendar size={16} />
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--primary-500)]">${(mockUserProfile.monthlyBudget / 1000).toFixed(1)}k</h2>
            <p className="text-xs opacity-70 mt-2">Monthly allocation</p>
            
            <div className="mt-3 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[var(--primary-400)]"></div>
              <span className="text-xs">Budget utilization: 68%</span>
            </div>
          </motion.div>
        </div>
        
        {/* Category Distribution */}
        <motion.div 
          className="card-elevated p-5 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[var(--background-100)] flex items-center justify-center text-[var(--primary-500)]">
                <PieChart size={16} />
              </div>
              <h3 className="font-medium">Goal Categories</h3>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Chart visualization mockup */}
            <div className="md:col-span-1 flex flex-col gap-3">
              {Array.from(new Set(goals.map(goal => goal.category))).map((category, index) => {
                const categoryGoals = goals.filter(goal => goal.category === category);
                const categoryPercentage = Math.round((categoryGoals.length / goals.length) * 100);
                
                return (
                  <div key={category} className="flex items-center justify-between p-2 hover:bg-[var(--background-100)] rounded-lg transition-colors">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full bg-[var(--${index % 3 === 0 ? 'primary' : index % 3 === 1 ? 'secondary' : 'accent'}-400)]`}></div>
                      <span className="text-sm">{category}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs opacity-70">{categoryPercentage}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Bar chart visualization */}
            <div className="md:col-span-3 h-48 flex items-end justify-around px-4 border-b border-[var(--primary-200)]/20">
              {Array.from(new Set(goals.map(goal => goal.category))).map((category, index) => {
                const categoryGoals = goals.filter(goal => goal.category === category);
                const totalSaved = categoryGoals.reduce((acc, goal) => acc + goal.currentAmount, 0);
                const totalTarget = categoryGoals.reduce((acc, goal) => acc + goal.targetAmount, 0);
                const percentage = (totalSaved / totalTarget) * 100;
                
                return (
                  <div key={category} className="flex flex-col items-center gap-2">
                    <div className="text-xs opacity-70">{Math.round(percentage)}%</div>
                    <motion.div 
                      className={`w-16 rounded-t-lg bg-gradient-to-t from-[var(--${index % 3 === 0 ? 'primary' : index % 3 === 1 ? 'secondary' : 'accent'}-400)] to-[var(--${index % 3 === 0 ? 'primary' : index % 3 === 1 ? 'secondary' : 'accent'}-300)]`}
                      style={{ height: `${Math.max(percentage, 5)}%` }}
                      initial={{ height: 0 }}
                      animate={{ height: `${Math.max(percentage, 5)}%` }}
                      transition={{ duration: 1, delay: 0.1 + index * 0.1 }}
                    ></motion.div>
                    <div className="text-xs font-medium mt-1">{category}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
        
        {/* Goals List */}
        <GoalsList initialGoals={sortedAndFilteredGoals} />
      </div>
    </AppLayout>
  );
}