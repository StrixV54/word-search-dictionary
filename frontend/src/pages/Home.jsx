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
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
  // const [isDarkMode, handleToggle] = useContext(SwitchContext);
  // const noteData = useSelector((state) => state.notebox.noteList);
  // const tabData = useSelector((state) => state.sidetab.tabList);
  // const activeTab = useSelector((state) => state.sidetab.activeTab);
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
    !user && navigate("/login");

    load();
    if (activeDeleted) dispatch({ type: actions.RESETACTIVE });
    return () => {
      // dispatch({ type: actions.RESET });
    };
  }, [user, activeDeleted]);

  const load = async () => {
    const data = await getTabs();
    if (data || data.length !== 0) {
      dispatch({ type: actions.FETCH_TABS, newList: [...data] });
      // console.log("TabD", data);
      const currentTab = data[0]?.tabname;
      // console.log("Current", currentTab);
      dispatch({ type: actions.ACTIVE_TAB, text: currentTab });
      const { note } = await getNotes(currentTab);
      if (note) dispatch({ type: actions.FETCH_ITEMS, newList: [...note] });
    }
  };

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

  const getTabs = async () => {
    try {
      const { data } = await axiosLocal.get(`/gettabs`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(data);
      return data;
    } catch (error) {
      console.log("Error in Fetching Data");
    }
  };

  const getNotes = async (tabName) => {
    try {
      const { data } = await axiosLocal.get(`/getnotes/${tabName}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(data);
      return data;
    } catch (error) {
      console.log("Error in Fetching Data");
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
