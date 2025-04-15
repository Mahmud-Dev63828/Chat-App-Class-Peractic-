import React from "react";
import { FaRegBell } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { IoCloudUploadOutline, IoHomeOutline } from "react-icons/io5";
import { TbLogout2 } from "react-icons/tb";
import { TiMessage } from "react-icons/ti";
import { Link, useLocation, useParams } from "react-router";

const Sidebar = () => {
  const navigationIcons = [
    {
      id: 1,
      path: "/",
      icon: <IoHomeOutline />,
    },
    {
      id: 2,
      path: "/message",
      icon: <TiMessage />,
    },
    {
      id: 3,
      path: "/notification",
      icon: <FaRegBell />,
    },
    {
      id: 4,
      path: "/setting",
      icon: <FaGear />,
    },
    {
      id: 5,

      icon: <TbLogout2 />,
    },
  ];
  const location = useLocation();

  // catch the url params

  return (
    <div>
      <div className="w-[130px] bg-green-600 rounded-3xl h-[96dvh] ">
        <div className="flex justify-center">
          {/* profile pic */}
          <div className="w-[70px] mt-10 h-[70px] rounded-full relative cursor-pointer group">
            <picture>
              <img
                src="https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D"
                alt="profilePic"
                className="w-full h-full object-cover rounded-full"
              />
            </picture>
            <span className="absolute hidden group-hover:block top-1/2 left-1/3 -translate-y-1/2 text-white text-2xl">
              <IoCloudUploadOutline />
            </span>
          </div>
        </div>
        {/* navigation icon */}
        <div className="flex flex-col gap-y-8 items-center justify-center mt-10">
          {navigationIcons?.map((item, index) =>
            navigationIcons.length - 1 == index ? (
              <Link
                to={item.path}
                className={
                  location.pathname == item.path
                    ? "text-[50px]  cursor-pointer active mt-10 text-black"
                    : "text-[50px] cursor-pointer  mt-10 text-white"
                }
                key={item.id}
              >
                {item.icon}
              </Link>
            ) : (
              <Link
                to={item.path}
                className={
                  location.pathname == item.path
                    ? "text-[50px] active cursor-pointer active mt-10 text-blacko"
                    : "text-[50px] cursor-pointer  mt-10 text-white"
                }
                key={item.id}
              >
                {item.icon}
              </Link>
            )
          )}
        </div>
        {/* navigation icon */}
      </div>
    </div>
  );
};

export default Sidebar;
