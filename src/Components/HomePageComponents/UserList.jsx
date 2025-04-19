import React, { useEffect, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import Avatar from "../../assets/homeAssets/avatar.gif";
import { FaPlus } from "react-icons/fa";
import { getDatabase, ref, onValue, off } from "firebase/database";
import { getAuth } from "firebase/auth";
import { UserListSkeleton } from "../../Skeleton/UserListSkeleton";

const UserList = () => {
  const db = getDatabase();
  const auth = getAuth();
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userRef = ref(db, "users");

    const unsubscribe = onValue(userRef, (snapshot) => {
      const userBlankArr = [];
      snapshot.forEach((user) => {
        if (auth.currentUser?.uid !== user.val().userid) {
          userBlankArr.push({ ...user.val(), userKey: user.key });
        }
      });
      setUserList(userBlankArr);
      setLoading(false);
    });

    // Cleanup
    return () => {
      off(userRef);
    };
  }, []);

  if (loading) {
    return <UserListSkeleton />;
  }

  return (
    <div className="shadow-2xs mt-3">
      <div className="flex items-center justify-between">
        <h1 className="relative">
          User List
          <span className="absolute right-0 top-0 w-5 h-5 rounded-full bg-green-300 flex items-center justify-center">
            {userList.length}
          </span>
        </h1>
        <span>
          <HiDotsVertical />
        </span>
      </div>
      <div className="overflow-y-scroll h-[38dvh] scrollable-content">
        {userList.map((user, index) => (
          <div
            key={user.userKey}
            className={
              userList.length - 1 === index
                ? "flex items-center justify-between mt-3 pb-2"
                : "flex items-center justify-between mt-3 border-b border-b-gray-800 pb-2"
            }
          >
            <div className="w-[50px] h-[50px] rounded-full">
              <picture>
                <img
                  src={user.profile_picture || Avatar}
                  alt="Avatar"
                  className="w-full h-full object-cover rounded-full"
                />
              </picture>
            </div>

            <div className="w-[60%]">
              <h1 className="font-bold">{user.username}</h1>
              <p className="text-sm font-normal font-sans w-[80%] truncate">
                {user.email || "Missing"}
              </p>
            </div>

            <button
              type="button"
              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 cursor-pointer"
            >
              <FaPlus />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
