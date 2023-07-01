export default function Note(props) {
  // eslint-disable-next-line react/prop-types
  const { deleteNote, text, id, time, searchText } = props;
  return (
    <div className="p-1 bg-[#d3d0cb] dark:bg-[#1c293b] shadow flex flex-col rounded-lg w-full">
      <div className="w-full flex justify-between">
        <button
          type="button"
          className="rounded-full items-center justify-content hover:text-red-500 text-[#ac5050] dark:text-[#ac415a] p-1 m-1 font-semibold"
          onClick={() => deleteNote(id)}
          title="Delete Note"
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
              d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
        <button
          type="button"
          className="rounded-full items-center justify-end hover:text-sky-700 p-1 text-slate-600 dark:hover:text-sky-400 dark:text-slate-400 font-semibold"
          onClick={() => {
            searchText(text);
          }}
          title="Search Web"
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
              d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
            />
          </svg>
        </button>
      </div>
      <div className="hori-scroll px-3 py-1 flex-1 w-full text-gray-900 dark:text-gray-300 whitespace-nowrap overflow-x-scroll">
        {text}
      </div>
      <div className="px-3 flex-1 text-[0.7rem] pt-2 text-gray-500">{time}</div>
    </div>
  );
}
