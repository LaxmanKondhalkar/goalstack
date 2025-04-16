import { mockSavingsGoals, mockMonthlySummary } from './data/mockData';
import GoalsList from './components/GoalsList';
import MonthlySummary from './components/MonthlySummary';

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-6xl">
      {/* App Header */}
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">GoalStack</h1>
            <p className="text-gray-600 text-sm mt-1">Student Savings Dashboard</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-600">April 16, 2025</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Savings Goals */}
        <div className="lg:col-span-2">
          <GoalsList initialGoals={mockSavingsGoals} />
        </div>

        {/* Right Column - Monthly Summary & Gamification */}
        <div className="space-y-6">
          <MonthlySummary data={mockMonthlySummary} />
          
          <div className="card border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Achievements</h2>
            <p className="text-gray-500">(Coming soon...)</p>
          </div>
        </div>
      </div>
    </main>
  );
}
