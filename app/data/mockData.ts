import { 
  SavingsGoal, 
  MonthlySummary, 
  GamificationData, 
  Transaction,
  AnalyticsData,
  Contribution,
  CategorySplit,
  UserProfile,
  BudgetCategory,
  TimeRange,
  MonthlyData
} from '../types';

// Mock user profile data
export const mockUserProfile: UserProfile = {
  id: 'user1',
  name: 'Alex Johnson',
  email: 'alex.johnson@university.edu',
  avatar: '/avatars/profile.png',
  dateJoined: '2024-08-15',
  savingsGoal: 100000,
  monthlyBudget: 20000
};

// Mock contributions for each goal
const carContributions: Contribution[] = [
  { id: 'c1', amount: 15000, date: '2025-01-15', goalId: '1', note: 'Initial deposit' },
  { id: 'c2', amount: 10000, date: '2025-02-10', goalId: '1', note: 'Part-time job' },
  { id: 'c3', amount: 8000, date: '2025-03-05', goalId: '1', note: 'Tutoring money' },
  { id: 'c4', amount: 12000, date: '2025-04-10', goalId: '1', note: 'Birthday money' },
];

const tripContributions: Contribution[] = [
  { id: 'c5', amount: 5000, date: '2025-02-05', goalId: '2', note: 'Initial deposit' },
  { id: 'c6', amount: 3000, date: '2025-03-15', goalId: '2', note: 'Side gig' },
  { id: 'c7', amount: 4000, date: '2025-04-12', goalId: '2', note: 'Cashback rewards' },
];

const emergencyContributions: Contribution[] = [
  { id: 'c8', amount: 10000, date: '2024-11-20', goalId: '3', note: 'Initial deposit' },
  { id: 'c9', amount: 5000, date: '2024-12-10', goalId: '3', note: 'Scholarship refund' },
  { id: 'c10', amount: 5000, date: '2025-01-25', goalId: '3', note: 'Freelance work' },
  { id: 'c11', amount: 5000, date: '2025-04-15', goalId: '3', note: 'Monthly allocation' },
];

const bikeContributions: Contribution[] = [
  { id: 'c12', amount: 5000, date: '2025-03-01', goalId: '4', note: 'Initial deposit' },
  { id: 'c13', amount: 5000, date: '2025-04-08', goalId: '4', note: 'Part-time job' },
];

