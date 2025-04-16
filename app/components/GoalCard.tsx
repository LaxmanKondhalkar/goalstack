'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { SavingsGoal } from '../types';

interface GoalCardProps {
  goal: SavingsGoal;
}

export default function GoalCard({ goal }: GoalCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Calculate progress percentage
  const progress = Math.round((goal.currentAmount / goal.targetAmount) * 100);
  
  return (
    <motion.div 
      className={`card ${goal.color} text-white mb-4`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{goal.icon}</span>
          <h3 className="font-semibold text-lg">{goal.name}</h3>
        </div>
        <span className="text-sm font-medium bg-white/20 rounded-full px-3 py-1">
          {progress}%
        </span>
      </div>
      
      <div className="mt-4">
        <div className="flex justify-between text-sm mb-1">
          <span>₹{goal.currentAmount.toLocaleString()}</span>
          <span>₹{goal.targetAmount.toLocaleString()}</span>
        </div>
        
        <div className="h-2 w-full bg-black/10 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-white"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>
      
      {isHovered && (
        <motion.div 
          className="mt-3 text-xs opacity-80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p>Last updated: {new Date(goal.lastUpdated).toLocaleDateString()}</p>
        </motion.div>
      )}
    </motion.div>
  );
}