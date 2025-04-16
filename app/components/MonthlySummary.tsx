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
        <div className="flex items-center">
          <Calendar className="mr-2 text-[var(--primary-500)]" size={18} />
          <h2 className="text-lg sm:text-xl font-semibold text-[var(--text)]">{month} {year}</h2>
        </div>
        <motion.div whileHover={{ rotate: 10 }} transition={{ duration: 0.2 }}>
          <PieChart size={20} className="text-[var(--accent-500)]" />
        </motion.div>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {/* Income */}
        <motion.div 
          className="p-3 rounded-lg flex items-center bg-[var(--primary-100)]"
          whileHover={{ scale: 1.02 }}
        >
          <div className="p-2 rounded-full mr-3 bg-[var(--primary-200)]">
            <ArrowUpCircle size={16} className="text-[var(--primary-600)]" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-[var(--text)]/70">Income</p>
            <p className="text-sm sm:text-base font-semibold text-[var(--text)]">${income.toLocaleString()}</p>
          </div>
        </motion.div>
        
        {/* Expenses */}
        <motion.div 
          className="p-3 rounded-lg flex items-center bg-[var(--secondary-100)]"
          whileHover={{ scale: 1.02 }}
        >
          <div className="p-2 rounded-full mr-3 bg-[var(--secondary-200)]">
            <ArrowDownCircle size={16} className="text-[var(--secondary-600)]" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-[var(--text)]/70">Expenses</p>
            <p className="text-sm sm:text-base font-semibold text-[var(--text)]">${expenses.toLocaleString()}</p>
          </div>
        </motion.div>
        
        {/* Savings */}
        <motion.div 
          className="p-3 rounded-lg flex items-center bg-[var(--accent-100)]"
          whileHover={{ scale: 1.02 }}
        >
          <div className="p-2 rounded-full mr-3 bg-[var(--accent-200)]">
            <PiggyBank size={16} className="text-[var(--accent-600)]" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-[var(--text)]/70">Savings</p>
            <p className="text-sm sm:text-base font-semibold text-[var(--text)]">${savings.toLocaleString()}</p>
          </div>
        </motion.div>
      </div>
      
      {/* Savings Rate */}
      <div className="mt-4">
        <div className="flex justify-between items-center mb-1">
          <p className="text-xs text-[var(--text)]/70">Savings Rate</p>
          <p className="text-xs font-medium text-[var(--accent-600)]">{savingsPercentage}%</p>
        </div>
        <div className="w-full h-2 bg-[var(--background-200)] rounded-full">
          <motion.div 
            className="h-full rounded-full bg-[var(--accent-500)]"
            style={{ width: `${savingsPercentage}%` }}
            initial={{ width: 0 }}
            animate={{ width: `${savingsPercentage}%` }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        </div>
      </div>
    </motion.div>
  );
}