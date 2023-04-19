import React from "react";
import "./App.css";
import Dictionary from "./Dictionary";
import Footer from "./Footer";

function App() {
  return (
    <div className="App">
      <div className="container">
        <header className="App-header">
          <h1>Word Search Dictionary</h1>
        </header>
        <main>
          <Dictionary />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
