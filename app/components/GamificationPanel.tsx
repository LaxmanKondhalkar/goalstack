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
      className="flex items-center p-2 sm:p-3 rounded-lg shadow-sm border border-text/10"
      style={{ background: 'var(--background)' }}
      whileHover={{ y: -2, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-xl sm:text-2xl mr-2 sm:mr-3">{badge.icon}</div>
      <div>
        <h4 className="font-medium text-sm sm:text-base">{badge.name}</h4>
        <p className="text-xs opacity-70 hidden sm:block">{badge.description}</p>
        <p className="text-xs opacity-70 sm:hidden">{badge.description.length > 30 
          ? badge.description.substring(0, 30) + '...' 
          : badge.description}
        </p>
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
      className="card bg-accent/5 border border-text/5"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg sm:text-xl font-semibold">Achievements</h2>
        <motion.div 
          className="px-2 py-1 sm:px-3 sm:py-1 rounded-full text-background text-xs font-medium"
          style={{ background: 'var(--accent)' }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Level {data.level}
        </motion.div>
      </div>
      
      {/* Stats */}
      <motion.div 
        className="grid grid-cols-2 gap-3 sm:gap-4 mb-6"
        variants={itemVariants}
      >
        <div className="p-3 sm:p-4 rounded-lg border border-text/10 flex items-center" style={{ background: 'var(--background)' }}>
          <div className="p-1 sm:p-2 rounded-full mr-2 sm:mr-3" style={{ background: 'var(--primary)', opacity: 0.2 }}>
            <Flame size={16} style={{ color: 'var(--primary)' }} />
          </div>
          <div>
            <p className="text-xs opacity-70">Daily Streak</p>
            <p className="text-sm sm:text-lg font-bold">{data.streak} days</p>
          </div>
        </div>
        
        <div className="p-3 sm:p-4 rounded-lg border border-text/10 flex items-center" style={{ background: 'var(--background)' }}>
          <div className="p-1 sm:p-2 rounded-full mr-2 sm:mr-3" style={{ background: 'var(--secondary)', opacity: 0.2 }}>
            <TrendingUp size={16} style={{ color: 'var(--secondary)' }} />
          </div>
          <div>
            <p className="text-xs opacity-70">Points</p>
            <p className="text-sm sm:text-lg font-bold">{data.points}</p>
          </div>
        </div>
      </motion.div>
      
      {/* Badges */}
      <div className="mb-3">
        <div className="flex items-center">
          <Award size={16} style={{ color: 'var(--accent)' }} className="mr-2" />
          <h3 className="font-medium text-sm sm:text-base">Earned Badges</h3>
        </div>
      </div>
      
      <motion.div 
        className="space-y-2 sm:space-y-3"
        variants={containerVariants}
      >
        {data.badges.map((badge) => (
          <Badge key={badge.id} badge={badge} />
        ))}
      </motion.div>
      
      {data.badges.length === 0 && (
        <motion.p 
          className="text-center opacity-70 py-4 sm:py-6 text-sm"
          variants={itemVariants}
        >
          No badges earned yet. Keep saving!
        </motion.p>
      )}
    </motion.div>
  );
}