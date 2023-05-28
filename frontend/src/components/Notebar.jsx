import { useState, useEffect } from "react";
import Note from "./Note.jsx";
import { v4 as uuid } from "uuid";
import Dictionary from "./Dictionary.jsx";

export default function Notebar() {
  const [wordNotes, setWordNotes] = useState([]);
  const [inputText, setInputText] = useState("");
  const [visible, setVisible] = useState(false);
  const [readMode, setReadMode] = useState(false);

  const saveHandler = () => {
    if (inputText.length != 0) {
      setWordNotes((prevState) => [
        ...prevState,
        {
          id: uuid(),
          text: inputText,
        },
      ]);
      //clear the textarea
      setInputText("");
      setVisible(false);
      localStorage.setItem("WordNotes", JSON.stringify(wordNotes));
    }
  };

  const textHandler = (e) => {
    setInputText(e.target.value);
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
    if (inputText.length != 0) {
      setVisible(true);
      setReadMode(false);
    }
  };

  return (
    <div className="inline-block flex-1 rounded-md m-3 p-2 relative bg-slate-900 ring-gray-500 backdrop-blur-md shadow-inner">
      <div className="flex items-center justify-center mt-2">
        <input
          className="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none flex-1 text-sm leading-6 text-slate-400 placeholder-slate-400 rounded-lg py-2 pl-4 shadow-sm bg-black/40 border mr-3 ml-2 border-gray-600"
          type="text"
          aria-label="Web Search/Add Word"
          placeholder="Web Search/Add Word"
          onChange={textHandler}
          value={inputText}
          onKeyDown={(e) => {
            console.log(e);
            if (e.key === "Enter") clickSearch();
          }}
        />
        <button
          type="Button"
          className="h-10 w-10 hover:bg-blue-400 flex items-center rounded-full bg-blue-500 justify-center shadow-sm mr-2"
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
      <div className="m-2 py-2 grid grid-flow-row lg:grid-cols-4 md:grid-cols-3 grid-rows-2 gap-2 sm:grid-cols-2">
        {wordNotes.map((note) => (
          <Note
            key={note.id}
            id={note.id}
            text={note.text}
            deleteNote={deleteNote}
            searchText={setInputText}
            setVisible={setVisible}
            setReadMode={setReadMode}
          />
        ))}
      </div>
      {visible ? (
        <Dictionary
          saveHandler={saveHandler}
          text={inputText}
          setVisible={setVisible}
          readMode={readMode}
          setInputText={setInputText}
        />
      ) : (
        ""
      )}
    </div>
  );
}
