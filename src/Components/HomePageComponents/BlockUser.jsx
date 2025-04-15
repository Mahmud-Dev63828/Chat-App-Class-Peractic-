import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import Avatar from "../../assets/homeAssets/avatar.gif";
import { FaPlug, FaPlus } from "react-icons/fa";

const BlockUser = () => {
  const [arrayLength, setArrayLength] = useState(10);
  return (
    <div>
      {/* list part */}
      <div className=" shadow-2xs ">
        <div className="flex items-center justify-between">
          <h1 className="relative">
            Block User
            <span className="absolute -right-6  top-0 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
              {arrayLength}
            </span>
          </h1>
          <span>
            <BsThreeDotsVertical />
          </span>
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
                <h1 className="font-medium text-[20px]">Dj Baharul</h1>
                <p className="text-sm ">Today, 8pm</p>
              </div>
              <button className="bg-blue-800 px-3 rounded py-2 text-white">
                Block
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlockUser;
