import React from "react";
import { Outlet } from "react-router-dom";
const Loginlayout = () => {
  return (
    <>
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <div className="w-full bg-white rounded-lg  shadow-2xl xl:w-[72%]">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-center">
          {/* Add your form here */}
          <div className="w-full lg:w-1/2 flex items-center justify-center text-center">
            <Outlet />
          </div>

          {/* Add your image here */}
          <div className="w-full lg:w-1/2 bg-blue-200 rounded-tr-lg rounded-br-lg overflow-hidden">
            <img
              src="door-rbg.png"
              alt="door.jpg"
              className="w-full h-full object-cover block"
            />
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Loginlayout;