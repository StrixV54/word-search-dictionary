import { createContext, useEffect, useState } from "react";

const SwitchContext = createContext();

const SwitchProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [windowSize, setWindowSize] = useState([window.innerWidth]);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  useEffect(() => {
    const isDarkSet = localStorage.getItem("DarkMode");
    console.log("Dark", isDarkSet, "Hook", isDarkMode);
    if (isDarkSet === "true") setIsDarkMode(true);
    else setIsDarkMode(false);
  }, []);

  useEffect(() => {
    const darkModeClass = "dark";
    const body = document.body;
    if (isDarkMode === true) {
      body.classList.add(darkModeClass);
    } else {
      body.classList.remove(darkModeClass);
    }
  }, [isDarkMode]);

  const handleToggle = () => {
    if (isDarkMode === false) localStorage.setItem("DarkMode", true);
    else localStorage.setItem("DarkMode", false);
    setIsDarkMode((prev) => !prev);
  };

  return (
    <SwitchContext.Provider value={[isDarkMode, handleToggle, windowSize]}>
      {children}
    </SwitchContext.Provider>
  );
};

export { SwitchContext, SwitchProvider };
