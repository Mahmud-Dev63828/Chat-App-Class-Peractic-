import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import Avatar from "../../assets/homeAssets/avatar.gif";
import { getAuth } from "firebase/auth";
import moment from "moment";
import { getDatabase, ref, onValue, off, set, push } from "firebase/database";

const Friends = () => {
  const db = getDatabase();
  const auth = getAuth();
  const [frndList, setFrndList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [arrayLength, setArrayLength] = useState(10);

  // data fetch from friends database

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

  console.log(frndList);
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
              <p>{moment(frnd?.createdAt).fromNow()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Friends;
