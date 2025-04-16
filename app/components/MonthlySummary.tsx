'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { MonthlySummary as MonthlySummaryType } from '../types';

interface MonthlySummaryProps {
  data: MonthlySummaryType;
}

export default function MonthlySummary({ data }: MonthlySummaryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Prepare data for pie chart
  const pieData = [
    { name: 'Expenses', value: data.expenses, color: '#4f46e5' },
    { name: 'Savings', value: data.savings, color: '#22c55e' },
  ];

  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const statVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: i * 0.1 }
    })
  };

  return (
    <motion.div 
      className="card bg-white"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Monthly Summary</h2>
        <span className="text-sm font-medium text-gray-500">{data.month} {data.year}</span>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <motion.div 
          className="bg-blue-50 p-3 rounded-lg"
          variants={statVariants}
          custom={0}
          initial="hidden"
          animate="visible"
        >
          <p className="text-xs text-blue-600 font-medium">Income</p>
          <p className="text-lg font-bold text-gray-800">₹{data.income.toLocaleString()}</p>
        </motion.div>
        
        <motion.div 
          className="bg-indigo-50 p-3 rounded-lg"
          variants={statVariants}
          custom={1}
          initial="hidden"
          animate="visible"
        >
          <p className="text-xs text-indigo-600 font-medium">Expenses</p>
          <p className="text-lg font-bold text-gray-800">₹{data.expenses.toLocaleString()}</p>
        </motion.div>
        
        <motion.div 
          className="bg-green-50 p-3 rounded-lg"
          variants={statVariants}
          custom={2}
          initial="hidden"
          animate="visible"
        >
          <p className="text-xs text-green-600 font-medium">Savings</p>
          <p className="text-lg font-bold text-gray-800">₹{data.savings.toLocaleString()}</p>
        </motion.div>
      </div>

      {/* Pie Chart */}
      <motion.div 
        className="h-48"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
              onMouseEnter={(_, index) => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
              animationBegin={300}
              animationDuration={800}
            >
              {pieData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color} 
                  opacity={activeIndex === null || activeIndex === index ? 1 : 0.7}
                  stroke="#fff"
                  strokeWidth={1}
                />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: number) => [`₹${value.toLocaleString()}`, undefined]}
            />
          </PieChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Savings Rate */}
      <motion.div 
        className="mt-4 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-sm text-gray-500">Savings Rate</p>
        <p className="text-2xl font-bold text-indigo-600">
          {Math.round((data.savings / data.income) * 100)}%
        </p>
      </motion.div>
    </motion.div>
  );
}