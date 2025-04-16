import { SavingsGoal, MonthlySummary, GamificationData } from '../types';

// Mock savings goals data
export const mockSavingsGoals: SavingsGoal[] = [
  {
    id: '1',
    name: 'New Laptop',
    currentAmount: 45000,
    targetAmount: 75000,
    icon: '💻',
    color: 'bg-gradient-to-r from-blue-400 to-blue-600',
    createdAt: '2025-01-15',
    lastUpdated: '2025-04-10'
  },
  {
    id: '2',
    name: 'Summer Trip',
    currentAmount: 12000,
    targetAmount: 30000,
    icon: '🏖️',
    color: 'bg-gradient-to-r from-orange-400 to-orange-600',
    createdAt: '2025-02-05',
    lastUpdated: '2025-04-12'
  },
  {
    id: '3',
    name: 'Emergency Fund',
    currentAmount: 25000,
    targetAmount: 50000,
    icon: '🛡️',
    color: 'bg-gradient-to-r from-purple-400 to-purple-600',
    createdAt: '2024-11-20',
    lastUpdated: '2025-04-15'
  },
  {
    id: '4',
    name: 'New Phone',
    currentAmount: 10000,
    targetAmount: 20000,
    icon: '📱',
    color: 'bg-gradient-to-r from-green-400 to-green-600',
    createdAt: '2025-03-01',
    lastUpdated: '2025-04-08'
  }
];

// Mock monthly summary data
export const mockMonthlySummary: MonthlySummary = {
  income: 20000,
  expenses: 14800,
  savings: 5200,
  month: 'April',
  year: 2025
};

// Mock gamification data
export const mockGamificationData: GamificationData = {
  streak: 15,
  level: 3,
  points: 850,
  badges: [
    {
      id: '1',
      name: 'Savings Starter',
      icon: '🌱',
      description: 'Started your first savings goal',
      earnedAt: '2025-01-15'
    },
    {
      id: '2',
      name: 'Weekly Warrior',
      icon: '⚔️',
      description: 'Saved money for 4 consecutive weeks',
      earnedAt: '2025-02-10'
    },
    {
      id: '3',
      name: 'Goal Achiever',
      icon: '🏆',
      description: 'Completed your first savings goal',
      earnedAt: '2025-03-20'
    }
  ]
};