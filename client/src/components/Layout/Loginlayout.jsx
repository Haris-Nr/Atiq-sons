import React from "react";
import { Outlet } from "react-router-dom";

const Loginlayout = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-400">
            <div className="w-4/5 bg-white rounded-lg">
                <div className="flex items-center justify-center">
                    {/* Add your image here */}
                    <div className="w-1/2 h-full">
                        <img
                            src="door.jpg"
                            alt="door.jpg"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Add your form here */}
                    <div className="w-1/2 h-full">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Loginlayout;
