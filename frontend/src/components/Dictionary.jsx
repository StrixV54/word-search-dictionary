/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Results from "./Results.jsx";
import { axiosLocal } from "../utils/helper.jsx";
import { useSelector } from "react-redux";

export default function Dictionary(props) {
  let [keyword, setKeyword] = useState(props.text);
  let [loading, setLoading] = useState(false);
  let [results, setResults] = useState(null);
  let [errorOccured, setErrorOccured] = useState({ error: false, msg: null });

  const handleDictionaryResponse = (response) => {
    console.log(response);
    setResults(response);
  };

  useEffect(() => {
    Search();
  }, []);

  const { token } = useSelector((state) => state.auth.user);

  const Search = (event) => {
    event?.preventDefault();
    setLoading(true);
    axiosLocal
      .get(`/dict/${keyword}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setLoading(false);
        setErrorOccured({ error: false, msg: null });
        handleDictionaryResponse(res);
      })
      .catch((e) => {
        setLoading(false);
        setErrorOccured({
          error: true,
          msg: e.response?.status !== 200 ? e.response?.data?.message : e,
        });
      });
  };

  function handleKeywordChange(event) {
    setKeyword(event.target.value);
  }

  return (
    <div
      className="popup rounded-xl p-2 bg-[#e1e1e1] border-2 text-black text-sm
    dark:bg-[#212020] border-[#8e8e8e] dark:border-[#444444] dark:text-white flex flex-col"
    >
      <form onSubmit={Search} className="flex mt-2">
        <input
          className="focus:ring-2 focus:ring-blue-500 h-11 focus:outline-none appearance-none flex-1 text-sm leading-6 text-slate-100 placeholder-slate-400 rounded-lg pl-4 pr-2 mr-4 ring-1 ring-slate-500 shadow-sm bg-gray-700 dark:bg-gray-700 border ml-2 w-full border-gray-600 dark:text-slate-200
          "
          type="search"
          onChange={handleKeywordChange}
          value={keyword}
        />
        <button
          type="button"
          className="rounded-full items-center justify-content font-semibold ring-2 hover:ring-sky-600 ring-[#5d5d5d] flex h-11 px-4 mr-3
          text-[#444444] hover:text-[#000000] dark:text-[#989898] dark:hover:text-[#ffffff]"
          onClick={Search}
        >
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
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
          Search
        </button>
      </form>
      <section className="overflow-scroll h-full mx-3 my-3">
        {!errorOccured.error ? (
          !loading ? (
            <Results results={results} />
          ) : (
            <h2 className="m-3">
              Please Wait..filtering results for you.
              <br />
              {errorOccured?.msg}
            </h2>
          )
        ) : (
          <h2 className="m-3">
            Some Error Ocurred. <br />
            {errorOccured?.msg}
          </h2>
        )}
      </section>
      <div className="flex flex-row-reverse mb-4">
        {props.readMode === false && (
          <button
            type="button"
            className="rounded-md items-center justify-content text-[#444444] hover:text-[#000000]
            dark:text-[#989898] dark:hover:text-[#ffffff] font-semibold ring-2 ring-[#5d5d5d] hover:ring-green-600 flex py-2 px-4 mr-4"
            onClick={props.saveHandler}
          >
            Save
          </button>
        )}
        <button
          type="button"
          className="rounded-md items-center justify-content text-[#444444] hover:text-[#000000]
          dark:text-[#989898] dark:hover:text-[#ffffff] font-semibold ring-2 hover:ring-red-400 ring-[#5d5d5d] flex mr-3 px-4 py-2"
          onClick={() => {
            props.setVisible(false);
            props.setInputText.current.value = "";
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
