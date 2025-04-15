import React from "react";
import GroupList from "../../Components/HomePageComponents/GroupList";
import Friends from "../../Components/HomePageComponents/Friends";
import UserList from "../../Components/HomePageComponents/UserList";
import FriendRequest from "../../Components/HomePageComponents/FriendRequest";
import Group from "../../Components/HomePageComponents/Group";
import BlockUser from "../../Components/HomePageComponents/BlockUser";

const Index = () => {
  return (
    <div className="flex gap-5 justify-between flex-wrap">
      <div className="w-[400px]   px-2 ">
        <GroupList />
      </div>
      <div className="w-[350px]   px-2 pt-2 ">
        <Friends />
      </div>
      <div className="w-[350px]   px-2 pt-2 ">
        <UserList />
      </div>
      <div className="w-[350px]   px-2 pt-2 ">
        <FriendRequest />
      </div>
      <div className="w-[350px]   px-2 pt-2 ">
        <Group />
      </div>
      <div className="w-[350px]   px-2 pt-2 ">
        <BlockUser />
      </div>
    </div>
  );
};

export default Index;
