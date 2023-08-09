import { useDispatch, useSelector } from "react-redux";
import actions from "../reducer/actions.jsx";
import { axiosLocal } from "../utils/helper.jsx";

/* eslint-disable react/prop-types */
export default function Tab(props) {
  const { id, text, time, input } = props;

  const dispatch = useDispatch();
  const isActive = text === useSelector((state) => state.sidetab.activeTab);
  const user = useSelector((state) => state.auth.user);
  const token = user?.token;
  const tabData = useSelector((state) => state.sidetab.tabList);

  const deleteCurrentTab = (id) => {
    dispatch({ type: actions.REMOVE_TAB, id: id });
    deleteTab(id);
    console.log(tabData);
    // dispatch({ type: actions.FETCH_ITEMS, newList: [] });
  };

  const toggleTab = (input) => {
    const load = async () => {
      if (input?.length === 0) console.log("Empty tab");
      dispatch({ type: actions.ACTIVE_TAB, text: text });
      const data = await getNotes(text);
      console.log(data);
      if (data) {
        dispatch({ type: actions.FETCH_ITEMS, newList: [...data.note] });
      } else {
        dispatch({ type: actions.FETCH_ITEMS, newList: [] });
      }
    };
    load();
  };

  const getNotes = async (tabName) => {
    try {
      const { data } = await axiosLocal.get(`/getnotes/${tabName}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data);
      const dat = await axiosLocal.get(`/getnotes/${tabName}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(dat.data);
      return data;
    } catch (error) {
      console.log("Error in connecting and fetching Data");
    }
  };

  const deleteTab = async (id) => {
    try {
      const data = await axiosLocal.delete(`/deletetab/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data);
      return data;
    } catch (error) {
      console.log("Error in connecting and fetching Data");
    }
  };

  return (
    <div
      id={id}
      className={`flex items-center mb-3 rounded-md mt-1
        ${
          isActive
            ? "hover:bg-[#b3b3b3] hover:border-black/20 hover:dark:bg-[#000000] bg-[#e7e7e7] dark:bg-[#28282e] border-[2.5px] border-[#9e9e9e] dark:border-[#707073]"
            : " hover:bg-[#b3b3b3] hover:dark:bg-[#000000] bg-[#e7e7e7] dark:bg-[#28282e] border-[2.5px] border-[#e7e7e7] dark:border-[#28282e]"
        }
        `}
    >
      <button
        type="button"
        className="hori-scroll px-3 py-1 flex-1 flex items-center justify-between text-gray-700 dark:text-gray-300 text-sm
        whitespace-nowrap overflow-x-scroll"
        onClick={() => toggleTab(text)}
      >
        {text}
        <span className="text-[9px] text-gray-500 dark:text-gray-500">
          &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;{time}
        </span>
      </button>
      <button
        type="button"
        className="rounded-lg items-center justify-content font-semibold p-2 hover:bg-gray-100 dark:text-slate-600 dark:hover:bg-zinc-300 hover:text-slate-900 text-slate-500 hover:ring-1"
        onClick={() => deleteCurrentTab(id)}
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
      {/* <span className="h-[39px] w-2 rounded-e-[5px] bg-[#66574a] dark:bg-[#42525f]" />
          <span className="h-3 w-3 rounded-full bg-[#5f4329] dark:bg-[#3079b8] absolute right-0 translate-x-6" /> */}
    </div>
  );
}
