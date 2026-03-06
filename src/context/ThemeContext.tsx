// src/context/ThemeContext.tsx
import { createContext, useContext, useEffect, useState } from 'react';

import type { ReactNode } from 'react';

// 1. Define the Constraints (The allowed states)
type UeTheme = 'prime' | 'root' | 'sage';

interface UeThemeContextProps {
  theme: UeTheme;
  setTheme: (theme: UeTheme) => void;
}

// 2. Initialize the Void
const UeThemeContext = createContext<UeThemeContextProps | undefined>(
  undefined,
);

export const UeThemeProvider = ({ children }: { children: ReactNode }) => {
  // 3. System Handshake: Check for saved environment, default to 'prime'
  const [theme, setThemeState] = useState<UeTheme>(() => {
    const savedTheme = localStorage.getItem('ue-active-loadout') as UeTheme;
    return savedTheme || 'prime';
  });

  const setTheme = (newTheme: UeTheme) => {
    setThemeState(newTheme);
    localStorage.setItem('ue-active-loadout', newTheme);
  };

  // 4. Asynchronous Execution: The DOM Injection
  // This useEffect bridges the React logic to your CSS data attributes
  useEffect(() => {
    // Inject the selected loadout into the root HTML tag
    document.documentElement.setAttribute('data-ue-theme', theme);

    // Ensure the terminal shell class is perpetually active on the body
    document.body.classList.add('ue-terminal-shell');

    // Cleanup (though rarely needed on the body tag for a global shell)
    return () => {
      document.body.classList.remove('ue-terminal-shell');
    };
  }, [theme]);

  return (
    <UeThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </UeThemeContext.Provider>
  );
};

// 5. The Access Hook (Verification)
export const useUeTheme = () => {
  const context = useContext(UeThemeContext);
  if (!context) {
    throw new Error(
      'SYSTEM TIMEOUT: useUeTheme must be used within a UeThemeProvider. The logic gate is missing.',
    );
  }
  return context;
};
