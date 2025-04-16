'use client';

import { useState, useEffect } from 'react';
import { 
  Search, CircleDollarSign, ArrowDownCircle, 
  ArrowUpCircle 
} from 'lucide-react';
import AppLayout from '../components/AppLayout';
import TransactionList from '../components/TransactionList';
import { getTransactionsByDateRange, mockTransactions } from '../data/mockData';

export default function TransactionsPage() {
  // Date range state
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>(() => {
    const now = new Date();
    const startDate = new Date();
    startDate.setMonth(now.getMonth() - 1);
    
    return {
      start: startDate.toISOString().split('T')[0],
      end: now.toISOString().split('T')[0]
    };
  });
  
  // Filtered transactions
  const [transactions, setTransactions] = useState(mockTransactions);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  
  // Update transactions when date range or filters change
  useEffect(() => {
    let filtered = getTransactionsByDateRange(dateRange.start, dateRange.end);
    
    if (searchTerm) {
      filtered = filtered.filter(t => 
        t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (typeFilter) {
      filtered = filtered.filter(t => t.type === typeFilter);
    }
    
    setTransactions(filtered);
  }, [dateRange, searchTerm, typeFilter]);

  return (
    <AppLayout>
      <div className="p-6">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div className="flex items-center gap-3 mb-4 md:mb-0">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--secondary-400)] to-[var(--secondary-600)] flex items-center justify-center text-[var(--background-50)]">
              <CircleDollarSign size={20} />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Transactions</h1>
              <p className="text-sm opacity-70">Monitor your spending and saving activities</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {/* Search Input */}
            <div className="relative flex-grow md:max-w-xs">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search size={16} className="opacity-50" />
              </div>
              <input
                type="search"
                className="w-full py-2.5 pl-10 pr-4 border border-[var(--background-300)] rounded-lg focus:ring-2 focus:ring-[var(--secondary-300)] focus:border-transparent bg-[var(--background-50)]"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Date Range Picker */}
            <div className="flex items-center gap-2">
              <input
                type="date"
                className="py-2 px-3 border border-[var(--background-300)] rounded-lg bg-[var(--background-50)]"
                value={dateRange.start}
                onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
              />
              <span className="text-sm opacity-50">to</span>
              <input
                type="date"
                className="py-2 px-3 border border-[var(--background-300)] rounded-lg bg-[var(--background-50)]"
                value={dateRange.end}
                onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
              />
            </div>
          </div>
        </div>
        
        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            className={`px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors ${
              typeFilter === null 
                ? 'bg-[var(--primary-100)] text-[var(--primary-600)]' 
                : 'bg-[var(--background-100)] hover:bg-[var(--background-200)]'
            }`}
            onClick={() => setTypeFilter(null)}
          >
            All
          </button>
          <button
            className={`px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors ${
              typeFilter === 'expense' 
                ? 'bg-[var(--error-100)] text-[var(--error-600)]' 
                : 'bg-[var(--background-100)] hover:bg-[var(--background-200)]'
            }`}
            onClick={() => setTypeFilter('expense')}
          >
            <ArrowUpCircle size={16} />
            Expenses
          </button>
          <button
            className={`px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors ${
              typeFilter === 'income' 
                ? 'bg-[var(--success-100)] text-[var(--success-600)]' 
                : 'bg-[var(--background-100)] hover:bg-[var(--background-200)]'
            }`}
            onClick={() => setTypeFilter('income')}
          >
            <ArrowDownCircle size={16} />
            Income
          </button>
          <button
            className={`px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors ${
              typeFilter === 'saving' 
                ? 'bg-[var(--secondary-100)] text-[var(--secondary-600)]' 
                : 'bg-[var(--background-100)] hover:bg-[var(--background-200)]'
            }`}
            onClick={() => setTypeFilter('saving')}
          >
            Savings
          </button>
        </div>
        
        {/* Transactions List */}
        <TransactionList transactions={transactions} />
      </div>
    </AppLayout>
  );
}