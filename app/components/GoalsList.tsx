'use client';

import { useState } from 'react';
import { SavingsGoal } from '../types';
import GoalCard from './GoalCard';
import { motion } from 'framer-motion';
import AddGoalForm from './AddGoalForm';

interface GoalsListProps {
  initialGoals: SavingsGoal[];
}

export default function GoalsList({ initialGoals }: GoalsListProps) {
  const [goals, setGoals] = useState<SavingsGoal[]>(initialGoals);
  
  const handleAddGoal = (newGoal: SavingsGoal) => {
    setGoals((prevGoals) => [...prevGoals, newGoal]);
  };

  return (
    <motion.div 
      className="space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ staggerChildren: 0.1 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">My Savings Goals</h2>
        <span className="text-sm font-medium text-gray-500">{goals.length} goals</span>
      </div>
      
      <AddGoalForm onAddGoal={handleAddGoal} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {goals.map((goal) => (
          <GoalCard key={goal.id} goal={goal} />
        ))}
      </div>
    </motion.div>
  );
}