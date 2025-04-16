'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SavingsGrowth } from '../../types';
import { ChevronLeft, ChevronRight, TrendingUp, Save } from 'lucide-react';

interface SavingsChartProps {
  data: SavingsGrowth[];
}

export default function SavingsChart({ data }: SavingsChartProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-80 bg-[var(--background-100)] animate-pulse rounded-lg"></div>;
  }

  // Format dates for display
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  // Calculate chart metrics
  const maxAmount = Math.max(...data.map(item => item.amount)) * 1.1;
  const totalGrowth = data.length > 1
    ? ((data[data.length - 1].amount - data[0].amount) / data[0].amount) * 100
    : 0;

  return (
    <div className="card-elevated p-5">
      <div className="flex justify-between mb-6">
        <div>
          <h3 className="font-medium">Savings Growth</h3>
          <div className="flex items-center gap-2 mt-1">
            <div className="text-xs py-1 px-2 bg-green-100 text-green-700 rounded-full flex items-center">
              <TrendingUp size={12} className="mr-1" />
              <span>{totalGrowth.toFixed(1)}% growth</span>
            </div>
            <p className="text-xs opacity-70">Last {data.length} periods</p>
          </div>
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
        <div className="absolute inset-0">
          {/* Y axis grid lines */}
          {[0, 1, 2, 3, 4].map((line) => (
            <div 
              key={line} 
              className="absolute w-full border-t border-[var(--primary-200)]/10" 
              style={{ bottom: `${line * 25}%` }}
            >
              <span className="absolute -left-6 -top-2 text-xs opacity-50">
                ${Math.round((maxAmount * line) / 4).toLocaleString()}
              </span>
            </div>
          ))}
          
          {/* X axis labels */}
          <div className="absolute bottom-0 inset-x-0 flex justify-between px-4">
            {data.map((item, index) => (
              <span key={index} className="text-xs opacity-50">
                {formatDate(item.date)}
              </span>
            ))}
          </div>
          
          {/* Line chart */}
          <div className="absolute inset-0 pt-4 pb-8">
            <svg className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="savingsGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="var(--primary-500)" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="var(--primary-500)" stopOpacity="0" />
                </linearGradient>
              </defs>
              
              {/* Area under the line */}
              <motion.path
                d={`
                  M0,${100 - (data[0].amount / maxAmount) * 100}
                  ${data.map((item, index) => {
                    const x = (index / (data.length - 1)) * 100;
                    const y = 100 - (item.amount / maxAmount) * 100;
                    return `L${x},${y}`;
                  }).join(' ')}
                  L100,100 L0,100 Z
                `}
                fill="url(#savingsGradient)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              />
              
              {/* Line */}
              <motion.path
                d={`
                  M0,${100 - (data[0].amount / maxAmount) * 100}
                  ${data.map((item, index) => {
                    const x = (index / (data.length - 1)) * 100;
                    const y = 100 - (item.amount / maxAmount) * 100;
                    return `L${x},${y}`;
                  }).join(' ')}
                `}
                stroke="var(--primary-500)"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5 }}
              />
              
              {/* Data points */}
              {data.map((item, index) => {
                const x = (index / (data.length - 1)) * 100;
                const y = 100 - (item.amount / maxAmount) * 100;
                
                return (
                  <motion.circle
                    key={index}
                    cx={`${x}%`}
                    cy={`${y}%`}
                    r="4"
                    fill="var(--background-50)"
                    stroke="var(--primary-500)"
                    strokeWidth="2"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                  />
                );
              })}
            </svg>
          </div>
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-[var(--primary-200)]/10 grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs opacity-70">Current Savings</p>
          <p className="text-xl font-semibold">${data[data.length - 1].amount.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs opacity-70">Monthly Goal</p>
          <div className="flex items-center gap-2">
            <Save size={16} className="text-[var(--primary-500)]" />
            <p className="text-xl font-semibold">$7,000</p>
          </div>
        </div>
      </div>
    </div>
  );
}