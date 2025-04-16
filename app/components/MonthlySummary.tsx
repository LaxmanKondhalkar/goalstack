'use client';

import { PieChart, Calendar, DollarSign, ArrowUpCircle, ArrowDownCircle, PiggyBank } from 'lucide-react';
import { MonthlySummary as MonthlySummaryType } from '../types';
import { motion } from 'framer-motion';

interface MonthlySummaryProps {
  data: MonthlySummaryType;
}

export default function MonthlySummary({ data }: MonthlySummaryProps) {
  const { income, expenses, savings, month, year } = data;
  
  const savingsPercentage = Math.round((savings / income) * 100);
  
  return (
    <motion.div 
      className="card border border-text/5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex itemscenter">
          <Calendar className="mr-2" size={18} style={{ color: 'var(--primary)' }} />
          <h2 className="text-lg sm:text-xl font-semibold">{month} {year}</h2>
        </div>
        <motion.div whileHover={{ rotate: 10 }} transition={{ duration: 0.2 }}>
          <PieChart size={20} style={{ color: 'var(--accent)' }} />
        </motion.div>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {/* Income */}
        <motion.div 
          className="p-3 rounded-lg flex items-center"
          whileHover={{ scale: 1.02 }}
          style={{ background: 'var(--primary)', opacity: 0.1 }}
        >
          <div className="p-2 rounded-full mr-3" style={{ background: 'var(--primary)', opacity: 0.2 }}>
            <ArrowUpCircle size={16} style={{ color: 'var(--primary)' }} />
          </div>
          <div className="flex-1">
            <p className="text-xs opacity-70">Income</p>
            <p className="text-sm sm:text-base font-semibold">${income.toLocaleString()}</p>
          </div>
        </motion.div>
        
        {/* Expenses */}
        <motion.div 
          className="p-3 rounded-lg flex items-center"
          whileHover={{ scale: 1.02 }}
          style={{ background: 'var(--secondary)', opacity: 0.1 }}
        >
          <div className="p-2 rounded-full mr-3" style={{ background: 'var(--secondary)', opacity: 0.2 }}>
            <ArrowDownCircle size={16} style={{ color: 'var(--secondary)' }} />
          </div>
          <div className="flex-1">
            <p className="text-xs opacity-70">Expenses</p>
            <p className="text-sm sm:text-base font-semibold">${expenses.toLocaleString()}</p>
          </div>
        </motion.div>
        
        {/* Savings */}
        <motion.div 
          className="p-3 rounded-lg flex items-center"
          whileHover={{ scale: 1.02 }}
          style={{ background: 'var(--accent)', opacity: 0.1 }}
        >
          <div className="p-2 rounded-full mr-3" style={{ background: 'var(--accent)', opacity: 0.2 }}>
            <PiggyBank size={16} style={{ color: 'var(--accent)' }} />
          </div>
          <div className="flex-1">
            <p className="text-xs opacity-70">Savings</p>
            <p className="text-sm sm:text-base font-semibold">${savings.toLocaleString()}</p>
          </div>
        </motion.div>
      </div>
      
      {/* Savings Rate */}
      <div className="mt-4">
        <div className="flex justify-between items-center mb-1">
          <p className="text-xs opacity-70">Savings Rate</p>
          <p className="text-xs font-medium">{savingsPercentage}%</p>
        </div>
        <div className="w-full h-2 bg-text/10 rounded-full">
          <motion.div 
            className="h-full rounded-full"
            style={{ background: 'var(--accent)', width: `${savingsPercentage}%` }}
            initial={{ width: 0 }}
            animate={{ width: `${savingsPercentage}%` }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        </div>
      </div>
    </motion.div>
  );
}