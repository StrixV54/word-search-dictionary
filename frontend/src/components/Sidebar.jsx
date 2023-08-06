import { useContext, useEffect, useRef, useState } from "react";
import Tab from "./Tab.jsx";
import actions from "../reducer/actions.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentTime, getLocalHostURL, uuid } from "../utils/helper.jsx";
import { AiOutlinePlus, AiOutlineArrowUp } from "react-icons/ai";
import axios from "axios";
import { SwitchContext } from "../context/SwitchTheme.jsx";
import { TiThMenu } from "react-icons/ti";

export default function Sidebar(props) {
  const { width, sidebarToggle, widthFun } = props;
  const [toggle, setToggle] = useState(false);
  const inputTabRef = useRef(null);
  const noteTabList = useSelector((state) => state.sidetab.tabList);
  const dispatch = useDispatch();
  const [isDarkMode, toggleMode, windowSize] = useContext(SwitchContext);
  console.log(windowSize);

  const handleButtonClick = () => {
    const input = inputTabRef.current.value;
    if (input.length !== 0) {
      // console.log("Added " + input);
      // createNewTab(input);
      const id = uuid();
      saveTab(id, getCurrentTime, "Red", input);
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

  const saveTab = async (id, time, color, tabName) => {
    try {
      const res = await axios.post(
        `${getLocalHostURL}/addtab`,
        {
          id: id,
          tabname: tabName,
          time: time,
          color: color,
          notelist: "",
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );
      const data = await res;
      // console.log(data);
      // return data;
    } catch (error) {
      console.log("Error in connecting and saving Data");
    }
  };

  const changeToggle = () => {
    setToggle((prev) => !prev);
  };

  return width <= 640 && !sidebarToggle ? (
    ""
  ) : (
    <div
      className={`"max-w-[300px] flex rounded-lg p-1 m-3 pb-3 h-full overflow-hidden flex-col ${
        sidebarToggle &&
        "absolute left-0 bg-[#323138] overflow-hidden -translate-x-3 -translate-y-4 p-6 z-10"
      }`}
    >
      {width <= 640 && (
        <TiThMenu
          className="ml-auto items-end h-10 w-10 text-[#707070] hover:text-[#2b6aa9] mb-4"
          onClick={() => widthFun((prev) => !prev)}
        />
      )}
      <button
        className="relative inline-flex items-center justify-center p-0.5 mb-3 text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-violet-400 dark:from-violet-300/60 to-blue-300 dark:to-blue-500/50 hover:from-purple-500 hover:to-blue-400 hover:text-white dark:text-white w-full"
        onClick={changeToggle}
      >
        <span className="flex relative px-3 py-2 transition-all items-center ease-in duration-75 bg-[#f5f5f5] dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 w-full">
          {toggle ? (
            <AiOutlineArrowUp className="w-4 h-4 mr-2" />
          ) : (
            <AiOutlinePlus className="w-4 h-4 mr-2" />
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

      <div className="h-full overflow-scroll ver-scroll">
        {noteTabList &&
          noteTabList.map((tabData) => (
            <Tab
              key={tabData.id}
              id={tabData.id}
              text={tabData.tabname}
              time={tabData.time}
            />
          ))}
      </div>
    </div>
  );
}
