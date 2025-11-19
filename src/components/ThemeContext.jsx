import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('ril_theme') || 'dark')
  const [animations, setAnimations] = useState(() => {
    const v = localStorage.getItem('ril_anim')
    return v === null ? true : v === '1'
  })
  const [level, setLevel] = useState(() => localStorage.getItem('ril_level') || 'Beginner')
  const [onboarded, setOnboarded] = useState(() => localStorage.getItem('ril_onboarded') === '1')

  useEffect(() => { localStorage.setItem('ril_theme', theme) }, [theme])
  useEffect(() => { localStorage.setItem('ril_anim', animations ? '1' : '0') }, [animations])
  useEffect(() => { localStorage.setItem('ril_level', level) }, [level])
  useEffect(() => { localStorage.setItem('ril_onboarded', onboarded ? '1' : '0') }, [onboarded])

  const value = useMemo(() => ({ theme, setTheme, animations, setAnimations, level, setLevel, onboarded, setOnboarded }), [theme, animations, level, onboarded])
  return (
    <ThemeContext.Provider value={value}>
      <div className={theme === 'light' ? 'theme-light' : theme === 'neon' ? 'theme-neon' : 'theme-dark'}>
        {children}
      </div>
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
