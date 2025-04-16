'use client';

import { motion } from 'framer-motion';
import { Award, Flame, TrendingUp } from 'lucide-react';
import { GamificationData, Badge as BadgeType } from '../types';

interface GamificationPanelProps {
  data: GamificationData;
}

const Badge = ({ badge }: { badge: BadgeType }) => {
  return (
    <motion.div 
      className="flex items-center p-3 bg-white rounded-lg shadow-sm border border-gray-100"
      whileHover={{ y: -2, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-2xl mr-3">{badge.icon}</div>
      <div>
        <h4 className="font-medium text-gray-800">{badge.name}</h4>
        <p className="text-xs text-gray-500">{badge.description}</p>
      </div>
    </motion.div>
  );
};

export default function GamificationPanel({ data }: GamificationPanelProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1 
      } 
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };
  
  return (
    <motion.div 
      className="card bg-gradient-to-br from-indigo-50 to-purple-50"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Achievements</h2>
        <motion.div 
          className="px-3 py-1 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full text-white text-xs font-medium"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Level {data.level}
        </motion.div>
      </div>
      
      {/* Stats */}
      <motion.div 
        className="grid grid-cols-2 gap-4 mb-6"
        variants={itemVariants}
      >
        <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm flex items-center">
          <div className="bg-orange-100 p-2 rounded-full mr-3">
            <Flame size={18} className="text-orange-500" />
          </div>
          <div>
            <p className="text-xs text-gray-500">Daily Streak</p>
            <p className="text-lg font-bold text-gray-800">{data.streak} days</p>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm flex items-center">
          <div className="bg-blue-100 p-2 rounded-full mr-3">
            <TrendingUp size={18} className="text-blue-500" />
          </div>
          <div>
            <p className="text-xs text-gray-500">Points</p>
            <p className="text-lg font-bold text-gray-800">{data.points}</p>
          </div>
        </div>
      </motion.div>
      
      {/* Badges */}
      <div className="mb-3">
        <div className="flex items-center">
          <Award size={16} className="text-purple-500 mr-2" />
          <h3 className="font-medium text-gray-700">Earned Badges</h3>
        </div>
      </div>
      
      <motion.div 
        className="space-y-3"
        variants={containerVariants}
      >
        {data.badges.map((badge) => (
          <Badge key={badge.id} badge={badge} />
        ))}
      </motion.div>
      
      {data.badges.length === 0 && (
        <motion.p 
          className="text-center text-gray-500 py-6"
          variants={itemVariants}
        >
          No badges earned yet. Keep saving!
        </motion.p>
      )}
    </motion.div>
  );
}