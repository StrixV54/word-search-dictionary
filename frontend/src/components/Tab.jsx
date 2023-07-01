/* eslint-disable react/prop-types */
export default function Tab(props) {
  const { id, text, time, deleteTab } = props;
  return (
    <div
      id={id}
      className="flex items-center mb-3 rounded-md my-1 backdrop-blur-sm hover:bg-white/10 bg-black/10 border-b border-gray-400 dark:border-gray-700 ring-gray-400/20 dark:ring-gray-700 hover:ring-1"
    >
      <button
        type="button"
        className="hori-scroll px-3 py-1 flex-1 text-left text-gray-700 dark:text-gray-300 whitespace-nowrap overflow-x-scroll h-[38px]"
      >
        {text}
        <span className="text-[0.6rem] text-gray-700 dark:text-gray-500">
          &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;{time}
        </span>
      </button>
      <button
        type="button"
        className="rounded-lg items-center justify-content font-semibold p-2 hover:bg-gray-100 dark:text-slate-400 dark:hover:bg-zinc-300 hover:text-slate-900 text-slate-500 hover:ring-1"
        onClick={() => deleteTab(id)}
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
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
      </button>
    </div>
  );
}
