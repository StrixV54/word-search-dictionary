import logo from "../assets/data.png";

export default function Header() {
  return (
    <header className="App-header flex w-full">
      <div className="flex w-full px-3 py-2 rounded-lg mx-3 mt-3">
        <span className="ring-slate-700 ring-2 p-1 rounded-full h-14 w-14 justify-center">
          <img src={logo} className="h-12 w-12" />
        </span>
        <h1 className="font-sans font-semibold text-2xl px-4 pt-2">
          Word Search Dictionary
        </h1>
      </div>
    </header>
  );
}
