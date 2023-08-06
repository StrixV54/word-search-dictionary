// import Dictionary from "./components/Dictionary.jsx";
import Sidebar from "../components/Sidebar.jsx";
import Notebar from "../components/Notebar.jsx";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import { useState, useEffect, useContext } from "react";
import { SwitchContext } from "../context/SwitchTheme.jsx";
import actions from "../reducer/actions.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentTime, getLocalHostURL, uuid } from "../utils/helper.jsx";
import axios from "axios";

function Home() {
  const [isDarkMode, handleToggle] = useContext(SwitchContext);
  const noteData = useSelector((state) => state.notebox.noteList);
  const tabData = useSelector((state) => state.sidetab.tabList);
  const activeTab = useSelector((state) => state.sidetab.activeTab);
  const dispatch = useDispatch();

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

  useEffect(() => {
    const load = async () => {
      const data = await getTabs();
      if (data) {
        dispatch({ type: actions.FETCH_TABS, newList: [...data] });
        // console.log("TabD", data);
        const currentTab = data[0]?.tabname;
        // console.log("Current", currentTab);
        dispatch({ type: actions.ACTIVE_TAB, text: currentTab });
        const { note } = await getNotes(currentTab);
        if (note) dispatch({ type: actions.FETCH_ITEMS, newList: [...note] });
      }
    };
    load();
  }, []);

  const getTabs = async () => {
    try {
      const { data } = await axios.get(`${getLocalHostURL}/gettabs`);
      // console.log(data);
      return data;
    } catch (error) {
      console.log("Error in Fetching Data");
    }
  };

  const getNotes = async (tabName) => {
    try {
      const { data } = await axios.get(
        `${getLocalHostURL}/getnotes/${tabName}`,
      );
      // console.log(data);
      return data;
    } catch (error) {
      console.log("Error in Fetching Data");
    }
  };

  // const myStyle = {
  //   backgroundImage: `url(${isDarkMode ? backgroundDark : backgroundLight})`,
  //   height: "100vh",
  //   backgroundSize: "cover",
  //   backgroundRepeat: "no-repeat",
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
