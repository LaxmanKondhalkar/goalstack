'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { PlusCircle, X } from 'lucide-react';
import { SavingsGoal } from '../types';

const emojiOptions = ['💻', '🏖️', '🛡️', '📱', '🚗', '🏠', '📚', '✈️', '👕', '🎮'];
const colorOptions = [
  'bg-gradient-to-r from-blue-400 to-blue-600',
  'bg-gradient-to-r from-green-400 to-green-600',
  'bg-gradient-to-r from-purple-400 to-purple-600',
  'bg-gradient-to-r from-orange-400 to-orange-600',
  'bg-gradient-to-r from-pink-400 to-pink-600',
  'bg-gradient-to-r from-red-400 to-red-600',
];

interface AddGoalFormProps {
  onAddGoal: (goal: SavingsGoal) => void;
}

export default function AddGoalForm({ onAddGoal }: AddGoalFormProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [name, setName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [selectedIcon, setSelectedIcon] = useState(emojiOptions[0]);
  const [selectedColor, setSelectedColor] = useState(colorOptions[0]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const parsedTargetAmount = parseFloat(targetAmount);
    if (!name || !parsedTargetAmount || isNaN(parsedTargetAmount)) {
      return; // Form validation failed
    }
    
    const newGoal: SavingsGoal = {
      id: Date.now().toString(),
      name,
      currentAmount: 0,
      targetAmount: parsedTargetAmount,
      icon: selectedIcon,
      color: selectedColor,
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
    };
    
    onAddGoal(newGoal);
    resetForm();
  };
  
  const resetForm = () => {
    setName('');
    setTargetAmount('');
    setSelectedIcon(emojiOptions[0]);
    setSelectedColor(colorOptions[0]);
    setIsFormOpen(false);
  };
  
  if (!isFormOpen) {
    return (
      <motion.button
        className="w-full btn-primary flex items-center justify-center space-x-2 py-3"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsFormOpen(true)}
      >
        <PlusCircle size={18} />
        <span>Add New Goal</span>
      </motion.button>
    );
  }
  
  return (
    <motion.div 
      className="card border border-gray-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-800">Add New Goal</h3>
        <button 
          onClick={resetForm}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={18} />
        </button>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Goal Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="What are you saving for?"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="targetAmount" className="block text-sm font-medium text-gray-700 mb-1">
            Target Amount (₹)
          </label>
          <input
            type="number"
            id="targetAmount"
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="10000"
            min="1"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Choose an Icon
          </label>
          <div className="flex flex-wrap gap-2">
            {emojiOptions.map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => setSelectedIcon(emoji)}
                className={`w-10 h-10 flex items-center justify-center text-xl rounded-lg ${
                  selectedIcon === emoji 
                    ? 'bg-blue-100 border-2 border-blue-500' 
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Choose a Color
          </label>
          <div className="flex flex-wrap gap-2">
            {colorOptions.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => setSelectedColor(color)}
                className={`w-8 h-8 rounded-full ${color} ${
                  selectedColor === color 
                    ? 'ring-2 ring-offset-2 ring-blue-500' 
                    : ''
                }`}
              />
            ))}
          </div>
        </div>
        
        <div className="flex justify-end space-x-2">
          <motion.button
            type="button"
            onClick={resetForm}
            className="btn-secondary"
            whileTap={{ scale: 0.98 }}
          >
            Cancel
          </motion.button>
          
          <motion.button
            type="submit"
            className="btn-primary"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Save Goal
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
}