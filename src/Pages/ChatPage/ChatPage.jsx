import React from "react";
import GroupList from "../../Components/HomePageComponents/GroupList";
import Friends from "../../Components/HomePageComponents/Friends";
import { IoCloudUploadOutline } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";

const ChatPage = () => {
  return (
    <div className="w-full bg-amber-200 h-[90dvh]">
      <div className="flex h-full">
        <div className="w-[40%] h-full bg-green-700 ">
          <div className="p-3">
            <GroupList />
            <Friends />
          </div>
        </div>
        <div className="w-[60%] h-full bg-red-700 p-7 ">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-3">
              <div className="w-[70px]  h-[70px] rounded-full relative cursor-pointer group">
                <picture>
                  <img
                    src="https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D"
                    alt="profilePic"
                    className="w-full h-full object-cover rounded-full"
                  />
                </picture>
              </div>
              <div>
                <h1>Sadia Islam</h1>
                <span>online</span>
              </div>
            </div>
            <span>
              <BsThreeDotsVertical />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
