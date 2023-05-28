// import Dictionary from "./components/Dictionary.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Notebar from "./components/Notebar.jsx";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import background from "./assets/backgdv.jpg";

function App() {
  const myStyle = {
    backgroundImage: `url(${background})`,
    height: "100vh",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div className="App w-full h-full flex flex-col relative" style={myStyle}>
      <Header />
      <div className="flex mb-6 h-full relative">
        <Sidebar />
        <div className="w-1 bg-white/30 rounded-lg mt-3 mb-3"></div>
        <Notebar />
      </div>
      <Footer />
    </div>
  );
}

export default App;
