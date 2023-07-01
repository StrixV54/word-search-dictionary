import { SwitchContext } from "../context/SwitchTheme";
import logo from "../assets/data.png";
import { useContext } from "react";

export default function Header() {
  const [isDarkMode, toggleMode] = useContext(SwitchContext);

  return (
    <header className="App-header bg-[#d5d5d5] dark:bg-transparent flex justify-between border-b border-gray-700/20 pb-2 mb-3">
      <div className="flex px-3 py-2 rounded-lg mx-3 mt-3">
        <span className="dark:ring-slate-700 ring-slate-400 ring-2 p-1 rounded-full h-14 w-14 justify-center">
          <img src={logo} className="h-12 w-12" />
        </span>
        <h1 className="text-[1.8rem] font-kalam font-semibold text-slate-700 dark:text-gray-400 px-4 pt-2">
          Word Search Dictionary
        </h1>
      </div>
      <button
        className="w-12 h-7 p-1 my-auto mr-5 border-2 border-gray-500 dark:border-gray-600 rounded-full"
        onClick={toggleMode}
      >
        <div className="h-4 w-4 bg-sky-700 rounded-full mr-auto dark:ml-auto dark:mr-0 animate" />
      </button>
    </header>
  );
}
