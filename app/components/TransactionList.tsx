'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Transaction } from '../types';
import { 
  ArrowDownLeft, 
  ArrowUpRight, 
  Filter, 
  ChevronDown, 
  Search, 
  Download,
  AlertCircle,
  Check,
  ChevronRight
} from 'lucide-react';

interface TransactionListProps {
  transactions: Transaction[];
  showAllLink?: boolean;
}

export default function TransactionList({ transactions, showAllLink = false }: TransactionListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [expandedTransaction, setExpandedTransaction] = useState<string | null>(null);

  // Extract unique categories
  const categories = useMemo(() => {
    const uniqueCategories = new Set<string>();
    transactions.forEach(t => uniqueCategories.add(t.category));
    return Array.from(uniqueCategories);
  }, [transactions]);

  // Apply filters
  const filteredTransactions = useMemo(() => {
    return transactions.filter(transaction => {
      // Apply search filter
      if (searchQuery && !transaction.description.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      // Apply category filter
      if (categoryFilter && transaction.category !== categoryFilter) {
        return false;
      }
      
      // Apply type filter
      if (typeFilter && transaction.type !== typeFilter) {
        return false;
      }
      
      return true;
    });
  }, [transactions, searchQuery, categoryFilter, typeFilter]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setCategoryFilter(null);
    setTypeFilter(null);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatAmount = (amount: number) => {
    const absAmount = Math.abs(amount);
    return `${amount < 0 ? '-' : '+'}$${absAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const getTransactionColor = (transaction: Transaction) => {
    if (transaction.type === 'income') {
      return 'text-green-500';
    } else if (transaction.type === 'expense') {
      return 'text-red-500';
    } else if (transaction.type === 'saving') {
      return 'text-[var(--primary-500)]';
    } else {
      return 'text-[var(--accent-500)]';
    }
  };

  const getTransactionIcon = (transaction: Transaction) => {
    if (transaction.type === 'income') {
      return <ArrowDownLeft className="w-4 h-4" />;
    } else {
      return <ArrowUpRight className="w-4 h-4" />;
    }
  };

  const toggleTransaction = (id: string) => {
    if (expandedTransaction === id) {
      setExpandedTransaction(null);
    } else {
      setExpandedTransaction(id);
    }
  };

  return (
    <div className="card-elevated">
      <div className="mb-4 md:mb-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-base md:text-lg font-semibold">Transactions</h3>
          
          <div className="flex gap-2 items-center">
            <div className="relative flex-grow">
              <input 
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="p-1.5 md:p-2 pr-7 md:pr-8 text-xs md:text-sm rounded-md border border-[var(--primary-200)]/30 bg-[var(--background-50)] w-full"
              />
              <Search className="absolute right-2 top-1.5 md:top-2 opacity-50 w-3.5 h-3.5 md:w-4 md:h-4" />
            </div>
            
            <motion.button
              onClick={() => setShowFilters(!showFilters)}
              className={`p-1.5 md:p-2 rounded-md ${showFilters ? 'bg-[var(--primary-100)]' : 'bg-[var(--background-100)]'}`}
              whileTap={{ scale: 0.95 }}
              aria-label="Filter transactions"
            >
              <Filter size={16} className="md:hidden" />
              <Filter size={18} className="hidden md:block" />
            </motion.button>
            
            <motion.button
              className="p-1.5 md:p-2 rounded-md bg-[var(--background-100)]"
              whileTap={{ scale: 0.95 }}
              title="Export transactions"
              aria-label="Export transactions"
            >
              <Download size={16} className="md:hidden" />
              <Download size={18} className="hidden md:block" />
            </motion.button>
          </div>
        </div>
        
        <AnimatePresence>
          {showFilters && (
            <motion.div 
              className="mt-3 md:mt-4 p-3 md:p-4 rounded-lg bg-[var(--background-100)] grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div>
                <label className="block text-xs font-medium mb-1">Category</label>
                <div className="relative">
                  <select
                    value={categoryFilter || ''}
                    onChange={(e) => setCategoryFilter(e.target.value || null)}
                    className="appearance-none w-full p-1.5 md:p-2 rounded-md border border-[var(--primary-200)]/30 bg-[var(--background-50)] text-xs md:text-sm"
                  >
                    <option value="">All Categories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-2 top-2 opacity-50" />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-medium mb-1">Type</label>
                <div className="relative">
                  <select
                    value={typeFilter || ''}
                    onChange={(e) => setTypeFilter(e.target.value || null)}
                    className="appearance-none w-full p-1.5 md:p-2 rounded-md border border-[var(--primary-200)]/30 bg-[var(--background-50)] text-xs md:text-sm"
                  >
                    <option value="">All Types</option>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                    <option value="saving">Saving</option>
                    <option value="transfer">Transfer</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-2 top-2 opacity-50" />
                </div>
              </div>
              
              <div className="flex items-end">
                <button
                  onClick={handleClearFilters}
                  className="p-1.5 md:p-2 text-xs md:text-sm w-full bg-[var(--background-50)] border border-[var(--primary-200)]/30 rounded-md hover:bg-[var(--primary-100)]"
                >
                  Clear Filters
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {filteredTransactions.length > 0 ? (
        <>
          {/* Desktop table view (hidden on mobile) */}
          <div className="hidden md:block overflow-x-auto">
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
                {filteredTransactions.map((transaction) => (
                  <motion.tr 
                    key={transaction.id} 
                    className="border-b border-[var(--primary-200)]/10 hover:bg-[var(--background-100)]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ backgroundColor: "rgba(var(--primary-rgb), 0.05)" }}
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <div className={`p-1.5 rounded-full ${transaction.type === 'income' ? 'bg-green-100' : transaction.type === 'expense' ? 'bg-red-100' : 'bg-[var(--primary-100)]'} mr-3`}>
                          <div className={`${getTransactionColor(transaction)}`}>
                            {getTransactionIcon(transaction)}
                          </div>
                        </div>
                        <div>
                          <p className="font-medium text-sm">{transaction.description}</p>
                          <div className="flex items-center gap-1 mt-0.5">
                            {transaction.recurring && (
                              <div className="flex items-center text-[var(--primary-500)] bg-[var(--primary-100)] rounded-full px-2 py-0.5 text-xs">
                                <Check className="w-3 h-3 mr-1" /> 
                                <span>Recurring</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm opacity-70">{formatDate(transaction.date)}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-[var(--background-100)]">{transaction.category}</span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className={`text-sm font-medium ${getTransactionColor(transaction)}`}>
                        {formatAmount(transaction.amount)}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile card view (shown only on mobile) */}
          <div className="md:hidden space-y-3">
            {filteredTransactions.map((transaction) => (
              <motion.div
                key={transaction.id}
                className="bg-[var(--background-50)] border border-[var(--primary-200)]/20 rounded-lg overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div 
                  className="p-3 flex items-center justify-between cursor-pointer"
                  onClick={() => toggleTransaction(transaction.id)}
                >
                  <div className="flex items-center">
                    <div className={`p-1.5 rounded-full ${transaction.type === 'income' ? 'bg-green-100' : transaction.type === 'expense' ? 'bg-red-100' : 'bg-[var(--primary-100)]'} mr-2.5`}>
                      <div className={`${getTransactionColor(transaction)}`}>
                        {getTransactionIcon(transaction)}
                      </div>
                    </div>
                    <div>
                      <p className="font-medium text-sm">{transaction.description}</p>
                      <p className="text-xs opacity-70">{formatDate(transaction.date)}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className={`text-sm font-medium ${getTransactionColor(transaction)}`}>
                      {formatAmount(transaction.amount)}
                    </span>
                    <motion.div
                      animate={{ rotate: expandedTransaction === transaction.id ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronRight size={16} className="opacity-60" />
                    </motion.div>
                  </div>
                </div>

                <AnimatePresence>
                  {expandedTransaction === transaction.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-3 pb-3 border-t border-[var(--primary-200)]/10"
                    >
                      <div className="pt-2 space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span className="opacity-70">Category</span>
                          <span className="font-medium px-2 py-0.5 rounded-full bg-[var(--background-100)]">{transaction.category}</span>
                        </div>
                        {transaction.recurring && (
                          <div className="flex justify-between">
                            <span className="opacity-70">Recurring</span>
                            <div className="flex items-center text-[var(--primary-500)]">
                              <Check className="w-3 h-3 mr-1" /> 
                              <span>Yes</span>
                            </div>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="opacity-70">Type</span>
                          <span className="capitalize">{transaction.type}</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
          
          {showAllLink && (
            <div className="mt-4 text-center">
              <a href="/transactions" className="text-[var(--primary-500)] text-sm hover:underline font-medium">View All Transactions</a>
            </div>
          )}
        </>
      ) : (
        <div className="py-8 md:py-12 text-center">
          <div className="flex justify-center mb-3">
            <AlertCircle size={32} className="md:hidden text-[var(--primary-400)] opacity-50" />
            <AlertCircle size={48} className="hidden md:block text-[var(--primary-400)] opacity-50" />
          </div>
          <h4 className="font-medium mb-1">No transactions found</h4>
          <p className="text-sm opacity-70">Try adjusting your search or filter criteria</p>
          {(searchQuery || categoryFilter || typeFilter) && (
            <button 
              onClick={handleClearFilters}
              className="mt-4 text-sm text-[var(--primary-500)] py-1 px-3 bg-[var(--primary-100)] rounded-md"
            >
              Clear All Filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}