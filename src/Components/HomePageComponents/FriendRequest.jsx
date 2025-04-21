import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import Avatar from "../../assets/homeAssets/avatar.gif";
import { getDatabase, ref, onValue, off, set, push } from "firebase/database";
import { getAuth } from "firebase/auth";
import { UserListSkeleton } from "../../Skeleton/UserListSkeleton";
import lib from "../../Lib/lib";
import moment from "moment";

const FriendRequest = () => {
  const db = getDatabase();
  const auth = getAuth();
  const [arrayLength, setArrayLength] = useState(10);
  const [frnReqList, setFrnReqList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userRef = ref(db, "friendRequest");

    onValue(userRef, (snapshot) => {
      const frndReqBlankArr = [];
      snapshot.forEach((eachFrndReq) => {
        if (auth?.currentUser?.uid !== eachFrndReq.val()?.whoSendFrndReqUid)
          frndReqBlankArr.push({
            ...eachFrndReq.val(),
            frndReqKey: eachFrndReq.key,
          });
      });
      setFrnReqList(frndReqBlankArr);
      setLoading(false);
    });

    console.log(frnReqList);
    // Cleanup
    return () => {
      off(userRef);
    };
  }, []);

  if (loading) {
    return <UserListSkeleton />;
  }

  // todo handleAccFrndReq function
  const handleAccFrndReq = (frndReqInfo) => {
    set(push(ref(db, "friends/")), {
      ...frndReqInfo,
      createdAt: lib.getTimeNow(),
    })
      .then(() => {
        set(push(ref(db, "notification/")), {
          notificationMsg: `${frndReqInfo?.whoRecivedFrndReqName} Accept your friend Request`,
          createdAt: lib.getTimeNow(),
        });
      })
      .then(() => {
        lib.successToast(
          `${frndReqInfo?.whoRecivedFrndReqName} Accept your friend Request`
        );
      })
      .catch((err) => {
        console.error("error form Accept Friend Request", err);
      });
  };

  return (
    <div>
      {/* list part */}
      <div className=" shadow-2xs ">
        <div className="flex items-center justify-between">
          <h1 className="relative">
            Friend Request
            <span className="absolute -right-6  top-0 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
              {arrayLength}
            </span>
          </h1>
          <span>
            <BsThreeDotsVertical />
          </span>
        </div>
        <div className="overflow-y-scroll h-[40dvh]">
          {frnReqList?.map((frnd, index) => (
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
                    src={frnd?.whoSendFrndReqProfile_Picture || Avatar}
                    alt={Avatar}
                  />
                </picture>
              </div>
              <div>
                <h1 className="font-medium text-[20px]">
                  {frnd?.whoSendFrndReqName}
                </h1>
                <p className="text-sm ">{moment(frnd?.createdAt).fromNow()}</p>
              </div>
              <button
                onClick={() => handleAccFrndReq(frnd)}
                className="bg-blue-800 px-3 rounded py-2 text-white"
              >
                Accept
              </button>
              <button className="bg-red-800 px-3 rounded py-2 text-white">
                Reject
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FriendRequest;
