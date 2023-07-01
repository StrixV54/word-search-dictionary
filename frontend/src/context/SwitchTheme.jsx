import { createContext, useEffect, useState } from "react";

const SwitchContext = createContext();

const SwitchProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const darkModeClass = "dark";
    const body = document.body;

    if (isDarkMode) {
      body.classList.add(darkModeClass);
    } else {
      body.classList.remove(darkModeClass);
    }
  }, [isDarkMode]);

  const handleToggle = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <SwitchContext.Provider value={[isDarkMode, handleToggle]}>
      {children}
    </SwitchContext.Provider>
  );
};

export { SwitchContext, SwitchProvider };
