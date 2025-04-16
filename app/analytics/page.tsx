'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import AppLayout from '../components/AppLayout';
import SavingsChart from '../components/charts/SavingsChart';
import CategoryPieChart from '../components/charts/CategoryPieChart';
import MonthlyComparisonChart from '../components/charts/MonthlyComparisonChart';
import { mockAnalyticsData, mockSavingsGoals, calculateCompletionPercentage } from '../data/mockData';
import { TimeRange } from '../types';
import { 
  TrendingUp, 
  Target, 
  ArrowDown, 
  ArrowUp,
  Download
} from 'lucide-react';

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState<TimeRange>('month');

  // Calculate the total goal progress
  const totalGoalProgress = mockSavingsGoals.reduce(
    (sum, goal) => sum + calculateCompletionPercentage(goal), 0
  ) / mockSavingsGoals.length;

  return (
    <AppLayout>
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Financial Analytics</h1>
            <p className="text-sm opacity-70">Insights into your financial patterns and goals</p>
          </div>
          <div className="flex items-center mt-4 md:mt-0 gap-3">
            <div className="flex items-center border border-[var(--primary-300)]/30 rounded-lg overflow-hidden shadow-sm">
              {(['week', 'month', 'quarter', 'year'] as TimeRange[]).map((range) => (
                <button 
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`py-1.5 px-3 text-sm font-medium ${
                    timeRange === range 
                      ? 'bg-gradient-to-r from-[var(--primary-400)] to-[var(--primary-500)] text-[var(--background-50)]' 
                      : 'hover:bg-[var(--background-100)]'
                  }`}
                >
                  {range.charAt(0).toUpperCase() + range.slice(1)}
                </button>
              ))}
            </div>
            <motion.button 
              className="p-2 rounded-lg border border-[var(--primary-300)]/30 hover:bg-[var(--background-100)] shadow-sm"
              whileTap={{ scale: 0.95 }}
            >
              <Download size={18} />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { 
            title: "Savings Rate", 
            value: `${mockAnalyticsData.savingsRate}%`, 
            change: "+2.1%", 
            isPositive: true,
            icon: <TrendingUp size={20} />,
            color: "text-green-600",
            bgColor: "bg-green-100"
          },
          { 
            title: "Goal Completion", 
            value: `${totalGoalProgress.toFixed(1)}%`, 
            change: "+5.3%", 
            isPositive: true,
            icon: <Target size={20} />,
            color: "text-[var(--primary-600)]",
            bgColor: "bg-[var(--primary-100)]"
          },
          { 
            title: "Monthly Expenses", 
            value: `$${(mockAnalyticsData.monthlyData[mockAnalyticsData.monthlyData.length-1].expenses).toLocaleString()}`, 
            change: "-3.2%", 
            isPositive: true,
            icon: <ArrowDown size={20} />,
            color: "text-green-600",
            bgColor: "bg-green-100"
          },
          { 
            title: "Monthly Income", 
            value: `$${(mockAnalyticsData.monthlyData[mockAnalyticsData.monthlyData.length-1].income).toLocaleString()}`, 
            change: "+1.5%", 
            isPositive: true,
            icon: <ArrowUp size={20} />,
            color: "text-[var(--accent-600)]",
            bgColor: "bg-[var(--accent-100)]"
          }
        ].map((metric, index) => (
          <motion.div 
            key={index}
            className={index % 2 === 0 ? "card-elevated p-5" : "card-bordered p-5"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-full ${metric.bgColor} ${metric.color}`}>
                {metric.icon}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm opacity-70">{metric.title}</p>
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-lg md:text-xl lg:text-2xl font-bold truncate">{metric.value}</h2>
                  <span className={`text-xs font-medium px-1.5 rounded-full ${metric.isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {metric.change}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <SavingsChart data={mockAnalyticsData.savingsGrowth} />
        <CategoryPieChart data={mockAnalyticsData.categorySplit} />
      </div>

      {/* Charts Row 2 */}
      <div className="mb-8">
        <MonthlyComparisonChart data={mockAnalyticsData.monthlyData} />
      </div>

      {/* Goals Progress */}
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4">Goals Progress</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockSavingsGoals.map((goal) => {
            const progress = calculateCompletionPercentage(goal);
            return (
              <motion.div 
                key={goal.id}
                className={progress >= 50 ? "card-elevated p-5" : "card-bordered p-5"}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -3 }}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center text-lg" style={{ background: goal.color, color: 'white' }}>
                      {goal.icon}
                    </div>
                    <div>
                      <h4 className="font-medium">{goal.name}</h4>
                      <div className="flex items-center gap-1 flex-wrap">
                        <span className="text-xs opacity-70">{goal.category}</span>
                        <span className="text-xs bg-[var(--background-200)] px-2 py-0.5 rounded-full">
                          ${goal.currentAmount.toLocaleString()} / ${goal.targetAmount.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <span className={`text-sm font-medium px-2 py-0.5 rounded-full ${
                    progress >= 80 ? 'bg-green-100 text-green-700' :
                    progress >= 50 ? 'bg-[var(--primary-100)] text-[var(--primary-700)]' :
                    'bg-[var(--secondary-100)] text-[var(--secondary-700)]'
                  }`}>
                    {progress}%
                  </span>
                </div>

                {/* Progress bar */}
                <div className="h-2.5 bg-[var(--background-200)] rounded-full overflow-hidden">
                  <motion.div 
                    className={`h-full rounded-full ${
                      progress >= 80 ? 'bg-green-500' :
                      progress >= 50 ? 'bg-[var(--primary-500)]' :
                      'bg-[var(--secondary-500)]'
                    }`}
                    style={{ width: `${progress}%` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1 }}
                  ></motion.div>
                </div>

                {/* Contributions */}
                <div className="mt-4 pt-3 border-t border-[var(--primary-200)]/10">
                  <div className="flex items-center justify-between text-sm">
                    <span className="opacity-70">Recent contribution</span>
                    {goal.contributions && goal.contributions.length > 0 ? (
                      <span className="font-medium truncate max-w-[180px]">
                        +${goal.contributions[goal.contributions.length - 1].amount.toLocaleString()} 
                        <span className="text-xs opacity-70 ml-1">
                          ({new Date(goal.contributions[goal.contributions.length - 1].date).toLocaleDateString()})
                        </span>
                      </span>
                    ) : (
                      <span className="text-xs opacity-70">No contributions yet</span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Financial Insights */}
      <div className="card-bordered p-6">
        <h3 className="text-lg font-medium mb-4">Financial Insights</h3>
        <div className="space-y-4">
          {[
            {
              title: "Expenses Breakdown",
              description: "Housing expenses represent the largest category at 35% of your monthly spending.",
              action: "Review housing alternatives"
            },
            {
              title: "Savings Opportunity",
              description: "Reducing food expenses by 10% would increase your monthly savings rate to 29.3%.",
              action: "Create meal planning budget"
            },
            {
              title: "Goal Projection",
              description: "At current savings rate, you will reach your Emergency Fund goal in 2 months.",
              action: "Accelerate with extra deposits"
            }
          ].map((insight, index) => (
            <div key={index} className="p-4 bg-[var(--background-100)] rounded-lg">
              <div className="flex justify-between items-start mb-1">
                <h4 className="font-medium">{insight.title}</h4>
                <motion.button 
                  className="text-xs px-2 py-1 rounded text-[var(--primary-600)] bg-[var(--primary-100)]"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {insight.action}
                </motion.button>
              </div>
              <p className="text-sm opacity-80">{insight.description}</p>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}