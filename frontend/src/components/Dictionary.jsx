import { useEffect, useState } from "react";
import axios from "axios";
import Results from "./Results.jsx";

export default function Dictionary(props) {
  let [keyword, setKeyword] = useState(props.text);
  let [results, setResults] = useState(null);
  let [errorOccured, setErrorOccured] = useState(null);

  function handleDictionaryResponse(response) {
    // console.log(response);
    setResults(response.data[0]);
  }

  useEffect(() => {
    Search();
  }, []);

  function Search(event) {
    event?.preventDefault();
    let apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en_US/${keyword}`;
    console.log(keyword);
    axios
      .get(apiUrl, { headers: { "Content-Type": "" } })
      .then((res) => {
        setErrorOccured(null);
        handleDictionaryResponse(res);
      })
      .catch((e) => {
        if (e.response.status !== 200) setErrorOccured(e.response.data.message);
      });
  }

  function handleKeywordChange(event) {
    setKeyword(event.target.value);
  }

  return (
    <div className="popup rounded-xl p-2 bg-violet-950 text-white flex flex-col">
      <form onSubmit={Search} className="flex mt-2">
        <input
          className="focus:ring-2 focus:ring-blue-500 h-11 focus:outline-none appearance-none flex-1 text-sm leading-6 text-slate-400 placeholder-slate-400 rounded-lg pl-4 pr-2 ring-1 ring-slate-500 shadow-sm bg-gray-700 border ml-2 border-gray-600"
          type="search"
          onChange={handleKeywordChange}
          value={keyword}
        />
        <button
          type="button"
          className="rounded-full items-center justify-content hover:text-slate-300 text-slate-400 font-semibold ring-2 hover:ring-sky-600 flex h-11 px-2 w-11 ml-3"
          onClick={Search}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-7 h-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
        {props.readMode === false ? (
          <button
            type="button"
            className="rounded-full items-center justify-content hover:text-slate-300 text-slate-400 font-semibold ring-2 hover:ring-green-600 flex h-11 w-11 px-2 ml-3"
            onClick={props.saveHandler}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </button>
        ) : (
          ""
        )}
        <button
          type="button"
          className="rounded-full items-center justify-content hover:text-slate-300 text-slate-400 font-semibold ring-2 hover:ring-red-400 flex mx-3 h-11 w-11 px-2"
          onClick={() => {
            props.setVisible(false);
            props.setInputText("");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-7 h-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      </form>
      <section className="overflow-scroll h-full mx-2 my-3">
        {errorOccured === null ? (
          <Results results={results} />
        ) : (
          <h2 className="m-3">{errorOccured}</h2>
        )}
      </section>
    </div>
  );
}
