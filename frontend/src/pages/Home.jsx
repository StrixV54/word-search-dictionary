// import Dictionary from "./components/Dictionary.jsx";
import Sidebar from "../components/Sidebar.jsx";
import Notebar from "../components/Notebar.jsx";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import { useState, useEffect, useContext } from "react";
import { SwitchContext } from "../context/SwitchTheme.jsx";
import actions from "../reducer/actions.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentTime, axiosLocal, uuid } from "../utils/helper.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
  // const [isDarkMode, handleToggle] = useContext(SwitchContext);
  // const noteData = useSelector((state) => state.notebox.noteList);
  // const tabData = useSelector((state) => state.sidetab.tabList);
  const activeTab = useSelector((state) => state.sidetab.activeTab);
  const activeDeleted = useSelector((state) => state.sidetab.isActiveDeleted);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  // const { goals, isLoading, isError, message } = useSelector(
  //   (state) => state.goals
  // )
  const token = user?.token;

  useEffect(() => {
    // console.log("home");
    // console.log(user);
    if (!user) {
      navigate("/login");
      return;
    }
    // console.log("user", user);
    const controller = new AbortController();

    const load = async () => {
      dispatch({ type: actions.ISLOADING });
      const data = await getTabs(controller);
      if (data && data.length !== 0) {
        dispatch({ type: actions.FETCH_TABS, newList: data });
        // console.log("TabD", data);
        const currentTab = activeTab || data[0]?.tabname;
        // console.log("Current", currentTab);
        dispatch({ type: actions.ACTIVE_TAB, text: currentTab });

        const data1 = await getNotes(currentTab, controller);
        const note = data1?.note;
        if (note) {
          dispatch({ type: actions.FETCH_ITEMS, newList: note });
        }
        dispatch({ type: actions.ISLOADED });
      }
    };
    load(controller);

    if (activeDeleted) dispatch({ type: actions.RESETACTIVE });

    return () => {
      dispatch({ type: actions.ISLOADED });
      controller.abort();
      // dispatch({ type: actions.RESET });
    };
  }, [user, activeTab, activeDeleted]);

  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const [sidebarToggle, setSidebarToggle] = useState(false);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(window.innerWidth);
    };
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  // useEffect(() => {
  //   const load = async () => {
  //     const data = await getTabs();
  //     if (data) {
  //       dispatch({ type: actions.FETCH_TABS, newList: [...data] });
  //       // console.log("TabD", data);
  //       const currentTab = data[0]?.tabname;
  //       // console.log("Current", currentTab);
  //       dispatch({ type: actions.ACTIVE_TAB, text: currentTab });
  //       const { note } = await getNotes(currentTab);
  //       if (note) dispatch({ type: actions.FETCH_ITEMS, newList: [...note] });
  //     }
  //   };
  //   load();
  // }, []);

  const getTabs = async (controller) => {
    try {
      const { data } = await axiosLocal.get(`/gettabs`, {
        signal: controller.signal,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(data);
      return data;
    } catch (error) {
      !error.message === "canceled" &&
        console.log("Error in Fetching Data ", error.message);
    }
  };

  const getNotes = async (tabName, controller) => {
    try {
      const { data } = await axiosLocal.get(`/getnotes/${tabName}`, {
        signal: controller.signal,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(data);
      return data;
    } catch (error) {
      !error.message === "canceled" &&
        console.log("Error in Fetching Data ", error.message);
    }
  };

  // const myStyle = {
  //   backgroundImage: `url(${isDarkMode ? backgroundDark : backgroundLight})`,
  //   height: "100vh", h-screen
  //   backgroundSize: "cover", bg-cover
  //   backgroundRepeat: "no-repeat", bg-no-repeat
  // };

  return (
    <div className="App relative h-full w-full flex flex-col bg-[#f9f9f9] dark:bg-[#1a1c21]">
      <ToastContainer
        className={"text-sm"}
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Header />
      <div className="flex w-full h-full f-edge overflow-hidden relative">
        <Sidebar
          width={windowSize}
          sidebarToggle={sidebarToggle}
          widthFun={setSidebarToggle}
        />
        <div className="w-1 dark:bg-white/5 bg-black/5 rounded-lg mb-8 md:block hidden"></div>
        <Notebar width={windowSize} widthFun={setSidebarToggle} />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
