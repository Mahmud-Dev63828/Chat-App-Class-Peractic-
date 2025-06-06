import React, { useEffect, useState } from "react";
import GroupList from "../../Components/HomePageComponents/GroupList";
import Friends from "../../Components/HomePageComponents/Friends";
import { IoCloudUploadOutline } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaCameraRetro, FaRegSmileBeam, FaTelegram } from "react-icons/fa";
import { useSelector } from "react-redux";
import EmojiPicker from "emoji-picker-react";
import { getDatabase, push, ref, set, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";

const ChatPage = () => {
  const db = getDatabase();
  const auth = getAuth();
  const { value } = useSelector((store) => store.friends);
  const [msg, setmsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [emojiOpen, setemojiOpen] = useState(false);
  const [allsingleMsg, setAllsingleMsg] = useState([]);

  // handleEmoji
  const handleEmoji = ({ emoji }) => {
    setmsg((prev) => prev + emoji);
  };

  // handlesend
  const handleSendMsg = async () => {
    setLoading(true);
    try {
      await push(ref(db, "singleMsg"), {
        whoSendmsgUid: auth.currentUser.uid,
        whoSendMsgName: auth.currentUser.displayName,
        whoSendMsgEmail: auth.currentUser.email,
        whoSendMsgProfile_picture: auth.currentUser.photoURL,
        whoRvMsgUid: value.UserUid,
        whoRvMsgName: value.Username,
        whoRvMsgemail: value.Useremail,
        whoRvMsgProfile_picture: value.Userprofile_picture,
        singleMsg: msg,
      });
    } catch (error) {
      console.error("error from handleSendmsg", error);
    } finally {
      setLoading(false);
      setmsg("");
      setemojiOpen(false);
      // setSendImage([]);
    }
  };
  //  singleMsg fetch
  useEffect(() => {
    const fetchSingleMsg = async () => {
      try {
        const singleMsgRef = ref(db, "singleMsg");
        onValue(singleMsgRef, (snapshot) => {
          let msgBlankArr = [];
          snapshot.forEach((msg) => {
            if (
              auth.currentUser.uid == msg.val().whoSendmsgUid ||
              auth.currentUser.uid == msg.val().whoRvMsgUid
            ) {
              msgBlankArr.push({ ...msg.val(), msgKey: msg.key });
            }
          });
          setAllsingleMsg(msgBlankArr);
        });
      } catch (error) {
        console.error("error from fetch data", error);
      }
    };
    fetchSingleMsg();
  }, []);
  console.log(allsingleMsg);

  return (
    <div className="w-full  h-[90dvh]">
      <div className="flex h-full">
        <div className="w-[40%] h-full ">
          <div className="p-3">
            <GroupList />
            <Friends buttonVisuable={false} />
          </div>
        </div>
        <div className="w-[60%] h-full  p-7 ">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-3">
              <div className="w-[70px]  h-[70px] rounded-full relative cursor-pointer group">
                <picture>
                  <img
                    src={value.Userprofile_picture}
                    alt="profilePic"
                    className="w-full h-full object-cover rounded-full"
                  />
                </picture>
              </div>
              <div>
                <h1>{value.Username}</h1>
                {navigator.onLine && <span>online</span>}
              </div>
            </div>
            <span>
              <BsThreeDotsVertical />
            </span>
          </div>
          <hr className="mt-3" />
          {/* msg part */}
          <div className="flex w-full flex-col h-[70vh] overflow-y-scroll">
            {[...new Array(10)].map((_, index) =>
              index % 2 == 0 ? (
                <div className="self-start mt-4">
                  <div className="flex flex-col">
                    <div className="text-center  bg-gray-500 py-3 px-6 ">
                      <h1>Hey There!</h1>
                    </div>
                    <span>Today, 03:20</span>
                  </div>
                </div>
              ) : (
                <div className="self-end mt-4">
                  <div className="flex flex-col">
                    <div className="text-center bg-green-500 py-3 px-6 ">
                      <h1>Hey There!</h1>
                    </div>
                    <span>Today, 03:20</span>
                  </div>
                </div>
              )
            )}
            {/* chat action */}
            <div className="mt-10 flex items-center gap-x-9  ">
              <div className="w-full relative">
                <input
                  type="text"
                  name="textsender"
                  id="textsender"
                  value={msg}
                  onChange={(e) => setmsg(e.target.value)}
                  className="w-full border  rounded-2xl py-3 px-2"
                  placeholder="type msg ..."
                />
                <div className="absolute right-[2%] bottom-[25%] flex text-2xl items-center gap-x-4">
                  <span>
                    <FaRegSmileBeam
                      onClick={() => setemojiOpen(!emojiOpen)}
                      className="cursor-pointer"
                    />
                  </span>
                  <span>
                    <FaCameraRetro
                      className="cursor-pointer"
                      // onClick={() => openModal()}
                    />
                  </span>
                </div>
              </div>

              {loading ? (
                <span>
                  <FaTelegram className="text-5xl animate-spin" />
                </span>
              ) : (
                <span onClick={handleSendMsg}>
                  <FaTelegram className="text-5xl" />
                </span>
              )}
            </div>
            {/* emoji */}
            <div className="absolute right-[10%] bottom-[10%]">
              <EmojiPicker open={emojiOpen} onEmojiClick={handleEmoji} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
