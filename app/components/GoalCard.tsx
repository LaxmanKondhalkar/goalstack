'use client';

import { motion } from 'framer-motion';
import { SavingsGoal } from '../types';
import { ArrowUpCircle, CheckCircle } from 'lucide-react';

interface GoalCardProps {
  goal: SavingsGoal;
  variant?: 'default' | 'elevated' | 'bordered';
  onAddFunds?: () => void;
}

export default function GoalCard({ 
  goal, 
  variant = 'default', 
  onAddFunds 
}: GoalCardProps) {
  const { name, currentAmount, targetAmount, icon } = goal;
  
  const progressPercentage = Math.min(Math.round((currentAmount / targetAmount) * 100), 100);
  const formattedCurrentAmount = currentAmount.toLocaleString();
  const formattedTargetAmount = targetAmount.toLocaleString();
  
  const cardClass = variant === 'elevated' 
    ? 'card-elevated' 
    : variant === 'bordered' 
      ? 'card-bordered'
      : 'card';
  
  // Standardized color selection based on progress
  const getColorTheme = () => {
    if (progressPercentage >= 100) return 'accent';
    if (progressPercentage >= 66) return 'primary';
    return 'secondary';
  };
  
  const colorTheme = getColorTheme();
  
  // Progress status text
  const getProgressStatus = () => {
    if (progressPercentage >= 100) return 'Goal reached! 🎉';
    if (progressPercentage >= 80) return 'Almost there!';
    if (progressPercentage >= 50) return 'Making progress';
    return 'Just started';
  };
  
  return (
    <motion.div 
      className={`${cardClass} overflow-hidden`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4, boxShadow: '0 12px 24px -10px rgba(0, 0, 0, 0.15)' }}
    >
      <div className="flex items-center mb-3 md:mb-4">
        <div 
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center text-base sm:text-lg md:text-xl mr-2 md:mr-3 shadow-sm"
          style={{ 
            background: `var(--${colorTheme}-100)`,
            color: `var(--${colorTheme}-700)`
          }}
        >
          {icon}
        </div>
        <div>
          <h3 className="font-semibold text-sm sm:text-base text-[var(--text)]">{name}</h3>
          <p className="text-xs text-[var(--text)]/70">
            ${formattedCurrentAmount} / ${formattedTargetAmount}
          </p>
        </div>
      </div>
      
      <div className="mb-2">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-[var(--text)]/70">Progress</span>
          <span 
            className="font-medium"
            style={{ color: `var(--${colorTheme}-600)` }}
          >
            {progressPercentage}%
          </span>
        </div>
        <div className="w-full h-2 sm:h-3 bg-[var(--background-200)] rounded-full overflow-hidden">
          <motion.div 
            className="h-full relative"
            style={{ 
              background: `var(--${colorTheme}-500)`,
              width: `${progressPercentage}%` 
            }}
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            {progressPercentage >= 100 && (
              <motion.div 
                className="absolute inset-0 opacity-30 bg-white"
                animate={{ opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            )}
          </motion.div>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-0 mt-3 sm:mt-4">
        <motion.button 
          className="text-xs py-1.5 px-3 sm:px-3.5 rounded-full flex items-center justify-center sm:justify-start gap-1 font-medium shadow-sm"
          style={{ 
            background: `var(--${colorTheme}-100)`,
            color: `var(--${colorTheme}-700)`
          }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={onAddFunds}
        >
          {progressPercentage >= 100 ? (
            <>
              <CheckCircle size={14} />
              <span>Completed</span>
            </>
          ) : (
            <>
              <ArrowUpCircle size={14} />
              <span>Add funds</span>
            </>
          )}
        </motion.button>
        <span 
          className="text-xs flex items-center justify-center px-2 py-1 rounded-full"
          style={{ 
            background: `var(--${colorTheme}-100)`,
            color: `var(--${colorTheme}-700)`
          }}
        >
          {getProgressStatus()}
        </span>
      </div>
    </motion.div>
  );
}