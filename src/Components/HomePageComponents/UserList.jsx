import React, { useEffect, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import Avatar from "../../assets/homeAssets/avatar.gif";
import { FaMinus, FaPlus } from "react-icons/fa";
import { getDatabase, ref, onValue, off, set, push } from "firebase/database";
import { getAuth } from "firebase/auth";
import { UserListSkeleton } from "../../Skeleton/UserListSkeleton";
import lib from "../../Lib/lib";

const UserList = () => {
  const db = getDatabase();
  const auth = getAuth();
  const [userList, setUserList] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [frndReqList, setFrndReqList] = useState([]);
  const [actualFrndList, setActualFrndList] = useState([]);
  // todo fetch data from users
  useEffect(() => {
    const userRef = ref(db, "users");

    const unsubscribe = onValue(userRef, (snapshot) => {
      const userBlankArr = [];
      snapshot.forEach((user) => {
        if (auth.currentUser?.uid !== user.val().userid) {
          userBlankArr.push({ ...user.val(), userKey: user.key });
        } else {
          setCurrentUser({ ...user.val(), userKey: user.key });
        }
      });
      setActualFrndList(userBlankArr);
      setLoading(false);
    });

    // Cleanup
    return () => {
      off(userRef);
    };
  }, []);

  // todo fetch data from friendRequest
  useEffect(() => {
    const frndReqRef = ref(db, "friendRequest");

    onValue(frndReqRef, (snapshot) => {
      const frndReqBlankArr = [];
      snapshot.forEach((frndReq) => {
        if (auth?.currentUser?.uid == frndReq.val()?.whoSendFrndReqUid)
          frndReqBlankArr.push(
            auth?.currentUser?.uid.concat(frndReq.val()?.whoRecivedFrndReqUid)
          );
        setFrndReqList(frndReqBlankArr);
      });
    });

    // Cleanup
    return () => {
      off(frndReqRef);
    };
  }, []);

  // todo fetch data from friends
  useEffect(() => {
    const frndRef = ref(db, "friends");

    onValue(frndRef, (snapshot) => {
      const frndBlankArr = [];
      snapshot.forEach((singleFrnd) => {
        if (auth?.currentUser?.uid == singleFrnd.val()?.whoSendFrndReqUid) {
          frndBlankArr.push(
            auth?.currentUser?.uid.concat(
              singleFrnd.val()?.whoRecivedFrndReqUid
            )
          );
        }

        setFrndReqList(frndBlankArr);
      });
    });

    // Cleanup
    return () => {
      off(frndRef);
    };
  }, []);

  if (loading) {
    return <UserListSkeleton />;
  }
  // todo handleFriendRequest for send friend request
  const handleFriendRequest = (user) => {
    set(push(ref(db, "friendRequest/")), {
      whoSendFrndReqName:
        currentUser?.username || auth?.currentUser?.displayName,
      whoSendFrndReqUid: currentUser?.userid || auth?.currentUser?.uid,
      whoSendFrndReqEmail: currentUser?.email || auth?.currentUser?.email,
      whoSendFrndReqProfile_Picture:
        currentUser?.profile_picture || auth?.currentUser?.photoURL,
      whoSendFrndReqUserKey: currentUser?.userKey || "",
      whoRecivedFrndReqName: user?.username || "",
      whoRecivedFrndReqUid: user?.userid || "",
      whoRecivedFrndReqUserKey: user?.userKey || "",
      whoRecivedFrndReqProfile_Picture: user?.profile_picture || "",
      whoRecivedFrndReqEmail: user?.email || "",
      createdAt: lib.getTimeNow(),
    })
      .then(() => {
        set(push(ref(db, "notification/")), {
          notificationMsg: `${
            currentUser?.username || auth?.currentUser?.displayName
          } send you a friend Request`,

          createdAt: lib.getTimeNow(),
        });
      })
      .then(() => {
        lib.successToast(
          `${
            currentUser?.username || auth?.currentUser?.displayName
          } send you a friend Request`
        );
      })
      .catch((err) => {
        console.error("error form handleFrndReq", err);
      });
  };

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
            {actualFrndList?.includes(auth?.currentUser?.uid + user?.userid)
              ? "frn"
              : "not"}

            {frndReqList?.includes(auth?.currentUser?.uid + user?.userid) ? (
              <button
                type="button"
                className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 cursor-pointer"
              >
                <FaMinus />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => handleFriendRequest(user)}
                className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 cursor-pointer"
              >
                <FaPlus />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
