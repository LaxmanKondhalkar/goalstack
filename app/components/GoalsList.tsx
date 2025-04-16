'use client';

import { useState } from 'react';
import { Plus, ListChecks } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import GoalCard from './GoalCard';
import AddGoalForm from './AddGoalForm';
import { SavingsGoal } from '../types';

interface GoalsListProps {
  initialGoals: SavingsGoal[];
}

export default function GoalsList({ initialGoals }: GoalsListProps) {
  const [goals, setGoals] = useState<SavingsGoal[]>(initialGoals);
  const [isAddingGoal, setIsAddingGoal] = useState(false);
  
  const handleAddGoal = (newGoal: SavingsGoal) => {
    setGoals([...goals, newGoal]);
    setIsAddingGoal(false);
  };
  
  return (
    <motion.div 
      className="card-elevated h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-[var(--primary-100)] flex items-center justify-center text-[var(--primary-600)]">
            <ListChecks size={18} />
          </div>
          <h2 className="text-lg sm:text-xl font-semibold">Savings Goals</h2>
        </div>
        <motion.button
          className="p-2.5 rounded-full shadow-sm bg-gradient-to-r from-[var(--primary-400)] to-[var(--primary-500)] text-[var(--background-50)]"
          whileHover={{ scale: 1.05, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsAddingGoal(!isAddingGoal)}
        >
          <Plus size={18} />
        </motion.button>
      </div>
      
      <AnimatePresence>
        {isAddingGoal && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-6"
          >
            <div className="card-bordered p-5 bg-[var(--background-50)]">
              <AddGoalForm onAddGoal={handleAddGoal} onCancel={() => setIsAddingGoal(false)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {goals.length === 0 ? (
        <motion.div 
          className="text-center py-12 bg-[var(--background-50)] rounded-xl border-2 border-dashed border-[var(--primary-200)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-full bg-[var(--primary-100)] flex items-center justify-center text-[var(--primary-500)]">
              <Plus size={32} />
            </div>
            <div>
              <p className="font-medium mb-1">No savings goals yet</p>
              <p className="text-sm text-[var(--text)]/70">Click the + button to add your first goal</p>
            </div>
          </div>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 gap-5">
          {goals.map((goal) => (
            <GoalCard 
              key={goal.id} 
              goal={goal} 
              variant="elevated"
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}