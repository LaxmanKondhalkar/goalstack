'use client';

import { motion } from 'framer-motion';
import { SavingsGoal } from '../types';

interface GoalCardProps {
  goal: SavingsGoal;
}

export default function GoalCard({ goal }: GoalCardProps) {
  const { name, currentAmount, targetAmount, icon } = goal;
  
  const progressPercentage = Math.min(Math.round((currentAmount / targetAmount) * 100), 100);
  const formattedCurrentAmount = currentAmount.toLocaleString();
  const formattedTargetAmount = targetAmount.toLocaleString();
  
  return (
    <motion.div 
      className="card border border-text/5 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4, boxShadow: '0 12px 24px -10px rgba(0, 0, 0, 0.1)' }}
    >
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center text-lg sm:text-xl mr-3" 
          style={{ background: 'var(--primary)', color: 'var(--background)' }}>
          {icon}
        </div>
        <div>
          <h3 className="font-semibold">{name}</h3>
          <p className="text-xs opacity-70">
            ${formattedCurrentAmount} / ${formattedTargetAmount}
          </p>
        </div>
      </div>
      
      <div className="mb-2">
        <div className="flex justify-between text-xs mb-1">
          <span className="opacity-70">Progress</span>
          <span className="font-medium">{progressPercentage}%</span>
        </div>
        <div className="w-full h-2 bg-text/10 rounded-full overflow-hidden">
          <motion.div 
            className="h-full"
            style={{ 
              background: `var(${progressPercentage < 33 ? '--secondary' : progressPercentage < 66 ? '--primary' : '--accent'})`,
              width: `${progressPercentage}%` 
            }}
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.8, delay: 0.1 }}
          />
        </div>
      </div>
      
      <div className="flex justify-between mt-4">
        <button 
          className="text-xs py-1 px-3 rounded-full"
          style={{ background: 'var(--accent)', opacity: 0.1, color: 'var(--accent)' }}
        >
          Add funds
        </button>
        <span className="text-xs opacity-70 flex items-center">
          {progressPercentage < 50 ? 'Just started' : 
           progressPercentage < 80 ? 'Making progress' : 
           progressPercentage < 100 ? 'Almost there!' : 'Goal reached! 🎉'}
        </span>
      </div>
    </motion.div>
  );
}