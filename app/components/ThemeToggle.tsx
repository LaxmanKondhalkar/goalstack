'use client';

import { Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeProvider';

/**
 * ThemeToggle component that provides a button to switch between light and dark themes
 * 
 * Uses the useTheme hook to access and modify the current theme.
 * Displays a Sun icon in light mode and Moon icon in dark mode.
 * 
 * @returns {JSX.Element} Button component with appropriate icon for current theme
 */
export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  /**
   * Toggles between light and dark themes
   */
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center w-9 h-9 rounded-full transition-colors duration-200 hover:bg-opacity-20 hover:bg-accent"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Sun size={18} />
      ) : (
        <Moon size={18} />
      )}
    </button>
  );
}