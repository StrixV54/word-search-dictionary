import { useEffect, useRef, useState } from "react";
import Tab from "./Tab.jsx";
import { v4 as uuid } from "uuid";

export default function Sidebar() {
  const [tabList, setTabList] = useState([]);
  const [toggle, setToggle] = useState(false);
  const inputTabRef = useRef(null);

  console.log("Refreshed");
  const handleButtonClick = () => {
    const tabValue = inputTabRef.current.value;
    if (tabValue !== "") {
      console.log(tabValue);
      const currentTimestamp = new Date().toLocaleString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
        day: "numeric",
        month: "numeric",
        year: "numeric",
        hour12: true,
      });
      setTabList((prev) => [
        {
          id: uuid(),
          text: tabValue,
          time: currentTimestamp,
        },
        ...prev,
      ]);
      inputTabRef.current.value = "";
      setToggle(false);
      localStorage.setItem("TabList", JSON.stringify(tabList));
    }
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("TabList"));
    if (data) {
      setTabList(data);
    }
  }, []);

  const changeToggle = () => {
    console.log(toggle);
    setToggle((prev) => !prev);
  };

  const deleteTab = (id) => {
    const tabListNew = tabList.filter((tab) => tab.id !== id);
    setTabList(tabListNew);
  };

  return (
    <div className="w-[250px] flex-none inline-block rounded-lg p-1 m-3">
      <button
        className="relative inline-flex items-center justify-center p-0.5 mb-3 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-violet-600 dark:from-violet-600 to-blue-500 dark:to-blue-500 hover:from-purple-600 hover:to-blue-500 hover:text-white dark:text-white w-full"
        onClick={changeToggle}
      >
        <span className="flex relative px-3 py-2 transition-all ease-in duration-75 bg-[#DDE0E6] dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 w-full">
          {toggle ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 15.75l7.5-7.5 7.5 7.5"
              />
            </svg>
          ) : (
            <svg
              width="20"
              height="20"
              fill="currentColor"
              className="mr-2"
              aria-hidden="true"
            >
              <path d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1Z" />
            </svg>
          )}
          New Category Tab
        </span>
      </button>
      {toggle && (
        <div className="Search-bar pb-2 flex">
          <input
            className="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none flex-1 text-sm leading-6 text-slate-200 placeholder-slate-300  dark:placeholder-slate-400 rounded-full py-2 pl-5 shadow-sm bg-black/40 dark:bg-black/40 border border-gray-600"
            type="text"
            aria-label="Enter Tab Name"
            placeholder="New Tab"
            ref={inputTabRef}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleButtonClick();
            }}
          />
          <button
            className="items-center justify-center align-center w-11 ring-1 rounded-full ml-2 bg-blue-700/80 hover:bg-blue-500 dark:bg-blue-600/20 dark:hover:bg-blue-600/40"
            onClick={handleButtonClick}
          >
            <svg
              width="20"
              height="20"
              fill="currentColor"
              className="m-auto scale-110"
              aria-hidden="true"
            >
              <path d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1Z" />
            </svg>
          </button>
        </div>
      )}
      {tabList.map((tab) => (
        <Tab key={tab.id} {...tab} deleteTab={deleteTab} />
      ))}
    </div>
  );
}
