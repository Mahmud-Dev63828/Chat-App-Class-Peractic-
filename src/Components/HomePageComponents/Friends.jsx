import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import Avatar from "../../assets/homeAssets/avatar.gif";
import { getAuth } from "firebase/auth";
import moment from "moment";
import lib from "../../Lib/lib";
import {
  getDatabase,
  ref,
  onValue,
  off,
  set,
  push,
  remove,
} from "firebase/database";

const Friends = () => {
  const db = getDatabase();
  const auth = getAuth();
  const [frndList, setFrndList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(false);
  const [blockUser, setBlockUser] = useState([]);

  const [arrayLength, setArrayLength] = useState(10);

  // todo fetch block data from block list
  useEffect(() => {
    const blockRef = ref(db, "blockLists/");

    onValue(blockRef, (snapshot) => {
      const blockBlankArr = [];
      snapshot.forEach((block) => {
        if (auth?.currentUser?.uid == block?.val().whoRecivedFrndReqUid)
          blockBlankArr.push(
            auth?.currentUser.uid.concat(block?.val().whoSendFrndReqUid)
          );
        console.log(block.val());
      });
      setBlockUser(blockBlankArr);
    });

    // Cleanup
    return () => {
      off(blockRef);
    };
  }, []);

  //todo data fetch from friends database
  useEffect(() => {
    const userRef = ref(db, "friends");

    onValue(userRef, (snapshot) => {
      const frndBlankArr = [];
      snapshot.forEach((frnd) => {
        if (auth?.currentUser?.uid == frnd?.val().whoRecivedFrndReqUid)
          frndBlankArr.push({ ...frnd?.val(), frndKey: frnd?.key });
      });
      setFrndList(frndBlankArr);
      setLoading(false);
    });

    // Cleanup
    return () => {
      off(userRef);
    };
  }, []);

  // todo handleBlock function apply
  const handleBlock = (frndInfo) => {
    set(push(ref(db, "blockLists/")), {
      ...frndInfo,
      createdAt: lib.getTimeNow(),
    }).then(() => {
      // todo delete from frnd list
      const frndRef = ref(db, `friends/${frndInfo?.frndKey}`);
      remove(frndRef);
    });
  };

  return (
    <div>
      {/* list part */}
      <div className=" shadow-2xs ">
        <div className="flex items-center justify-between">
          <h1 className="relative">
            Friends
            <span className="absolute -right-6  top-0 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
              {frndList.length}
            </span>
          </h1>
          <span>
            <BsThreeDotsVertical />
          </span>
        </div>
        <div className="overflow-y-scroll h-[40dvh]">
          {frndList.map((frnd, index) => (
            <div
              className={
                frnd - 1 == index
                  ? "flex items-center justify-between mt-2 "
                  : "flex items-center justify-between mt-2 border-b border-b-gray-500 pb-2"
              }
            >
              <div className="w-[50px] h-[50px] rounded-full">
                <picture>
                  <img
                    className="w-full h-full object-cover rounded-full"
                    src={frnd?.whoSendFrndReqProfile_Picture}
                    alt={"hjljjl"}
                  />
                </picture>
              </div>
              <div>
                <h1 className="font-medium text-[20px]">
                  {frnd?.whoSendFrndReqName}
                </h1>
                <p className="text-sm ">Hi Friends, What's up</p>
              </div>
              <div className="flex">
                <button
                  type="button"
                  class="focus:outline-none cursor-pointer text-white bg-green-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-1 me-2 mb-2"
                >
                  unfriend
                </button>
                {blockUser?.includes(
                  auth?.currentUser?.uid.concat(frnd.whoSendFrndReqUid)
                ) ? (
                  <button
                    type="button"
                    class="focus:outline-none cursor-pointer text-white bg-purple-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-1 me-2 mb-2"
                  >
                    blocked
                  </button>
                ) : (
                  <button
                    onClick={() => handleBlock(frnd)}
                    type="button"
                    class="focus:outline-none cursor-pointer text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-1 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                  >
                    Block
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Friends;
