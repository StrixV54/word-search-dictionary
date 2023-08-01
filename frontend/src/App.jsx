// import Dictionary from "./components/Dictionary.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Notebar from "./components/Notebar.jsx";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import backgroundDark from "./assets/bgDark.jpg";
import backgroundLight from "./assets/bgLight.jpg";
import { useState, useEffect, useContext } from "react";
import { SwitchContext } from "./context/SwitchTheme.jsx";
import actions from "./reducer/actions.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentTime, getLocalHostURL, uuid } from "./utils/helper.jsx";
import axios from "axios";

function App() {
  const [isDarkMode, handleToggle] = useContext(SwitchContext);
  const noteData = useSelector((state) => state.notebox.noteList);
  const tabData = useSelector((state) => state.sidetab.tabList);
  const activeTab = useSelector((state) => state.sidetab.activeTab);
  const dispatch = useDispatch();

  const getTabs = async () => {
    try {
      const { data } = await axios.get(`${getLocalHostURL}/gettabs`);
      console.log(data);
    } catch (error) {
      throw new error();
    }
  };

  const getNotes = async (tabName) => {
    try {
      const { data } = await axios.get(`${getLocalHostURL}/getnotes/${tabName}`);
      console.log(data);
    } catch (error) {
      throw new error();
    }
  };

  useEffect(() => {
    console.log("useEff");
    const data = JSON.parse(localStorage.getItem("TabsData"));
    if (data) {
      dispatch({ type: actions.FETCH_TABS, newList: [...data] });
      const currentTab = data[0].text;
      dispatch({ type: actions.ACTIVE_TAB, text: currentTab });
      const data1 = JSON.parse(localStorage.getItem(currentTab));
      if (data1) dispatch({ type: actions.FETCH_ITEMS, newList: [...data1] });
    }
  }, []);

  useEffect(() => {
    if (tabData?.length !== 0) {
      if (activeTab) localStorage.setItem(activeTab, JSON.stringify(noteData));
      localStorage.setItem("TabsData", JSON.stringify(tabData));
    }
  }, [noteData, tabData]);

  // const myStyle = {
  //   backgroundImage: `url(${isDarkMode ? backgroundDark : backgroundLight})`,
  //   height: "100vh",
  //   backgroundSize: "cover",
  //   backgroundRepeat: "no-repeat",
  // };

  return (
    <div className="App h-full w-full flex flex-col bg-[#f9f9f9] dark:bg-[#1a1c21]">
      <Header />
      <div className="flex w-full h-full f-edge overflow-hidden">
        <Sidebar />
        <div className="w-1 dark:bg-white/5 bg-black/5 rounded-lg mb-3 md:block hidden"></div>
        <Notebar />
      </div>
      <Footer />
    </div>
  );
}

export default App;
