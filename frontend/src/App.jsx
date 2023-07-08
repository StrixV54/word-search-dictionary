// import Dictionary from "./components/Dictionary.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Notebar from "./components/Notebar.jsx";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import backgroundDark from "./assets/bgDark.jpg";
import backgroundLight from "./assets/bgLight.jpg";
import { useState, useEffect, useContext } from "react";
import { SwitchContext } from "./context/SwitchTheme.jsx";
import { v4 as uuid } from "uuid";

function App() {
  const getCurrentTime = new Date().toLocaleString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour12: true,
  });
  const [activeTab, setActiveTab] = useState(null);
  const [noteTab, setNoteTab] = useState([]);
  const [noteData, setNoteData] = useState([]);
  const [isDarkMode, handleToggle] = useContext(SwitchContext);

  console.log("ActiveTab : " + activeTab);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("TabsData"));
    if (data) {
      setNoteTab(data);
      const noteTab = data[0]?.text;
      toggleTab(noteTab);
      const data1 = JSON.parse(localStorage.getItem(noteTab));
      if (data1) setNoteData(data1);
    }
  }, []);

  useEffect(() => {
    if (noteTab.length !== 0) {
      if (activeTab) localStorage.setItem(activeTab, JSON.stringify(noteData));
      localStorage.setItem("TabsData", JSON.stringify(noteTab));
    }
  }, [noteTab, noteData]);

  const toggleTab = (inputTab) => {
    if (inputTab?.length === 0) console.log("Empty tab");
    setActiveTab(inputTab);
    const data = JSON.parse(localStorage.getItem(inputTab));
    if (data) {
      setNoteData(data);
    } else {
      setNoteData([]);
    }
  };

  const saveTabHandler = (inputTabName) => {
    const currentTimestamp = getCurrentTime;
    const inputValue = inputTabName;
    setNoteTab((prevState) => {
      return [
        ...prevState,
        {
          id: uuid(),
          text: inputValue,
          time: currentTimestamp,
        },
      ];
    });
    setActiveTab(inputValue);
  };

  const saveNoteHandler = (input) => {
    const inputValue = input;
    const currentTimestamp = getCurrentTime;
    if (
      inputValue?.length !== 0 &&
      noteTab?.length !== 0 &&
      activeTab !== null
    ) {
      setNoteData((prev) => [
        ...prev,
        {
          id: uuid(),
          text: inputValue,
          time: currentTimestamp,
        },
      ]);
    } else {
      console.log("Something is empty");
    }
  };

  const deleteTab = (id) => {
    const filteredNotes = noteTab.filter((note) => note.id !== id);
    const exactNote = noteTab.filter((note) => note.id == id);
    localStorage.setItem("TabsData", JSON.stringify(filteredNotes));
    localStorage.removeItem(exactNote[0].text);
    setNoteTab(filteredNotes);
  };

  const deleteNote = (id) => {
    const filteredNotes = noteData.filter((note) => note.id !== id);
    localStorage.setItem(activeTab, JSON.stringify(filteredNotes));
    setNoteData(filteredNotes);
  };

  const myStyle = {
    backgroundImage: `url(${isDarkMode ? backgroundDark : backgroundLight})`,
    height: "100vh",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div className="App w-full h-full flex flex-col relative" style={myStyle}>
      <Header />
      <div className="flex mb-6 h-full relative">
        <Sidebar
          toggleTab={toggleTab}
          setActiveTab={setActiveTab}
          activeTab={activeTab}
          setNoteTab={setNoteTab}
          createNewTab={saveTabHandler}
          noteTab={noteTab}
          deleteTab={deleteTab}
        />
        <div className="w-1 dark:bg-white/5 bg-black/5 rounded-lg mb-3"></div>
        <Notebar
          noteData={noteData}
          saveNoteHandler={saveNoteHandler}
          deleteNote={deleteNote}
        />
      </div>
      <Footer />
    </div>
  );
}

export default App;
