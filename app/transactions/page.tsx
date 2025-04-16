'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import AppLayout from '../components/AppLayout';
import TransactionList from '../components/TransactionList';
import { mockTransactions, mockSavingsGoals, getTransactionsByGoal } from '../data/mockData';
import { Transaction, TimeRange } from '../types';
import { PlusCircle, Calendar, ArrowDownCircle, ArrowUpCircle, CreditCard, Clock, RefreshCw } from 'lucide-react';

export default function TransactionsPage() {
  const [timeRange, setTimeRange] = useState<TimeRange>('month');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  // Get all transactions for the current time range
  const getFilteredTransactions = () => {
    const now = new Date();
    let startDate = new Date();
    
    switch (timeRange) {
      case 'week':
        startDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        startDate.setMonth(now.getMonth() - 1);
        break;
      case 'quarter':
        startDate.setMonth(now.getMonth() - 3);
        break;
      case 'year':
        startDate.setFullYear(now.getFullYear() - 1);
        break;
    }
    
    return mockTransactions.filter(t => {
      const transactionDate = new Date(t.date);
      return transactionDate >= startDate && transactionDate <= now;
    });
  };

  // Get statistics for the filtered transactions
  const getTransactionStatistics = () => {
    const filtered = getFilteredTransactions();
    
    const income = filtered
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
      
    const expenses = filtered
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);
      
    const savings = filtered
      .filter(t => t.type === 'saving')
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);
      
    const totalTransactions = filtered.length;
    
    return { income, expenses, savings, totalTransactions };
  };

  const stats = getTransactionStatistics();

  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Transactions</h1>
        <p className="text-sm opacity-70">View and manage your financial transactions</p>
      </div>

      {/* Time filter tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center border border-[var(--primary-300)]/30 rounded-lg overflow-hidden shadow-sm">
          {(['week', 'month', 'quarter', 'year'] as TimeRange[]).map((range) => (
            <button 
              key={range}
              onClick={() => setTimeRange(range)}
              className={`py-1.5 px-3 text-sm font-medium ${
                timeRange === range 
                  ? 'bg-gradient-to-r from-[var(--primary-400)] to-[var(--primary-500)] text-[var(--background-50)]' 
                  : 'hover:bg-[var(--background-100)]'
              }`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>

        <motion.button 
          className="flex items-center gap-2 py-2 px-4 rounded-md bg-[var(--primary-500)] text-white shadow-sm"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <PlusCircle size={16} />
          <span className="font-medium">Add Transaction</span>
        </motion.button>
      </div>

      {/* Quick summary stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div 
          className="card-elevated p-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          whileHover={{ y: -5 }}
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-full bg-green-100 text-green-600">
              <ArrowDownCircle size={20} />
            </div>
            <div>
              <p className="text-sm opacity-70">Income</p>
              <h2 className="text-xl md:text-2xl font-bold text-green-600">${stats.income.toLocaleString()}</h2>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="card-bordered p-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          whileHover={{ y: -5 }}
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-full bg-red-100 text-red-600">
              <ArrowUpCircle size={20} />
            </div>
            <div>
              <p className="text-sm opacity-70">Expenses</p>
              <h2 className="text-xl md:text-2xl font-bold text-red-500">${stats.expenses.toLocaleString()}</h2>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="card-elevated p-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          whileHover={{ y: -5 }}
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-full bg-[var(--primary-100)] text-[var(--primary-600)]">
              <CreditCard size={20} />
            </div>
            <div>
              <p className="text-sm opacity-70">Total Savings</p>
              <h2 className="text-xl md:text-2xl font-bold text-[var(--primary-500)]">${stats.savings.toLocaleString()}</h2>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="card-bordered p-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          whileHover={{ y: -5 }}
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-full bg-[var(--accent-100)] text-[var(--accent-600)]">
              <Clock size={20} />
            </div>
            <div>
              <p className="text-sm opacity-70">Transactions</p>
              <h2 className="text-xl md:text-2xl font-bold text-[var(--accent-500)]">{stats.totalTransactions}</h2>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recurring transactions */}
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4">Recurring Transactions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {mockTransactions
            .filter(t => t.recurring)
            .slice(0, 4)
            .map((transaction) => (
              <motion.div 
                key={transaction.id}
                className="card-bordered p-4 flex items-center justify-between"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -3 }}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${
                    transaction.type === 'income' 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-red-100 text-red-600'
                  }`}>
                    <RefreshCw size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{transaction.description}</p>
                    <p className="text-xs opacity-70">{transaction.category}</p>
                  </div>
                </div>
                <span className={`text-sm font-medium ${
                  transaction.type === 'income' ? 'text-green-600' : 'text-red-500'
                }`}>
                  {transaction.type === 'income' ? '+' : '-'}${Math.abs(transaction.amount).toLocaleString()}
                </span>
              </motion.div>
            ))}
        </div>
      </div>

      {/* Transactions by goal category tabs */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-4">Transactions by Goal</h3>
        <div className="flex flex-wrap gap-2 mb-4 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveCategory(null)}
            className={`py-1 px-3 text-sm rounded-full ${
              activeCategory === null 
                ? 'bg-[var(--primary-500)] text-white' 
                : 'bg-[var(--background-100)]'
            }`}
          >
            All
          </button>
          {mockSavingsGoals.map((goal) => (
            <button
              key={goal.id}
              onClick={() => setActiveCategory(goal.id)}
              className={`py-1 px-3 text-sm rounded-full flex items-center gap-1 ${
                activeCategory === goal.id 
                  ? 'bg-[var(--primary-500)] text-white' 
                  : 'bg-[var(--background-100)]'
              }`}
            >
              <span>{goal.icon}</span>
              <span>{goal.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Transaction list */}
      <TransactionList 
        transactions={
          activeCategory
            ? getTransactionsByGoal(activeCategory)
            : getFilteredTransactions()
        }
      />
    </AppLayout>
  );
}