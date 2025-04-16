export interface SavingsGoal {
  id: string;
  name: string;
  currentAmount: number;
  targetAmount: number;
  icon: string;
  color: string;
  createdAt: string;
  lastUpdated: string;
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