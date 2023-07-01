import { useState, useEffect, useRef } from "react";
import Note from "./Note.jsx";
import { v4 as uuid } from "uuid";
import Dictionary from "./Dictionary.jsx";

export default function Notebar() {
  const inputValueRef = useRef(null);
  const [wordNotes, setWordNotes] = useState([]);
  const [visible, setVisible] = useState(false);
  const [readOnlyMode, setReadOnlyMode] = useState(false);

  const saveHandler = () => {
    const inputValue = inputValueRef.current.value;
    if (inputValue.length != 0) {
      const currentTimestamp = new Date().toLocaleString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
        day: "numeric",
        month: "numeric",
        year: "numeric",
        hour12: true,
      });
      setWordNotes((prevState) => [
        ...prevState,
        {
          id: uuid(),
          text: inputValue,
          time: currentTimestamp,
        },
      ]);
      //clear the textarea
      inputValueRef.current.value = "";
      setVisible(false);
      localStorage.setItem("WordNotes", JSON.stringify(wordNotes));
    }
  };

  const deleteNote = (id) => {
    const filteredNotes = wordNotes.filter((note) => note.id !== id);
    setWordNotes(filteredNotes);
  };

  // useEffect(() => {
  //   localStorage.setItem("WordNotes", JSON.stringify(wordNotes));
  // }, [wordNotes]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("WordNotes"));
    if (data) {
      setWordNotes(data);
    }
  }, []);

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
    <div className="inline-block flex-1 rounded-md ml-3 mr-4 mb-5 p-2 relative dark:bg-[#060f1a] bg-[#b5b3b1] dark:ring-gray-900 dark:ring-1 backdrop-blur-lg">
      <div className="flex items-center justify-center mt-2">
        <input
          className="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none flex-1 text-sm leading-6 dark:text-slate-400 text-slate-300 
         dark:placeholder-slate-400 placeholder-gray-400 rounded-full py-2 pl-5 shadow-sm bg-black/40 border mr-3 ml-2 border-[#6e6058] dark:border-gray-600"
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
          className="h-10 w-10 hover:bg-emerald-600 flex items-center rounded-full bg-blue-500 justify-center shadow-sm mr-2"
          onClick={clickSearch}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>
        </button>
      </div>
      <div className="m-2 py-2 grid grid-flow-row lg:grid-cols-4 md:grid-cols-3 grid-rows-2 gap-3 sm:grid-cols-2">
        {wordNotes.map((note) => (
          <Note
            key={note.id}
            id={note.id}
            text={note.text}
            time={note.time}
            deleteNote={deleteNote}
            searchText={clickReadSearch}
          />
        ))}
      </div>
      {visible ? (
        <Dictionary
          saveHandler={saveHandler}
          text={inputValueRef.current.value}
          setVisible={setVisible}
          readMode={readOnlyMode}
          setInputText={inputValueRef}
        />
      ) : (
        ""
      )}
    </div>
  );
}
