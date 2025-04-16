'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CategorySplit } from '../../types';

interface CategoryPieChartProps {
  data: CategorySplit[];
}

export default function CategoryPieChart({ data }: CategoryPieChartProps) {
  const [mounted, setMounted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategorySplit | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-80 bg-[var(--background-100)] animate-pulse rounded-lg"></div>;
  }

  const total = data.reduce((sum, category) => sum + category.amount, 0);

  // Sort categories by percentage (highest first)
  const sortedData = [...data].sort((a, b) => b.percentage - a.percentage);

  // Calculate the SVG coordinates for the pie chart
  const createPieSegment = (
    startPercent: number,
    endPercent: number,
    radius = 80
  ) => {
    // Convert percentage to radians
    const startAngle = (startPercent / 100) * Math.PI * 2 - Math.PI / 2;
    const endAngle = (endPercent / 100) * Math.PI * 2 - Math.PI / 2;

    // Calculate points
    const startX = 100 + radius * Math.cos(startAngle);
    const startY = 100 + radius * Math.sin(startAngle);
    const endX = 100 + radius * Math.cos(endAngle);
    const endY = 100 + radius * Math.sin(endAngle);

    // Create the arc path
    // For a complete circle, we need to use 2 arcs
    const largeArcFlag = endPercent - startPercent > 50 ? 1 : 0;
    const pathData = [
      `M 100 100`,
      `L ${startX} ${startY}`,
      `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`,
      'Z'
    ].join(' ');

    return pathData;
  };

  // Calculate each segment's start and end percentage
  const segments = sortedData.map((category, index) => {
    const previousSum = sortedData
      .slice(0, index)
      .reduce((sum, cat) => sum + cat.percentage, 0);
    
    return {
      ...category,
      startPercent: previousSum,
      endPercent: previousSum + category.percentage
    };
  });

  return (
    <div className="card-elevated p-5">
      <div className="flex justify-between mb-6">
        <div className="mb-4">
          <h3 className="font-medium">Spending Categories</h3>
          <p className="text-xs opacity-70">Where your money is going</p>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row items-center px-4"> {/* Added horizontal padding */}
        <div className="relative w-40 h-40 md:w-48 md:h-48">
          <svg viewBox="0 0 200 200" className="transform -rotate-90">
            {segments.map((segment, index) => (
              <motion.path
                key={segment.category}
                d={createPieSegment(segment.startPercent, segment.endPercent)}
                fill={segment.color}
                stroke="var(--background-50)"
                strokeWidth="1"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                onMouseEnter={() => setSelectedCategory(segment)}
                onMouseLeave={() => setSelectedCategory(null)}
                whileHover={{ scale: 1.03 }}
                style={{ transformOrigin: 'center' }}
                className="cursor-pointer"
              />
            ))}
            {/* Inner circle for donut effect */}
            <circle cx="100" cy="100" r="40" fill="var(--background-50)" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <span className="font-bold text-lg">
                ${selectedCategory ? selectedCategory.amount.toLocaleString() : total.toLocaleString()}
              </span>
              <p className="text-xs opacity-70">
                {selectedCategory ? selectedCategory.category : 'Total'}
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-6 md:mt-0 md:ml-6 flex-1 space-y-3"> 
          {/* Added flex-1 to prevent content from overflowing */}
          {sortedData.map((category) => (
            <div 
              key={category.category} 
              className="flex items-center justify-between p-2 hover:bg-[var(--background-100)] rounded-lg transition-colors"
              onMouseEnter={() => setSelectedCategory(category)}
              onMouseLeave={() => setSelectedCategory(null)}
            >
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: category.color }}></div>
                <span className="text-sm">{category.category}</span>
              </div>
              <div className="text-right">
                <span className="text-sm font-medium">${category.amount.toLocaleString()}</span>
                <span className="text-xs opacity-70 ml-2">{category.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-[var(--primary-200)]/10">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-xs opacity-70">Largest Category</p>
            <p className="font-medium">{sortedData[0].category}</p>
          </div>
          <div>
            <p className="text-xs opacity-70">Smallest Category</p>
            <p className="font-medium">{sortedData[sortedData.length - 1].category}</p>
          </div>
        </div>
      </div>
    </div>
  );
}