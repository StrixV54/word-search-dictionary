import Tab from "./Tab.jsx";

export default function Sidebar() {
  return (
    <div className="w-[250px] flex-none inline-block rounded-lg p-1 m-3">
      <button className="relative inline-flex items-center justify-center p-0.5 mb-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 w-full">
        <span className="flex relative px-3 py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 w-full">
          <svg
            width="20"
            height="20"
            fill="currentColor"
            className="mr-2"
            aria-hidden="true"
          >
            <path d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1Z" />
          </svg>
          New Movie/Category
        </span>
      </button>
      <Tab />
      <Tab />
      <Tab />
    </div>
  );
}
