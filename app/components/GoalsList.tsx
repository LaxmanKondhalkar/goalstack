'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';
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
      className="card h-full border border-text/5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg sm:text-xl font-semibold">Savings Goals</h2>
        <motion.button
          className="p-2 rounded-full"
          style={{ background: 'var(--primary)', color: 'var(--background)' }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsAddingGoal(!isAddingGoal)}
        >
          <Plus size={16} />
        </motion.button>
      </div>
      
      {isAddingGoal && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-4"
        >
          <AddGoalForm onAddGoal={handleAddGoal} onCancel={() => setIsAddingGoal(false)} />
        </motion.div>
      )}
      
      {goals.length === 0 ? (
        <motion.div 
          className="text-center py-12 opacity-70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
        >
          <p className="mb-2">No savings goals yet</p>
          <p className="text-sm">Click the + button to add your first goal</p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {goals.map((goal) => (
            <GoalCard key={goal.id} goal={goal} />
          ))}
        </div>
      )}
    </motion.div>
  );
}