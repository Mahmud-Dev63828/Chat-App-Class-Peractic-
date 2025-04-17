import React, { useEffect, useState } from "react";
import { FaRegBell } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { IoCloudUploadOutline, IoHomeOutline } from "react-icons/io5";
import { TbLogout2 } from "react-icons/tb";
import { TiMessage } from "react-icons/ti";
import { Link, useLocation, useParams } from "react-router";
import { getDatabase, ref, onValue } from "firebase/database";

const Sidebar = () => {
  const db = getDatabase();
  const [userData, setUserData] = useState([]);
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
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://upload-widget.cloudinary.com/latest/global/all.js";
    script.async = true;
    document.body.appendChild(script);
    console.log(script);
  }, []);
  /**
   * ! read and write data in firebase
   * todo fetch the data to the firebase
   */
  useEffect(() => {
    const fetchData = () => {
      const UserRef = ref(db, "users/");
      onValue(UserRef, (snapshot) => {
        let userArr = [];
        snapshot.forEach((item) => {
          userArr.push({ ...item.val(), userKey: item.key });
        });
        setUserData(userArr);
      });
    };
    fetchData();
  }, []);
  console.log(userData);
  /**
   * todo handleProfilePic function
   */
  const handleProfilePic = () => {
    if (window.cloudinary) {
      cloudinary.openUploadWidget(
        {
          cloudName: "dazbaelpk",
          uploadPreset: "chatAppClass",
          googleApiKey: "AIzaSyBj7HACYr7i1dWgC81FalKEwMuPXarS3rk",
          searchBySites: ["all", "cloudinary.com"],
          searchByRights: true,
          sources: [
            "local",
            "url",
            "camera",
            "image_search",
            "dropbox",
            "image_search",
            "shutterstock",
            "unsplash",
          ],
        },
        (error, result) => {
          if (error) {
            throw new Error("cloudinary profile picture upload error");
          }
          if (result.info.secure_url) {
            console.log(result.info.secure_url);
          }
        }
      );
    } else {
      throw new Error("upload failed");
    }
  };

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
            <span
              onClick={handleProfilePic}
              className="absolute hidden group-hover:block top-1/2 left-1/3 -translate-y-1/2 text-white text-2xl"
            >
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
