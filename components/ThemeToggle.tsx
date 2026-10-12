'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from './ThemeProvider'

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggleTheme, mounted } = useTheme()

  // Avoid hydration mismatch by rendering default light mode moon icon placeholder before mounting
  if (!mounted) {
    return (
      <button
        type="button"
        className={`theme-toggle ${className}`}
        aria-label="Switch to dark mode"
        title="Dark mode"
      >
        <Moon className="theme-toggle-icon is-moon" />
      </button>
    )
  }

  return (
    <button
      type="button"
      className={`theme-toggle ${className}`}
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
    >
      {theme === 'dark' ? (
        <Sun className="theme-toggle-icon is-sun" />
      ) : (
        <Moon className="theme-toggle-icon is-moon" />
      )}
    </button>
  )
}
