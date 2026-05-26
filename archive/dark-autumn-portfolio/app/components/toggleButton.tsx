'use client';
import useDarkMode from '@/util/modeToggle';
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function ToggleButton() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
    }
  };

  return (
    <button
      onClick={toggleDarkMode}
      className='relative w-16 h-8 flex items-center bg-rose dark:bg-gold rounded-full p-1 transition-colors duration-300'
    >
      <div
        className={`absolute w-6 h-6 bg-ivory dark:bg-slate rounded-full transition-transform duration-300 transform ${
          isDarkMode ? 'translate-x-8' : 'translate-x-0'
        } flex items-center justify-center`}
      >
        {isDarkMode ? (
          <Moon size={16} className='text-gold' />
        ) : (
          <Sun size={16} className='text-rose' />
        )}
      </div>
    </button>
  );
}
