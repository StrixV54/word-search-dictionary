import actions from "../reducer/actions.jsx";
import { useDispatch, useSelector } from "react-redux";
import { IoSearchCircle } from "react-icons/io5";
import { AiFillMinusCircle } from "react-icons/ai";
import { axiosLocal } from "../utils/helper.jsx";

export default function Note(props) {
  // eslint-disable-next-line react/prop-types
  const { text, id, time, searchText } = props;
  const dispatch = useDispatch();
  const activeTab = useSelector((state) => state.sidetab.activeTab);
  const deleteCurrentNote = (id) => {
    dispatch({ type: actions.REMOVE_ITEM, id: id });
    deleteNote(activeTab, id);
  };
  const user = useSelector((state) => state.auth.user);
  const token = user?.token;

  const deleteNote = async (tabName, id) => {
    try {
      const { data } = await axiosLocal.delete(`/deletenote/${tabName}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(data);
      return data;
    } catch (error) {
      console.log("Error in connecting and deleting Data");
    }
  };

  return (
    <div className="bg-[#dadada] dark:bg-[#28282e] flex flex-col rounded-xl w-full border-0 border-slate-500">
      <div className="w-full flex justify-between">
        <button
          type="button"
          className="rounded-full items-center justify-content hover:text-red-500 text-[#ac5050] font-semibold p-1"
          onClick={() => deleteCurrentNote(id)}
          title="Delete Note"
        >
          <AiFillMinusCircle className="h-6 w-6 md:h-4 md:w-4" />
        </button>
        <button
          type="button"
          className="rounded-full items-center justify-end hover:text-sky-700 p-1 text-slate-600 dark:hover:text-sky-400 dark:text-slate-400 font-semibold"
          onClick={() => {
            searchText(text);
          }}
          title="Search Web"
        >
          <IoSearchCircle className="h-8 w-8 md:h-5 md:w-5" />
        </button>
      </div>
      <div className="hori-scroll px-3 py-1 flex-1 w-full text-zinc-900 dark:text-gray-300 whitespace-nowrap overflow-x-scroll">
        {text}
      </div>
      <div className="px-3 pb-2 flex-1 text-[9px] pt-2 text-gray-700 dark:text-gray-400">
        {time}
      </div>
    </div>
  );
}
