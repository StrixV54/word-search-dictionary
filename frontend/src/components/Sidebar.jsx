import { useEffect, useRef, useState } from "react";
import Tab from "./Tab.jsx";
import actions from "../reducer/actions.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentTime, uuid } from "../utils/helper.jsx";
import { AiOutlinePlus, AiOutlineArrowUp } from "react-icons/ai";

export default function Sidebar() {
  // const { activeTab, toggleTab, createNewTab, noteTab, deleteTab } = props;
  const [toggle, setToggle] = useState(false);
  const inputTabRef = useRef(null);
  const noteTabList = useSelector((state) => state.sidetab.tabList);
  const dispatch = useDispatch();

  const handleButtonClick = () => {
    const input = inputTabRef.current.value;
    if (input.length !== 0) {
      console.log("Added " + input);
      // createNewTab(input);
      dispatch({
        type: actions.ADD_TAB,
        id: uuid(),
        text: input,
        time: getCurrentTime,
      });
      inputTabRef.current.value = "";
      dispatch({ type: actions.ACTIVE_TAB, text: input });
      setToggle(false);
    }
  };

  const changeToggle = () => {
    setToggle((prev) => !prev);
  };

  return (
    <div className="max-w-[300px] flex md:block rounded-lg p-1 m-3 pb-3 overflow-hidden flex-col">
      <button
        className="relative inline-flex items-center justify-center p-0.5 mb-3 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-violet-400 dark:from-violet-300/60 to-blue-300 dark:to-blue-500/50 hover:from-purple-500 hover:to-blue-400 hover:text-white dark:text-white w-full"
        onClick={changeToggle}
      >
        <span className="flex relative px-3 py-2 transition-all ease-in duration-75 bg-[#f5f5f5] dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 w-full">
          {toggle ? (
            <AiOutlineArrowUp className="w-5 h-5 mr-4" />
          ) : (
            <AiOutlinePlus className="w-5 h-5 mr-4" />
          )}
          New Category Tab
        </span>
      </button>
      {toggle && (
        <div className="Search-bar mb-4 flex">
          <input
            className="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none flex-1 text-sm leading-6 text-white placeholder-slate-300  dark:placeholder-slate-400 rounded-xl py-1 pl-5 shadow-sm bg-black/40 dark:bg-black/40 border border-gray-600"
            type="text"
            aria-label="Enter Tab Name"
            placeholder="New Tab"
            ref={inputTabRef}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleButtonClick();
            }}
          />
          <button
            className="items-center justify-center h-8 w-8 align-center rounded-full ml-2 text-white bg-blue-700/80 hover:bg-blue-500 dark:bg-blue-600/20 dark:hover:bg-blue-600/60"
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

      <div className="overflow-y-scroll">
        {noteTabList &&
          noteTabList.map((tabData) => (
            <Tab
              key={tabData.id}
              id={tabData.id}
              text={tabData.text}
              time={tabData.time}
              // input={inputTabRef}
              // deleteTab={deleteTab}
              // toggleTab={toggleTab}
              // active={tabData.text === activeTab ? true : false}
            />
          ))}
      </div>
    </div>
  );
}
