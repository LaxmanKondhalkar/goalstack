'use client';

import { motion } from 'framer-motion';
import { SavingsGoal } from '../types';
import { ArrowUpCircle, CheckCircle } from 'lucide-react';

interface GoalCardProps {
  goal: SavingsGoal;
  variant?: 'default' | 'elevated' | 'bordered';
}

export default function GoalCard({ goal, variant = 'default' }: GoalCardProps) {
  const { name, currentAmount, targetAmount, icon } = goal;
  
  const progressPercentage = Math.min(Math.round((currentAmount / targetAmount) * 100), 100);
  const formattedCurrentAmount = currentAmount.toLocaleString();
  const formattedTargetAmount = targetAmount.toLocaleString();
  
  const cardClass = variant === 'elevated' 
    ? 'card-elevated' 
    : variant === 'bordered' 
      ? 'card-bordered'
      : 'card';
  
  return (
    <motion.div 
      className={`${cardClass} overflow-hidden`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4, boxShadow: '0 12px 24px -10px rgba(0, 0, 0, 0.15)' }}
    >
      <div className="flex items-center mb-4">
        <div 
          className="w-10 h-10 rounded-lg flex items-center justify-center text-lg sm:text-xl mr-3 shadow-sm"
          style={{ 
            background: `var(--${progressPercentage < 33 ? 'secondary-100' : progressPercentage < 66 ? 'primary-100' : 'accent-100'})`,
            color: `var(--${progressPercentage < 33 ? 'secondary-700' : progressPercentage < 66 ? 'primary-700' : 'accent-700'})`
          }}
        >
          {icon}
        </div>
        <div>
          <h3 className="font-semibold text-[var(--text)]">{name}</h3>
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
            style={{ color: `var(--${progressPercentage < 33 ? 'secondary-600' : progressPercentage < 66 ? 'primary-600' : 'accent-600'})` }}
          >
            {progressPercentage}%
          </span>
        </div>
        <div className="w-full h-3 bg-[var(--background-200)] rounded-full overflow-hidden">
          <motion.div 
            className="h-full relative"
            style={{ 
              background: `var(--${progressPercentage < 33 ? 'secondary-400' : progressPercentage < 66 ? 'primary-400' : 'accent-500'})`,
              width: `${progressPercentage}%` 
            }}
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            {progressPercentage >= 100 && (
              <motion.div 
                className="absolute inset-0 opacity-30 bg-[var(--accent-100)]"
                animate={{ opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            )}
          </motion.div>
        </div>
      </div>
      
      <div className="flex justify-between mt-4">
        <motion.button 
          className="text-xs py-1.5 px-3.5 rounded-full flex items-center gap-1 font-medium shadow-sm"
          style={{ 
            background: progressPercentage >= 100 
              ? 'var(--accent-100)' 
              : 'var(--primary-100)', 
            color: progressPercentage >= 100 
              ? 'var(--accent-700)' 
              : 'var(--primary-700)' 
          }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
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
          className="text-xs flex items-center px-2 py-1 rounded-full"
          style={{ 
            background: progressPercentage >= 100 
              ? 'var(--accent-100)' 
              : progressPercentage >= 80 
                ? 'var(--primary-100)'
                : 'var(--secondary-100)',
            color: progressPercentage >= 100 
              ? 'var(--accent-700)' 
              : progressPercentage >= 80 
                ? 'var(--primary-700)'
                : 'var(--secondary-700)'
          }}
        >
          {progressPercentage < 50 ? 'Just started' : 
           progressPercentage < 80 ? 'Making progress' : 
           progressPercentage < 100 ? 'Almost there!' : 'Goal reached! 🎉'}
        </span>
      </div>
    </motion.div>
  );
}