import { createContext, useEffect, useState } from "react";

const SwitchResize = createContext();

const ResizeProvider = ({ children }) => {
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => setWindowSize(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <SwitchResize.Provider value={[windowSize, setWindowSize]}>
      {children}
    </SwitchResize.Provider>
  );
};

export { SwitchResize, ResizeProvider };
