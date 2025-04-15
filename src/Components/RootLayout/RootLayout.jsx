import React from "react";
import Sidebar from "../../Components/HomePageComponents/Sidebar";
import { Outlet } from "react-router";

const RootLayout = () => {
  return (
    <div className=" flex gap-x-[30px] p-3 ">
      <div>
        <Sidebar />
      </div>
      <div className="w-full h-[96dvh] rounded-3xl   bg-gray-100">
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
