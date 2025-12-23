'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<Theme>('light'); // Always start with 'light' for SSR consistency

  useEffect(() => {
    setMounted(true);

    // Initialize theme based on localStorage and system preference after mount
    const hasPrivacyConsent = localStorage.getItem('privacy-consent') === 'true';
    const storedTheme = hasPrivacyConsent ? (localStorage.getItem('theme') as Theme | null) : null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const initialTheme = storedTheme || (prefersDark ? 'dark' : 'light');
    setTheme(initialTheme);
    document.documentElement.setAttribute('data-theme', initialTheme);
  }, []);

  const toggleTheme = () => {
    if (!mounted) return; // Prevent toggling before mount

    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);

    // Only save to localStorage if privacy consent is given
    const hasPrivacyConsent = localStorage.getItem('privacy-consent') === 'true';
    if (hasPrivacyConsent) {
      localStorage.setItem('theme', newTheme);
    }
  };

  const value = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}