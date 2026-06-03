import { createContext, useContext, useState, useCallback } from 'react';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [currentSection, setCurrentSection] = useState(0);
  const [isDark, setIsDark] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSkill, setActiveSkill] = useState(null);

  const toggleTheme = useCallback(() => setIsDark(d => !d), []);

  return (
    <AppContext.Provider value={{
      currentSection, setCurrentSection,
      isDark, toggleTheme,
      isLoading, setIsLoading,
      activeSkill, setActiveSkill,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
