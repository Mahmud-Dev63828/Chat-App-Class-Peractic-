import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import Avatar from "../../assets/homeAssets/avatar.gif";
import { FaPlug, FaPlus } from "react-icons/fa";
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

const BlockUser = () => {
  const db = getDatabase();
  const auth = getAuth();
  const [arrayLength, setArrayLength] = useState(10);
  const [loading, setLoading] = useState(true);
  const [blockList, setBlockList] = useState([]);

  //todo fetch block data  from blockLists database
  useEffect(() => {
    const blockRef = ref(db, "blockLists/");

    onValue(blockRef, (snapshot) => {
      const blockBlankArr = [];
      snapshot.forEach((block) => {
        if (auth?.currentUser?.uid == block?.val().whoRecivedFrndReqUid)
          blockBlankArr.push({ ...block?.val(), blockKey: block?.key });
      });
      setBlockList(blockBlankArr);
      setLoading(false);
    });

    // Cleanup
    return () => {
      off(blockRef);
    };
  }, []);

  // todo handleUnblock function apply for unblock user
  const handleUnblock = (blockInfo) => {
    set(push(ref(db, `friends`)), {
      ...blockInfo,
      createdAt: lib.getTimeNow(),
    }).then(() => {
      // remove the frnd request id (for remove from friend request)
      const blockRef = ref(db, `blockLists/${blockInfo.blockKey}`);
      remove(blockRef);
    });
  };

  return (
    <div>
      {/* list part */}
      <div className=" shadow-2xs ">
        <div className="flex items-center justify-between">
          <h1 className="relative">
            BlockList
            <span className="absolute -right-6  top-0 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
              {blockList.length}
            </span>
          </h1>
          <span>
            <BsThreeDotsVertical />
          </span>
        </div>
        <div className="overflow-y-scroll h-[40dvh]">
          {blockList.map((blockUser, index) => (
            <div
              className={
                arrayLength - 1 == index
                  ? "flex items-center justify-between mt-2 "
                  : "flex items-center justify-between mt-2 border-b border-b-gray-500 pb-2"
              }
            >
              <div className="w-[50px] h-[50px] rounded-full">
                <picture>
                  <img
                    className="w-full h-full object-cover rounded-full"
                    src={blockUser?.whoSendFrndReqProfile_Picture}
                    alt={Avatar}
                  />
                </picture>
              </div>
              <div>
                <h1 className="font-medium text-[20px]">
                  {blockUser?.whoSendFrndReqName}
                </h1>
                <p className="text-sm ">
                  {moment(blockUser?.createdAt).fromNow()}
                </p>
              </div>
              <button
                onClick={() => handleUnblock(blockUser)}
                className="bg-blue-800 px-3 rounded py-2 text-white"
              >
                unBlock
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlockUser;
