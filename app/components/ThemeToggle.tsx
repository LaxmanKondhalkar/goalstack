'use client';

import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const cycleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('system');
    } else {
      setTheme('light');
    }
  };

  return (
    <button
      onClick={cycleTheme}
      className="flex items-center justify-center w-9 h-9 rounded-full transition-colors duration-200 hover:bg-opacity-20 hover:bg-accent"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Sun size={18} />
      ) : theme === 'dark' ? (
        <Moon size={18} />
      ) : (
        <Monitor size={18} />
      )}
    </button>
  );
}