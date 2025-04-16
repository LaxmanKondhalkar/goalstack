'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, User, Bell, PaintBucket, Shield, 
  CreditCard, Share2, HelpCircle, Check, Save, ChevronRight 
} from 'lucide-react';
import AppLayout from '../components/AppLayout';
import { mockUserProfile } from '../data/mockData';
import { UserProfile } from '../types';
import Image from 'next/image';

export default function SettingsPage() {
  const [user, setUser] = useState<UserProfile>(mockUserProfile);
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'appearance' | 'security' | 'payment' | 'sharing' | 'help'>('profile');
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [emailNotifications, setEmailNotifications] = useState<boolean>(true);
  const [pushNotifications, setPushNotifications] = useState<boolean>(true);
  const [weeklyReports, setWeeklyReports] = useState<boolean>(true);
  const [goalAlerts, setGoalAlerts] = useState<boolean>(true);
  const [accentColor, setAccentColor] = useState<string>('#3b82f6');

  // Mock saving changes
  const saveChanges = () => {
    // In a real app, this would call an API to save changes
    console.log('Changes saved', { user, darkMode, emailNotifications, pushNotifications });
    
    // Show success message
    const successToast = document.getElementById('success-toast');
    if (successToast) {
      successToast.classList.remove('translate-y-20', 'opacity-0');
      
      setTimeout(() => {
        successToast.classList.add('translate-y-20', 'opacity-0');
      }, 3000);
    }
  };

  return (
    <AppLayout>
      <div className="p-6">
        {/* Page Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--primary-400)] to-[var(--primary-600)] flex items-center justify-center text-[var(--background-50)]">
            <Settings size={20} />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Settings</h1>
            <p className="text-sm opacity-70">Customize your GoalStack experience</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
          {/* Settings Navigation */}
          <motion.div 
            className="card-bordered p-1 h-fit"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav>
              <ul className="space-y-1">
                <li>
                  <button 
                    onClick={() => setActiveTab('profile')}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg text-left ${
                      activeTab === 'profile' 
                        ? 'bg-gradient-to-r from-[var(--primary-400)] to-[var(--primary-500)] text-white' 
                        : 'hover:bg-[var(--background-100)]'
                    }`}
                  >
                    <User size={18} />
                    <span>Profile</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveTab('notifications')}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg text-left ${
                      activeTab === 'notifications' 
                        ? 'bg-gradient-to-r from-[var(--primary-400)] to-[var(--primary-500)] text-white' 
                        : 'hover:bg-[var(--background-100)]'
                    }`}
                  >
                    <Bell size={18} />
                    <span>Notifications</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveTab('appearance')}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg text-left ${
                      activeTab === 'appearance' 
                        ? 'bg-gradient-to-r from-[var(--primary-400)] to-[var(--primary-500)] text-white' 
                        : 'hover:bg-[var(--background-100)]'
                    }`}
                  >
                    <PaintBucket size={18} />
                    <span>Appearance</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveTab('security')}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg text-left ${
                      activeTab === 'security' 
                        ? 'bg-gradient-to-r from-[var(--primary-400)] to-[var(--primary-500)] text-white' 
                        : 'hover:bg-[var(--background-100)]'
                    }`}
                  >
                    <Shield size={18} />
                    <span>Security</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveTab('payment')}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg text-left ${
                      activeTab === 'payment' 
                        ? 'bg-gradient-to-r from-[var(--primary-400)] to-[var(--primary-500)] text-white' 
                        : 'hover:bg-[var(--background-100)]'
                    }`}
                  >
                    <CreditCard size={18} />
                    <span>Payment Methods</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveTab('sharing')}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg text-left ${
                      activeTab === 'sharing' 
                        ? 'bg-gradient-to-r from-[var(--primary-400)] to-[var(--primary-500)] text-white' 
                        : 'hover:bg-[var(--background-100)]'
                    }`}
                  >
                    <Share2 size={18} />
                    <span>Sharing & Privacy</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveTab('help')}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg text-left ${
                      activeTab === 'help' 
                        ? 'bg-gradient-to-r from-[var(--primary-400)] to-[var(--primary-500)] text-white' 
                        : 'hover:bg-[var(--background-100)]'
                    }`}
                  >
                    <HelpCircle size={18} />
                    <span>Help & Support</span>
                  </button>
                </li>
              </ul>
            </nav>
          </motion.div>

          {/* Settings Content */}
          <motion.div 
            className="card-bordered p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            key={activeTab}
          >
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-xl font-bold mb-6">Profile Settings</h2>
                <div className="flex flex-col md:flex-row gap-6 mb-6">
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <Image 
                        src={user.avatar || 'https://via.placeholder.com/100'} 
                        alt="Profile" 
                        width={96}
                        height={96}
                        className="w-24 h-24 rounded-full object-cover border-4 border-[var(--background-50)]"
                      />
                      <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[var(--primary-500)] text-white flex items-center justify-center">
                        <PaintBucket size={14} />
                      </button>
                    </div>
                  </div>

                  <div className="flex-grow space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-1 opacity-70">Full Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        value={user.name}
                        onChange={(e) => setUser({...user, name: e.target.value})}
                        className="w-full p-3 rounded-lg border border-[var(--background-200)] bg-[var(--background-50)]"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-1 opacity-70">Email Address</label>
                      <input 
                        type="email" 
                        id="email" 
                        value={user.email}
                        onChange={(e) => setUser({...user, email: e.target.value})}
                        className="w-full p-3 rounded-lg border border-[var(--background-200)] bg-[var(--background-50)]"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-6">
                  <div>
                    <label htmlFor="savingsGoal" className="block text-sm font-medium mb-1 opacity-70">Monthly Savings Goal ($)</label>
                    <input 
                      type="number" 
                      id="savingsGoal" 
                      value={user.savingsGoal}
                      onChange={(e) => setUser({...user, savingsGoal: Number(e.target.value)})}
                      className="w-full p-3 rounded-lg border border-[var(--background-200)] bg-[var(--background-50)]"
                    />
                  </div>
                  <div>
                    <label htmlFor="monthlyBudget" className="block text-sm font-medium mb-1 opacity-70">Monthly Budget ($)</label>
                    <input 
                      type="number" 
                      id="monthlyBudget" 
                      value={user.monthlyBudget}
                      onChange={(e) => setUser({...user, monthlyBudget: Number(e.target.value)})}
                      className="w-full p-3 rounded-lg border border-[var(--background-200)] bg-[var(--background-50)]"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-[var(--background-200)]">
                  <button 
                    onClick={saveChanges}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[var(--primary-400)] to-[var(--primary-500)] text-white rounded-lg"
                  >
                    <Save size={16} />
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div>
                <h2 className="text-xl font-bold mb-6">Notification Preferences</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-[var(--background-50)]">
                    <div>
                      <h3 className="font-medium">Email Notifications</h3>
                      <p className="text-sm opacity-70">Receive updates and alerts via email</p>
                    </div>
                    <button 
                      onClick={() => setEmailNotifications(!emailNotifications)}
                      className={`w-12 h-6 rounded-full relative transition-colors ${emailNotifications ? 'bg-[var(--primary-500)]' : 'bg-[var(--background-300)]'}`}
                    >
                      <span 
                        className={`block w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${
                          emailNotifications ? 'transform translate-x-6' : 'transform translate-x-0.5'
                        }`} 
                      />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 rounded-lg bg-[var(--background-50)]">
                    <div>
                      <h3 className="font-medium">Push Notifications</h3>
                      <p className="text-sm opacity-70">Get alerts on your desktop or mobile</p>
                    </div>
                    <button 
                      onClick={() => setPushNotifications(!pushNotifications)}
                      className={`w-12 h-6 rounded-full relative transition-colors ${pushNotifications ? 'bg-[var(--primary-500)]' : 'bg-[var(--background-300)]'}`}
                    >
                      <span 
                        className={`block w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${
                          pushNotifications ? 'transform translate-x-6' : 'transform translate-x-0.5'
                        }`} 
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg bg-[var(--background-50)]">
                    <div>
                      <h3 className="font-medium">Weekly Summary Reports</h3>
                      <p className="text-sm opacity-70">Get a weekly summary of your financial progress</p>
                    </div>
                    <button 
                      onClick={() => setWeeklyReports(!weeklyReports)}
                      className={`w-12 h-6 rounded-full relative transition-colors ${weeklyReports ? 'bg-[var(--primary-500)]' : 'bg-[var(--background-300)]'}`}
                    >
                      <span 
                        className={`block w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${
                          weeklyReports ? 'transform translate-x-6' : 'transform translate-x-0.5'
                        }`} 
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg bg-[var(--background-50)]">
                    <div>
                      <h3 className="font-medium">Goal Achievement Alerts</h3>
                      <p className="text-sm opacity-70">Be notified when you reach a savings milestone</p>
                    </div>
                    <button 
                      onClick={() => setGoalAlerts(!goalAlerts)}
                      className={`w-12 h-6 rounded-full relative transition-colors ${goalAlerts ? 'bg-[var(--primary-500)]' : 'bg-[var(--background-300)]'}`}
                    >
                      <span 
                        className={`block w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${
                          goalAlerts ? 'transform translate-x-6' : 'transform translate-x-0.5'
                        }`} 
                      />
                    </button>
                  </div>
                </div>

                <div className="pt-4 border-t border-[var(--background-200)]">
                  <button 
                    onClick={saveChanges}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[var(--primary-400)] to-[var(--primary-500)] text-white rounded-lg"
                  >
                    <Save size={16} />
                    <span>Save Preferences</span>
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'appearance' && (
              <div>
                <h2 className="text-xl font-bold mb-6">Appearance Settings</h2>
                
                <div className="space-y-6 mb-6">
                  <div>
                    <h3 className="font-medium mb-3">Theme Mode</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <button 
                        onClick={() => setDarkMode(false)}
                        className={`relative p-4 rounded-lg border-2 ${!darkMode ? 'border-[var(--primary-500)]' : 'border-[var(--background-200)]'}`}
                      >
                        <div className="h-20 bg-white rounded-md flex items-center justify-center">
                          <span className="text-black">Light Mode</span>
                        </div>
                        {!darkMode && (
                          <div className="absolute top-2 right-2 w-6 h-6 bg-[var(--primary-500)] rounded-full flex items-center justify-center text-white">
                            <Check size={14} />
                          </div>
                        )}
                      </button>
                      <button 
                        onClick={() => setDarkMode(true)}
                        className={`relative p-4 rounded-lg border-2 ${darkMode ? 'border-[var(--primary-500)]' : 'border-[var(--background-200)]'}`}
                      >
                        <div className="h-20 bg-gray-900 rounded-md flex items-center justify-center">
                          <span className="text-white">Dark Mode</span>
                        </div>
                        {darkMode && (
                          <div className="absolute top-2 right-2 w-6 h-6 bg-[var(--primary-500)] rounded-full flex items-center justify-center text-white">
                            <Check size={14} />
                          </div>
                        )}
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-3">Accent Color</h3>
                    <div className="grid grid-cols-5 gap-4">
                      {['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'].map(color => (
                        <button 
                          key={color}
                          onClick={() => setAccentColor(color)}
                          className={`relative w-full aspect-square rounded-full`}
                          style={{ backgroundColor: color }}
                        >
                          {accentColor === color && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                                <Check size={14} style={{ color }} />
                              </div>
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[var(--background-200)]">
                  <button 
                    onClick={saveChanges}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[var(--primary-400)] to-[var(--primary-500)] text-white rounded-lg"
                  >
                    <Save size={16} />
                    <span>Save Appearance</span>
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div>
                <h2 className="text-xl font-bold mb-6">Security Settings</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="p-4 rounded-lg bg-[var(--background-50)]">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Change Password</h3>
                        <p className="text-sm opacity-70">Update your account password</p>
                      </div>
                      <button className="p-2 hover:bg-[var(--background-100)] rounded-lg">
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-[var(--background-50)]">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Two-Factor Authentication</h3>
                        <p className="text-sm opacity-70">Add an extra layer of security</p>
                      </div>
                      <button className="p-2 hover:bg-[var(--background-100)] rounded-lg">
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-[var(--background-50)]">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Active Sessions</h3>
                        <p className="text-sm opacity-70">Manage your logged-in devices</p>
                      </div>
                      <button className="p-2 hover:bg-[var(--background-100)] rounded-lg">
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-[var(--background-50)]">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Login History</h3>
                        <p className="text-sm opacity-70">View recent account activity</p>
                      </div>
                      <button className="p-2 hover:bg-[var(--background-100)] rounded-lg">
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'payment' && (
              <div>
                <h2 className="text-xl font-bold mb-6">Payment Methods</h2>
                
                <div className="space-y-6 mb-6">
                  <div className="p-6 rounded-lg bg-[var(--background-50)] border border-[var(--background-200)]">
                    <h3 className="font-medium mb-4">Connected Accounts</h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-[var(--background-100)] rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-500 rounded-md flex items-center justify-center text-white font-bold">
                            B
                          </div>
                          <div>
                            <p className="font-medium">Bank of America</p>
                            <p className="text-xs opacity-70">Connected on April 2, 2025</p>
                          </div>
                        </div>
                        <button className="text-[var(--primary-500)] hover:underline text-sm">
                          Disconnect
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-[var(--background-100)] rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-green-500 rounded-md flex items-center justify-center text-white font-bold">
                            C
                          </div>
                          <div>
                            <p className="font-medium">Chase Bank</p>
                            <p className="text-xs opacity-70">Connected on March 15, 2025</p>
                          </div>
                        </div>
                        <button className="text-[var(--primary-500)] hover:underline text-sm">
                          Disconnect
                        </button>
                      </div>
                    </div>
                    
                    <button className="mt-4 flex items-center gap-2 px-4 py-2 border border-dashed border-[var(--background-300)] text-[var(--primary-500)] rounded-lg">
                      <Plus size={16} />
                      <span>Connect New Account</span>
                    </button>
                  </div>
                  
                  <div className="p-6 rounded-lg bg-[var(--background-50)] border border-[var(--background-200)]">
                    <h3 className="font-medium mb-4">Credit & Debit Cards</h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-[var(--background-100)] rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-purple-500 rounded-md flex items-center justify-center text-white">
                            <CreditCard size={20} />
                          </div>
                          <div>
                            <p className="font-medium">Visa ending in 4242</p>
                            <p className="text-xs opacity-70">Expires 05/27</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs py-1 px-2 bg-[var(--primary-100)] text-[var(--primary-600)] rounded-full">
                            Default
                          </span>
                          <button className="text-[var(--primary-500)] hover:underline text-sm">
                            Edit
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <button className="mt-4 flex items-center gap-2 px-4 py-2 border border-dashed border-[var(--background-300)] text-[var(--primary-500)] rounded-lg">
                      <Plus size={16} />
                      <span>Add Payment Method</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'sharing' && (
              <div>
                <h2 className="text-xl font-bold mb-6">Sharing & Privacy</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-[var(--background-50)]">
                    <div>
                      <h3 className="font-medium">Public Profile</h3>
                      <p className="text-sm opacity-70">Allow others to see your profile</p>
                    </div>
                    <button className={`w-12 h-6 rounded-full relative transition-colors bg-[var(--background-300)]`}>
                      <span className={`block w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform transform translate-x-0.5`} />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 rounded-lg bg-[var(--background-50)]">
                    <div>
                      <h3 className="font-medium">Share Achievements</h3>
                      <p className="text-sm opacity-70">Let friends see when you reach goals</p>
                    </div>
                    <button className={`w-12 h-6 rounded-full relative transition-colors bg-[var(--primary-500)]`}>
                      <span className={`block w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform transform translate-x-6`} />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 rounded-lg bg-[var(--background-50)]">
                    <div>
                      <h3 className="font-medium">Allow Friend Requests</h3>
                      <p className="text-sm opacity-70">Let other users connect with you</p>
                    </div>
                    <button className={`w-12 h-6 rounded-full relative transition-colors bg-[var(--primary-500)]`}>
                      <span className={`block w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform transform translate-x-6`} />
                    </button>
                  </div>
                </div>

                <div className="pt-4 border-t border-[var(--background-200)]">
                  <button 
                    onClick={saveChanges}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[var(--primary-400)] to-[var(--primary-500)] text-white rounded-lg"
                  >
                    <Save size={16} />
                    <span>Save Privacy Settings</span>
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'help' && (
              <div>
                <h2 className="text-xl font-bold mb-6">Help & Support</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="p-4 rounded-lg bg-[var(--background-50)]">
                    <h3 className="font-medium mb-2">Documentation</h3>
                    <p className="text-sm opacity-70 mb-3">Learn how to use GoalStack effectively</p>
                    <button className="text-[var(--primary-500)] hover:underline text-sm flex items-center gap-1">
                      <span>View Documentation</span>
                      <ChevronRight size={16} />
                    </button>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-[var(--background-50)]">
                    <h3 className="font-medium mb-2">Contact Support</h3>
                    <p className="text-sm opacity-70 mb-3">Get help with any issues or questions</p>
                    <button className="text-[var(--primary-500)] hover:underline text-sm flex items-center gap-1">
                      <span>Contact Support Team</span>
                      <ChevronRight size={16} />
                    </button>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-[var(--background-50)]">
                    <h3 className="font-medium mb-2">Feedback</h3>
                    <p className="text-sm opacity-70 mb-3">Share your thoughts and suggestions</p>
                    <button className="text-[var(--primary-500)] hover:underline text-sm flex items-center gap-1">
                      <span>Submit Feedback</span>
                      <ChevronRight size={16} />
                    </button>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-[var(--background-50)]">
                    <h3 className="font-medium mb-2">FAQs</h3>
                    <p className="text-sm opacity-70 mb-3">Find answers to common questions</p>
                    <button className="text-[var(--primary-500)] hover:underline text-sm flex items-center gap-1">
                      <span>Browse FAQs</span>
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>

                <div className="mt-6 p-4 rounded-lg bg-[var(--primary-50)] border border-[var(--primary-100)]">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-full bg-[var(--primary-100)]">
                      <HelpCircle size={20} className="text-[var(--primary-600)]" />
                    </div>
                    <div>
                      <h3 className="font-medium text-[var(--primary-700)] mb-1">Need immediate help?</h3>
                      <p className="text-sm text-[var(--primary-600)]">Our support team is available weekdays from 9am to 5pm PST.</p>
                      <button className="mt-2 px-3 py-1.5 bg-[var(--primary-500)] text-white rounded-lg text-sm">
                        Start Live Chat
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Success Toast */}
      <div 
        id="success-toast" 
        className="fixed bottom-5 right-5 bg-[var(--accent-500)] text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 translate-y-20 opacity-0 transition-all duration-300"
      >
        <Check size={18} />
        <span>Changes saved successfully!</span>
      </div>
    </AppLayout>
  );
}

// Missing component for the payment section
function Plus({ size = 24 }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  );
}