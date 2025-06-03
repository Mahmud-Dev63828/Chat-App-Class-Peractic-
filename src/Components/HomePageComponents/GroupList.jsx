import React, { useRef, useState } from "react";
import Avatar from "../../assets/homeAssets/avatar.gif";
import Modal from "react-modal";
import lib from "../../Lib/lib";
import { closeModal, openModal } from "../../../utils/modal.upload";
import { validationField } from "../../../validation/groupForm.validation";
import { handleChange } from "../../../utils/onchangeHandaler.utils";
import { setFirebaseData, uploadFile } from "../../../utils/upload";
import { getAuth } from "firebase/auth";
const GroupList = () => {
  const auth = getAuth();
  const inputImageRef = useRef(null);
  const [arrayLength, setArrayLength] = useState(10);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [groupError, setGroupError] = useState({});
  const [loading, setloading] = useState(false);
  const [groupInfo, setGroupInfo] = useState({
    groupName: "",
    groupTagName: "",
    groupImage: "",
  });

  // handle submit
  const handleSubmit = async () => {
    const isValid = validationField(groupInfo, setGroupError);
    if (!isValid) return;
    const formData = new FormData();
    formData.append("file", groupInfo.groupImage);
    formData.append("upload_preset", "chatAppClass");
    try {
      setloading(true);
      const Url = await uploadFile(formData);
      await setFirebaseData("groupList/", {
        adminName: auth.currentUser.displayName,
        adminUid: auth.currentUser.uid,
        adminEmail: auth.currentUser.email,
        adminPhoto_url: auth.currentUser.photoURL,
        groupName: groupInfo.groupName,
        groupTagName: groupInfo.groupTagName,
        groupImage: Url,
      });
    } catch (error) {
      console.error("Image upload failed:", error);
    } finally {
      setloading(false);
      setGroupInfo({
        groupImage: "",
        groupTagName: "",
        groupName: "",
      });
      closeModal(setIsOpen);
      if (inputImageRef.current) {
        inputImageRef.current.value = null;
      }
    }
  };
  console.log(groupError);

  return (
    <div>
      <div className="p-2.5">
        <div class="relative">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              class="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            class="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
            placeholder="Search..."
            required
          />
        </div>
      </div>
      {/* list part */}
      <div className=" shadow-2xs ">
        <div className="flex items-center justify-between">
          <h1 className="relative">
            Group List{" "}
            <span className="absolute -right-6  top-0 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
              {arrayLength}
            </span>
          </h1>

          <button
            onClick={() => openModal(setIsOpen)}
            className="bg-blue-800 cursor-pointer px-6 rounded py-1 text-white"
          >
            Create Group
          </button>
        </div>

        <div className="overflow-y-scroll h-[40dvh]">
          {[...new Array(arrayLength)].map((_, index) => (
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
                    src={Avatar}
                    alt={Avatar}
                  />
                </picture>
              </div>
              <div>
                <h1 className="font-medium text-[20px]">Friends Reunion</h1>
                <p className="text-sm ">Hi Friends, What's up</p>
              </div>
              <button className="bg-blue-800 px-6 rounded py-1 text-white">
                join
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* modal component */}
      <div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => closeModal(setIsOpen)}
          style={lib.customStyle}
        >
          <button
            onClick={() => closeModal(setIsOpen)}
            type="button"
            class="text-white cursor-pointer bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            X
          </button>
          <div class="w-full p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <form class="max-w-sm mx-auto" onSubmit={(e) => e.preventDefault()}>
              <div class="mb-5">
                <label
                  for="groupname"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Group Name
                </label>
                <input
                  type="text"
                  id="groupName"
                  value={groupInfo.groupName}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="hello"
                  onChange={(event) =>
                    handleChange(event, setGroupInfo, setGroupError)
                  }
                  required
                />
                {groupError.groupNameError && (
                  <span className="text-red-500 my-2">
                    {groupError.groupNameError}
                  </span>
                )}
              </div>
              <div class="mb-5">
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  GroupTag Name
                </label>
                <input
                  type="text"
                  onChange={(event) =>
                    handleChange(event, setGroupInfo, setGroupError)
                  }
                  value={groupInfo.groupTagName}
                  id="groupTagName"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
                {groupError.groupTagNameError && (
                  <span className="text-red-500 my-2">
                    {groupError.groupTagNameError}{" "}
                  </span>
                )}
              </div>

              <div>
                <label
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  for="user_avatar"
                >
                  Upload file
                </label>
                <input
                  onChange={(event) =>
                    handleChange(event, setGroupInfo, setGroupError)
                  }
                  ref={inputImageRef}
                  class="block w-full text-sm py-3 px-2 text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  id="groupImage"
                  type="file"
                />
                {groupError.groupImageError && (
                  <span className="text-red-500 my-2">
                    {groupError.groupImageError}{" "}
                  </span>
                )}
              </div>

              {loading ? (
                <button
                  type="submit"
                  class="mt-10 animate-pulse text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  laoding...
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  type="submit"
                  class="mt-10 cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Create
                </button>
              )}
            </form>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default GroupList;
