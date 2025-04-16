'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MonthlyData } from '../../types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface MonthlyComparisonChartProps {
  data: MonthlyData[];
}

export default function MonthlyComparisonChart({ data }: MonthlyComparisonChartProps) {
  const [mounted, setMounted] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<MonthlyData | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-80 bg-[var(--background-100)] animate-pulse rounded-lg"></div>;
  }

  // Calculate highest value for scaling
  const maxValue = Math.max(
    ...data.flatMap(item => [item.income, item.expenses, item.savings])
  ) * 1.1;

  return (
    <div className="card-elevated p-5">
      <div className="flex justify-between mb-6">
        <div>
          <h3 className="font-medium">Income vs. Expenses</h3>
          <p className="text-xs opacity-70">{data.length} month comparison</p>
        </div>
        <div className="flex items-center gap-2">
          <motion.button 
            className="p-1.5 rounded-md bg-[var(--background-100)]"
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft size={16} />
          </motion.button>
          <motion.button 
            className="p-1.5 rounded-md bg-[var(--background-100)]"
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight size={16} />
          </motion.button>
        </div>
      </div>
      
      <div className="h-64 relative">
        <div className="absolute inset-0 pl-8"> {/* Added left padding */}
          {/* Y axis grid lines */}
          {[0, 1, 2, 3, 4].map((line) => (
            <div 
              key={line} 
              className="absolute w-full border-t border-[var(--primary-200)]/10" 
              style={{ bottom: `${line * 25}%` }}
            >
              <span className="absolute -translate-x-full -ml-2 -top-2 text-xs opacity-50">
                ${Math.round((maxValue * line) / 4).toLocaleString()}
              </span>
            </div>
          ))}
          
          {/* X axis labels */}
          <div className="absolute bottom-0 inset-x-0 flex justify-between px-6">
            {data.map((item, index) => (
              <span key={index} className="text-xs opacity-70 transform -rotate-12">
                {item.month}
              </span>
            ))}
          </div>
          
          {/* Bar chart */}
          <div className="absolute inset-x-0 bottom-6 top-4 flex items-end justify-between px-3">
            {data.map((month, index) => {
              const incomeHeight = (month.income / maxValue) * 100;
              const expensesHeight = (month.expenses / maxValue) * 100;
              const savingsHeight = (month.savings / maxValue) * 100;
              
              return (
                <div 
                  key={index} 
                  className="flex items-end justify-center gap-1 w-full"
                  onMouseEnter={() => setSelectedMonth(month)}
                  onMouseLeave={() => setSelectedMonth(null)}
                >
                  <motion.div
                    className="w-5 bg-green-500 opacity-80 rounded-t-sm"
                    style={{ height: `${incomeHeight}%` }}
                    initial={{ height: 0 }}
                    animate={{ height: `${incomeHeight}%` }}
                    transition={{ duration: 0.8, delay: 0.1 + index * 0.05 }}
                    whileHover={{ opacity: 1 }}
                  />
                  <motion.div
                    className="w-5 bg-red-500 opacity-80 rounded-t-sm"
                    style={{ height: `${expensesHeight}%` }}
                    initial={{ height: 0 }}
                    animate={{ height: `${expensesHeight}%` }}
                    transition={{ duration: 0.8, delay: 0.2 + index * 0.05 }}
                    whileHover={{ opacity: 1 }}
                  />
                  <motion.div
                    className="w-5 bg-blue-500 opacity-80 rounded-t-sm"
                    style={{ height: `${savingsHeight}%` }}
                    initial={{ height: 0 }}
                    animate={{ height: `${savingsHeight}%` }}
                    transition={{ duration: 0.8, delay: 0.3 + index * 0.05 }}
                    whileHover={{ opacity: 1 }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      <div className="mt-4 flex items-center justify-center gap-6">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-green-500"></span>
          <span className="text-xs">Income</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500"></span>
          <span className="text-xs">Expenses</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-blue-500"></span>
          <span className="text-xs">Savings</span>
        </div>
      </div>
      
      {selectedMonth && (
        <motion.div 
          className="mt-4 p-3 rounded-lg bg-[var(--background-100)] grid grid-cols-3 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <p className="text-xs opacity-70">Income</p>
            <p className="font-semibold text-green-600">${selectedMonth.income.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs opacity-70">Expenses</p>
            <p className="font-semibold text-red-500">${selectedMonth.expenses.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs opacity-70">Savings</p>
            <p className="font-semibold text-blue-600">${selectedMonth.savings.toLocaleString()}</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}