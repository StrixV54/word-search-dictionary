import { useState, useEffect, useRef, useContext } from "react";
import Note from "./Note.jsx";
import Dictionary from "./Dictionary.jsx";
import actions from "../reducer/actions.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentTime, axiosLocal, uuid } from "../utils/helper.jsx";
import { SwitchContext } from "../context/SwitchTheme.jsx";
import { TiThMenu } from "react-icons/ti";

export default function Notebar(props) {
  const { width, widthFun } = props;
  const inputValueRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [readOnlyMode, setReadOnlyMode] = useState(false);
  const noteData = useSelector((state) => state.notebox.noteList);
  const activeTab = useSelector((state) => state.sidetab.activeTab);
  const dispatch = useDispatch();
  const [isDarkMode, toggleMode] = useContext(SwitchContext);
  const user = useSelector((state) => state.auth.user);
  const token = user?.token;

  const saveHandler = () => {
    const inputValue = inputValueRef.current.value;
    if (inputValue.length != 0) {
      // console.log(inputValue);
      // saveNoteHandler(inputValue);
      const id = uuid();
      saveNote(id, inputValue, getCurrentTime, "Red", activeTab);
      dispatch({
        type: actions.ADD_ITEM,
        id: id,
        text: inputValue,
        time: getCurrentTime,
      });
      //clear the textarea
      inputValueRef.current.value = "";
      setVisible(false);
    }
  };

  const saveNote = async (id, text, time, color, tabName) => {
    try {
      const { body } = await axiosLocal.post(
        `/addnote/${tabName}`,
        {
          id: id,
          text: text,
          time: time,
          color: color,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(body);
      // return data;
    } catch (error) {
      console.log("Error in connecting and saving Data");
    }
  };

  const clickSearch = () => {
    const value = inputValueRef.current.value;
    if (value != 0) {
      setVisible(true);
      setReadOnlyMode(false);
    }
  };

  const clickReadSearch = (inp) => {
    const value = inp;
    if (value != 0) {
      inputValueRef.current.value = inp;
      setVisible(true);
      setReadOnlyMode(true);
    }
  };

  return (
    <div className="h-full w-full flex-1 rounded-md ml-3 mr-4 mb-5 p-2 relative">
      <div className="flex items-center justify-center mt-2 mb-4">
        {width <= 640 && (
          <TiThMenu
            className="h-9 w-9 text-[#707070] hover:text-[#2b6aa9]"
            onClick={() => widthFun((prev) => !prev)}
          />
        )}
        <input
          className="focus:ring-1 focus:ring-neutral-600 focus:outline-none appearance-none flex-1 text-sm leading-6 dark:text-slate-400 text-white
         dark:placeholder-slate-500 placeholder-gray-200 rounded-full py-2 pl-5 shadow-sm bg-black/40 border mr-3 ml-2 border-[#6e6058] dark:border-gray-600 dark:bg-[#1c1e24]"
          type="text"
          aria-label="Web Search/Add Word"
          placeholder="Web Search/Add Word"
          ref={inputValueRef}
          onKeyDown={(e) => {
            if (e.key === "Enter") clickSearch();
          }}
        />
        <button
          type="Button"
          className="h-10 w-10 hover:bg-[#7d74e4] flex items-center rounded-full bg-[#9d97de] 
           justify-center shadow-sm mr-2"
          onClick={clickSearch}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>
        </button>
      </div>
      {/* <div className="h-1 dark:bg-white/10 bg-black/10 rounded-lg md:block w-full"></div> */}
      {noteData.length === 0 && (
        <div className="w-full text-center p-4"> No Notes Present</div>
      )}
      <div className="m-2 py-2 grid grid-flow-row md:grid-cols-3 grid-cols-2 grid-rows-2 gap-4 ">
        {noteData.length > 0 &&
          noteData.map((note) => (
            <Note
              key={note.id}
              id={note.id}
              text={note.text}
              time={note.time}
              // deleteNote={deleteNote}
              searchText={clickReadSearch}
            />
          ))}
      </div>
      {visible && (
        <Dictionary
          saveHandler={saveHandler}
          text={inputValueRef.current.value}
          setVisible={setVisible}
          readMode={readOnlyMode}
          setInputText={inputValueRef}
        />
      )}
    </div>
  );
}
