export interface SavingsGoal {
  id: string;
  name: string;
  currentAmount: number;
  targetAmount: number;
  icon: string;
  color: string;
  createdAt: string;
  lastUpdated: string;
  category?: string;
  contributions?: Contribution[];
}

export interface Contribution {
  id: string;
  amount: number;
  date: string;
  note?: string;
  goalId: string;
}

export interface MonthlySummary {
  income: number;
  expenses: number;
  savings: number;
  month: string;
  year: number;
}

export interface GamificationData {
  streak: number;
  badges: Badge[];
  level: number;
  points: number;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  earnedAt: string;
}

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  description: string;
  category: string;
  type: 'income' | 'expense' | 'transfer' | 'saving';
  goalId?: string;
  recurring?: boolean;
}

export interface AnalyticsData {
  savingsRate: number;
  goalCompletionRate: number;
  monthlyData: MonthlyData[];
  categorySplit: CategorySplit[];
  savingsGrowth: SavingsGrowth[];
}

export interface MonthlyData {
  month: string;
  income: number;
  expenses: number;
  savings: number;
}

export interface CategorySplit {
  category: string;
  amount: number;
  percentage: number;
  color: string;
}

export interface SavingsGrowth {
  date: string;
  amount: number;
}

export type TimeRange = 'week' | 'month' | 'quarter' | 'year';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  dateJoined: string;
  savingsGoal: number;
  monthlyBudget: number;
}

export interface BudgetCategory {
  id: string;
  name: string;
  budgeted: number;
  spent: number;
  color: string;
  icon: string;
}