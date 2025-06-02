import React, { useState } from "react";
import Avatar from "../../assets/homeAssets/avatar.gif";
import Modal from "react-modal";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const GroupList = () => {
  const [arrayLength, setArrayLength] = useState(10);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [groupError, setGroupError] = useState({});

  const [groupInfo, setGroupInfo] = useState({
    groupName: "",
    groupTagName: "",
    groupImage: "",
  });

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  // validationField function
  const validationField = () => {
    let error = {};
    for (let field in groupInfo) {
      if (groupInfo[field] == "") {
        error[`${field}Error`] = `${field} missing. fill up the ${field}`;
      }
    }
    setGroupError(error);
  };
  // handla change
  const handleChange = (event) => {
    const { files, id, value } = event.target;
    validationField();
    setGroupInfo({
      ...groupInfo,
      [id]: id == "groupImage" ? files[0] : value,
    });
  };

  // handle submit
  const handleSubmit = () => {
    validationField();
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
            onClick={openModal}
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
          onRequestClose={closeModal}
          style={customStyles}
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
                  // value={groupinfo.groupName}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="hello"
                  onChange={handleChange}
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
                  // onChange={(event) =>
                  //   handleChange(event, setgroupinfo, setGroupError)
                  // }
                  // value={groupinfo.groupTagName}
                  onChange={handleChange}
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
                  // onChange={(event) =>
                  //   handleChange(event, setgroupinfo, setGroupError)
                  // }
                  // ref={inputImageRef}
                  onChange={handleChange}
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
              <button
                onClick={handleSubmit}
                type="submit"
                class="mt-10 cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Create
              </button>
              {/* {loading ? (
                <button
                  type="submit"
                  class="mt-10 animate-pulse text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  laoding...
                </button>
              ) : (
                <button
                  type="submit"
                  class="mt-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Create
                </button>
              )} */}
            </form>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default GroupList;
