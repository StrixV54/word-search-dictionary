import { SwitchContext } from "../context/SwitchTheme";
import logo from "../assets/note.png";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdAccountCircle } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import actions from "../reducer/actions";

export default function Header() {
  const [isDarkMode, toggleMode] = useContext(SwitchContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: actions.RESETUSER });
    window.location.reload();
    // navigate("/login");
    // setTimeout(() => navigate("/login"), 500);
  };

  return (
    <div
      className="bg-[#ededed] dark:bg-[#111111] border-b border-gray-700/20 
    pt-4 pb-2 mb-3 mx-0 shadow-md w-full"
    >
      <div className="flex justify-between items-center f-edge">
        <div className="flex px-3 py-2 rounded-lg mx-3 mt-3">
          <span className="dark:ring-slate-700 ring-slate-400 ring-2 p-1 rounded-full h-12 w-12 justify-center">
            <img src={logo} className="h-10 w-10" />
          </span>
          <h1 className="text-[1.4rem] md:text-[1.8rem] font-kalam font-semibold text-slate-700 dark:text-gray-400 px-4 pt-2">
            Word Search Dictionary
          </h1>
        </div>
        <div className="flex flex-row items-center gap-4">
          <div className="text-gray-600 dark:text-gray-400 text-sm flex flex-row gap-1">
            <div className="flex flex-row mr-2">
              <span>{user?.name}</span>&nbsp;
              <MdAccountCircle className="h-5 w-5" />
            </div>
            <button onClick={logout} className="">
              Logout
            </button>
          </div>
          <button
            className="w-12 h-7 px-1 my-auto mr-8 border-2 border-gray-500 dark:border-gray-600 rounded-full"
            onClick={toggleMode}
          >
            <div className="h-4 w-4 bg-sky-700 rounded-full mr-auto dark:ml-auto dark:mr-0 animate" />
          </button>
        </div>
      </div>
    </div>
  );
}
