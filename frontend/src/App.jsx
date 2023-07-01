// import Dictionary from "./components/Dictionary.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Notebar from "./components/Notebar.jsx";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import backgroundDark from "./assets/bgDark.jpg";
import backgroundLight from "./assets/bgLight.jpg";
import { useState, useEffect, createContext, useContext } from "react";
import { SwitchContext } from "./context/SwitchTheme.jsx";

const getCurrentTime = () => {
  new Date().toLocaleString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour12: true,
  });
};

function App() {
  const [activeTab, setActiveTab] = useState(null);
  const [noteTab, setNoteab] = useState([]);
  const [noteData, setNoteData] = useState([]);
  const [isDarkMode, handleToggle] = useContext(SwitchContext);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("WordNotes"));
    if (data) {
      setNoteTab(data);
    }
  }, [noteTab]);

  const saveTabHandler = () => {
    if (inputValue.length != 0) {
      const currentTimestamp = getCurrentTime;
      setNoteTab((prevState) => {
        prevState = prevState.filter((note) => note.text !== activeTab);
        return [
          ...prevState,
          {
            id: uuid(),
            tab: noteTab,
            text: noteData,
            time: currentTimestamp,
          },
        ];
      });
      localStorage.setItem("WordNotes", JSON.stringify(wordNotes));
    }
  };

  const saveNoteHandler = (input) => {
    const inputValue = input;
    if (inputValue.length != 0) {
      const currentTimestamp = getCurrentTime;
      setNoteData((prevState) => [
        ...prevState,
        {
          id: uuid(),
          text: inputValue,
          time: currentTimestamp,
        },
      ]);
      saveTabHandler();
    }
  };

  const deleteTab = (id) => {
    const filteredNotes = noteTab.filter((note) => note.id !== id);
    setNoteTab(filteredNotes);
  };

  const deleteNote = (id) => {
    const filteredNotes = noteData.filter((note) => note.id !== id);
    setNoteData(filteredNotes);
    saveTabHandler();
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
        <Sidebar />
        <div className="w-1 dark:bg-white/5 bg-black/5 rounded-lg mb-3"></div>
        <Notebar />
      </div>
      <Footer />
    </div>
  );
}

export default App;