// Mock savings goals data with contributions
export const mockSavingsGoals: SavingsGoal[] = [
  {
    id: '1',
    name: 'New Car',
    currentAmount: 45000,
    targetAmount: 75000,
    icon: '🚗',
    color: '#4f46e5',
    createdAt: '2025-01-15',
    lastUpdated: '2025-04-10',
    category: 'Transport',
    contributions: carContributions
  },
  {
    id: '2',
    name: 'Summer Trip',
    currentAmount: 12000,
    targetAmount: 30000,
    icon: '🏖️',
    color: '#f59e0b',
    createdAt: '2025-02-05',
    lastUpdated: '2025-04-12',
    category: 'Travel',
    contributions: tripContributions
  },
  {
    id: '3',
    name: 'Emergency Fund',
    currentAmount: 25000,
    targetAmount: 50000,
    icon: '🛡️',
    color: '#8b5cf6',
    createdAt: '2024-11-20',
    lastUpdated: '2025-04-15',
    category: 'Emergency',
    contributions: emergencyContributions
  },
  {
    id: '4',
    name: 'New Bike',
    currentAmount: 10000,
    targetAmount: 20000,
    icon: '🚲',
    color: '#10b981',
    createdAt: '2025-03-01',
    lastUpdated: '2025-04-08',
    category: 'Transport',
    contributions: bikeContributions
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

// Expanded Mock transactions data with more entries
export const mockTransactions: Transaction[] = [
  // April 2025
  { id: 't1', date: '2025-04-15', amount: -999, description: 'Spotify Premium', category: 'Entertainment', type: 'expense', recurring: true },
  { id: 't2', date: '2025-04-14', amount: 20000, description: 'Paycheck - Part time job', category: 'Income', type: 'income' },
  { id: 't3', date: '2025-04-14', amount: -5000, description: 'Savings Deposit', category: 'Savings', type: 'saving', goalId: '3' },
  { id: 't4', date: '2025-04-12', amount: -6547, description: 'Grocery Store', category: 'Food', type: 'expense' },
  { id: 't5', date: '2025-04-10', amount: -1250, description: 'Uber Ride', category: 'Transport', type: 'expense' },
  { id: 't6', date: '2025-04-08', amount: -5000, description: 'Bike Fund', category: 'Savings', type: 'saving', goalId: '4' },
  { id: 't7', date: '2025-04-05', amount: -3500, description: 'Coffee Shop', category: 'Food', type: 'expense' },
  { id: 't8', date: '2025-04-03', amount: -1999, description: 'Netflix Subscription', category: 'Entertainment', type: 'expense', recurring: true },
  { id: 't9', date: '2025-04-01', amount: 11000, description: 'Monthly Stipend', category: 'Income', type: 'income', recurring: true },
  { id: 't17', date: '2025-04-15', amount: -3250, description: 'New Jacket', category: 'Shopping', type: 'expense' },
  { id: 't18', date: '2025-04-13', amount: -1800, description: 'Books', category: 'Education', type: 'expense' },
  { id: 't19', date: '2025-04-07', amount: -2500, description: 'Dentist Appointment', category: 'Health', type: 'expense' },
  { id: 't20', date: '2025-04-02', amount: -1100, description: 'Internet Bill', category: 'Utilities', type: 'expense', recurring: true },

  // March 2025
  { id: 't10', date: '2025-03-28', amount: -4500, description: 'Textbooks', category: 'Education', type: 'expense' },
  { id: 't11', date: '2025-03-25', amount: -7500, description: 'Restaurant Dinner', category: 'Food', type: 'expense' },
  { id: 't12', date: '2025-03-20', amount: 5000, description: 'Tutoring Session', category: 'Income', type: 'income' },
  { id: 't13', date: '2025-03-15', amount: -3000, description: 'Summer Trip Fund', category: 'Savings', type: 'saving', goalId: '2' },
  { id: 't14', date: '2025-03-10', amount: -2100, description: 'Phone Bill', category: 'Utilities', type: 'expense', recurring: true },
  { id: 't15', date: '2025-03-05', amount: -8000, description: 'Car Fund', category: 'Savings', type: 'saving', goalId: '1' },
  { id: 't16', date: '2025-03-01', amount: -5000, description: 'Bike Fund Initial', category: 'Savings', type: 'saving', goalId: '4' },
  { id: 't21', date: '2025-03-01', amount: 11000, description: 'Monthly Stipend', category: 'Income', type: 'income', recurring: true },
  { id: 't22', date: '2025-03-18', amount: -4200, description: 'Weekend Trip', category: 'Travel', type: 'expense' },
  { id: 't23', date: '2025-03-12', amount: 16000, description: 'Freelance Project', category: 'Income', type: 'income' },
  { id: 't24', date: '2025-03-07', amount: -3300, description: 'New Shoes', category: 'Shopping', type: 'expense' },
  { id: 't25', date: '2025-03-03', amount: -1999, description: 'Netflix Subscription', category: 'Entertainment', type: 'expense', recurring: true },
  { id: 't26', date: '2025-03-02', amount: -1100, description: 'Internet Bill', category: 'Utilities', type: 'expense', recurring: true },

  // February 2025
  { id: 't27', date: '2025-02-28', amount: -5100, description: 'Winter Clothes', category: 'Shopping', type: 'expense' },
  { id: 't28', date: '2025-02-25', amount: -2800, description: 'Birthday Gift', category: 'Shopping', type: 'expense' },
  { id: 't29', date: '2025-02-20', amount: -4100, description: 'Concert Tickets', category: 'Entertainment', type: 'expense' },
  { id: 't30', date: '2025-02-15', amount: 4500, description: 'Tutoring Session', category: 'Income', type: 'income' },
  { id: 't31', date: '2025-02-10', amount: -10000, description: 'Car Fund', category: 'Savings', type: 'saving', goalId: '1' },
  { id: 't32', date: '2025-02-05', amount: -5000, description: 'Summer Trip Initial', category: 'Savings', type: 'saving', goalId: '2' },
  { id: 't33', date: '2025-02-01', amount: 11000, description: 'Monthly Stipend', category: 'Income', type: 'income', recurring: true },
  { id: 't34', date: '2025-02-03', amount: -1999, description: 'Netflix Subscription', category: 'Entertainment', type: 'expense', recurring: true },
  { id: 't35', date: '2025-02-02', amount: -1100, description: 'Internet Bill', category: 'Utilities', type: 'expense', recurring: true },
  { id: 't36', date: '2025-02-08', amount: -5400, description: 'Groceries', category: 'Food', type: 'expense' },
  { id: 't37', date: '2025-02-17', amount: -1500, description: 'Study Materials', category: 'Education', type: 'expense' },
  { id: 't38', date: '2025-02-22', amount: -2250, description: 'Phone Repair', category: 'Technology', type: 'expense' },
  { id: 't39', date: '2025-02-10', amount: -2100, description: 'Phone Bill', category: 'Utilities', type: 'expense', recurring: true },
  // January 2025
  { id: 't40', date: '2025-01-01', amount: 11000, description: 'Monthly Stipend', category: 'Income', type: 'income', recurring: true },
  { id: 't41', date: '2025-01-02', amount: -2100, description: 'Phone Bill', category: 'Utilities', type: 'expense', recurring: true },
  { id: 't42', date: '2025-01-03', amount: -1999, description: 'Netflix Subscription', category: 'Entertainment', type: 'expense', recurring: true },
  { id: 't43', date: '2025-01-05', amount: -4300, description: 'Groceries', category: 'Food', type: 'expense' },
  { id: 't44', date: '2025-01-09', amount: -2500, description: 'Coffee Shop', category: 'Food', type: 'expense' },
  { id: 't45', date: '2025-01-10', amount: 10000, description: 'Paycheck - Part time job', category: 'Income', type: 'income' },
  { id: 't46', date: '2025-01-15', amount: -5000, description: 'Emergency Fund Deposit', category: 'Savings', type: 'saving', goalId: '3' },
  { id: 't47', date: '2025-01-25', amount: -3500, description: 'Textbooks', category: 'Education', type: 'expense' },
  { id: 't48', date: '2025-01-31', amount: -8000, description: 'Dorm Rent', category: 'Housing', type: 'expense' }
];

// Mock category split for analytics
export const mockCategorySplit: CategorySplit[] = [
  { category: 'Housing', amount: 35000, percentage: 35, color: '#4f46e5' },
  { category: 'Food', amount: 25000, percentage: 25, color: '#f59e0b' },
  { category: 'Entertainment', amount: 15000, percentage: 15, color: '#ec4899' },
  { category: 'Transport', amount: 10000, percentage: 10, color: '#8b5cf6' },
  { category: 'Utilities', amount: 5000, percentage: 5, color: '#10b981' },
  { category: 'Other', amount: 10000, percentage: 10, color: '#6b7280' }
];

// Mock monthly data for analytics
const mockMonthlyData: MonthlyData[] = [
  { month: 'Nov 2024', income: 29000, expenses: 23000, savings: 6000 },
  { month: 'Dec 2024', income: 28000, expenses: 22000, savings: 6000 },
  { month: 'Jan 2025', income: 30000, expenses: 25000, savings: 5000 },
  { month: 'Feb 2025', income: 28000, expenses: 21000, savings: 7000 },
  { month: 'Mar 2025', income: 32000, expenses: 24000, savings: 8000 },
  { month: 'Apr 2025', income: 31000, expenses: 24800, savings: 6200 }
];

// Mock savings growth for analytics
const mockSavingsGrowth = [
  { date: '2024-11-01', amount: 10000 },
  { date: '2024-12-01', amount: 16000 },
  { date: '2025-01-01', amount: 22000 },
  { date: '2025-02-01', amount: 27000 },
  { date: '2025-03-01', amount: 34000 },
  { date: '2025-04-01', amount: 43000 },
  { date: '2025-04-16', amount: 49200 }
];

// Complete analytics data
export const mockAnalyticsData: AnalyticsData = {
  savingsRate: 26.4, // Percentage of income saved
  goalCompletionRate: 42.7, // Progress towards all goals combined
  monthlyData: mockMonthlyData,
  categorySplit: mockCategorySplit,
  savingsGrowth: mockSavingsGrowth
};

// Mock budget categories
export const mockBudgetCategories: BudgetCategory[] = [
  { 
    id: 'b1', 
    name: 'Housing', 
    budgeted: 35000, 
    spent: 35000, 
    color: '#4f46e5',
    icon: '🏠' 
  },
  { 
    id: 'b2', 
    name: 'Food', 
    budgeted: 30000, 
    spent: 25000, 
    color: '#f59e0b',
    icon: '🍔' 
  },
  { 
    id: 'b3', 
    name: 'Entertainment', 
    budgeted: 15000, 
    spent: 15000, 
    color: '#ec4899',
    icon: '🎬' 
  },
  { 
    id: 'b4', 
    name: 'Transport', 
    budgeted: 12000, 
    spent: 10000, 
    color: '#8b5cf6',
    icon: '🚗' 
  },
  { 
    id: 'b5', 
    name: 'Utilities', 
    budgeted: 5000, 
    spent: 5000, 
    color: '#10b981',
    icon: '💡' 
  },
  { 
    id: 'b6', 
    name: 'Education', 
    budgeted: 5000, 
    spent: 4500, 
    color: '#ec4899',
    icon: '📚' 
  },
  { 
    id: 'b7', 
    name: 'Other', 
    budgeted: 8000, 
    spent: 10000, 
    color: '#6b7280',
    icon: '🛒' 
  }
];

// Mock testimonials data
export const mockTestimonials = [
  {
    id: 't1',
    name: 'Priya Sharma',
    avatar: '/avatars/user1.png',
    text: 'GoalStack helped me finally buy my dream bike by keeping me motivated and on track!'
  },
  {
    id: 't2',
    name: 'Rahul Verma',
    avatar: '/avatars/user2.png',
    text: 'I saved for my first car in less than a year using the app’s gamification features.'
  },
  {
    id: 't3',
    name: 'Sneha Patel',
    avatar: '/avatars/user3.png',
    text: 'The analytics and reminders made it easy to stick to my savings plan.'
  }
];

// Mock settings data (for demonstration)
export const mockSettings = {
  darkMode: true,
  emailNotifications: true,
  pushNotifications: true,
  weeklyReports: true,
  goalAlerts: true,
  accentColor: '#3b82f6'
};

// Helper functions for data manipulation
export const getTransactionsByGoal = (goalId: string): Transaction[] => {
  return mockTransactions.filter(transaction => 
    transaction.goalId === goalId && transaction.type === 'saving'
  );
};

export const getRecentTransactions = (count: number = 5): Transaction[] => {
  return [...mockTransactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
};

export const getCategoryTotals = (): Record<string, number> => {
  const totals: Record<string, number> = {};
  
  mockTransactions
    .filter(t => t.type === 'expense')
    .forEach(t => {
      if (!totals[t.category]) {
        totals[t.category] = 0;
      }
      totals[t.category] += Math.abs(t.amount);
    });
    
  return totals;
};

export const getTransactionsByDateRange = (startDate: string, endDate: string): Transaction[] => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  return mockTransactions.filter(t => {
    const date = new Date(t.date);
    return date >= start && date <= end;
  });
};

export const getTransactionsByTimeRange = (timeRange: TimeRange): Transaction[] => {
  const now = new Date();
  const startDate = new Date();
  
  switch (timeRange) {
    case 'week':
      startDate.setDate(now.getDate() - 7);
      break;
    case 'month':
      startDate.setMonth(now.getMonth() - 1);
      break;
    case 'quarter':
      startDate.setMonth(now.getMonth() - 3);
      break;
    case 'year':
      startDate.setFullYear(now.getFullYear() - 1);
      break;
  }
  
  return mockTransactions.filter(t => {
    const transactionDate = new Date(t.date);
    return transactionDate >= startDate && transactionDate <= now;
  });
};

export const getRecurringTransactions = (): Transaction[] => {
  return mockTransactions.filter(t => t.recurring === true);
};

export const getSavingsByMonth = (): Record<string, number> => {
  const savings: Record<string, number> = {};
  
  mockTransactions
    .filter(t => t.type === 'saving')
    .forEach(t => {
      const date = new Date(t.date);
      const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      if (!savings[monthYear]) {
        savings[monthYear] = 0;
      }
      savings[monthYear] += Math.abs(t.amount);
    });
    
  return savings;
};

export const getSavingsByCategory = (): Record<string, number> => {
  const categorySavings: Record<string, number> = {};
  
  // Get all goal IDs with their categories
  const goalCategories = mockSavingsGoals.reduce<Record<string, string>>((acc, goal) => {
    acc[goal.id] = goal.category || 'Uncategorized';
    return acc;
  }, {});
  
  // Sum savings by category based on goal ID
  mockTransactions
    .filter(t => t.type === 'saving' && t.goalId)
    .forEach(t => {
      if (t.goalId) {
        const category = goalCategories[t.goalId] || 'Uncategorized';
        
        if (!categorySavings[category]) {
          categorySavings[category] = 0;
        }
        categorySavings[category] += Math.abs(t.amount);
      }
    });
    
  return categorySavings;
};

export const getMonthlyAnalytics = (month: number, year: number): MonthlyData | undefined => {
  const monthName = new Date(year, month - 1, 1).toLocaleString('default', { month: 'short' });
  return mockMonthlyData.find(data => data.month.includes(`${monthName} ${year}`));
};

export const calculateCompletionPercentage = (goal: SavingsGoal): number => {
  return Math.min(Math.round((goal.currentAmount / goal.targetAmount) * 100), 100);
};

export const getTotalSavingsByTimeRange = (timeRange: TimeRange): number => {
  return getTransactionsByTimeRange(timeRange)
    .filter(t => t.type === 'saving')
    .reduce((total, t) => total + Math.abs(t.amount), 0);
};

export const getGoalContributionsByMonth = (goalId: string): Record<string, number> => {
  const monthlyContributions: Record<string, number> = {};
  
  const goal = mockSavingsGoals.find(g => g.id === goalId);
  if (!goal || !goal.contributions) return monthlyContributions;
  
  goal.contributions.forEach(c => {
    const date = new Date(c.date);
    const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    
    if (!monthlyContributions[monthYear]) {
      monthlyContributions[monthYear] = 0;
    }
    monthlyContributions[monthYear] += c.amount;
  });
  
  return monthlyContributions;
};

// Ensure we export everything
export {
  mockMonthlyData,
  mockSavingsGrowth
};