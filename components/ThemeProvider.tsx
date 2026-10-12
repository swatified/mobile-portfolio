'use client'

import React, { createContext, useContext, useEffect, useState, useTransition } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
  mounted: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // White theme is default unless explicitly toggled in localStorage
  const [theme, setThemeState] = useState<Theme>('light')
  const [mounted, setMounted] = useState(false)
  const [, startTransition] = useTransition()

  // Apply theme to DOM and save to localStorage
  const applyTheme = (nextTheme: Theme, save = true) => {
    startTransition(() => {
      setThemeState(nextTheme)
    })
    if (typeof window !== 'undefined') {
      if (nextTheme === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      if (save) {
        try {
          localStorage.setItem('theme', nextTheme)
        } catch {
          // ignore storage quota/security issues
        }
      }
    }
  }

  const setTheme = (nextTheme: Theme) => {
    applyTheme(nextTheme, true)
  }

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    applyTheme(next, true)
  }

  useEffect(() => {
    setMounted(true)
    try {
      const stored = localStorage.getItem('theme') as Theme | null
      // White theme is strictly default unless stored is 'dark'
      if (stored === 'dark') {
        setThemeState('dark')
        document.documentElement.classList.add('dark')
      } else {
        setThemeState('light')
        document.documentElement.classList.remove('dark')
      }
    } catch {
      setThemeState('light')
      document.documentElement.classList.remove('dark')
    }

    // Keep tabs / windows in sync
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'theme') {
        const next = e.newValue === 'dark' ? 'dark' : 'light'
        applyTheme(next, false)
      }
    }

    // Handle back/forward cache navigation
    const handlePageShow = () => {
      try {
        const stored = localStorage.getItem('theme') as Theme | null
        const active = stored === 'dark' ? 'dark' : 'light'
        applyTheme(active, false)
      } catch {
        // ignore
      }
    }

    window.addEventListener('storage', handleStorage)
    window.addEventListener('pageshow', handlePageShow)

    return () => {
      window.removeEventListener('storage', handleStorage)
      window.removeEventListener('pageshow', handlePageShow)
    }
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
