import React from "react";
import { Oval } from "react-loader-spinner";

function Loader() {
  return (
    <div className="absolute bg-black/80 h-screen w-screen flex justify-center items-center z-10 flex-col">
      <Oval
        height={150}
        width={150}
        color="#4fa94d"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#4fa94d"
        strokeWidth={1}
        strokeWidthSecondary={2}
      />
      <span className="text-white mt-20 text-2xl">Loading...Please wait</span>
    </div>
  );
}

export default Loader;
