import React from "react";
import { IoMdMore } from "react-icons/io";
const FriendItems = () => {
  return (
    <div className="flex items-center gap-4 mb-4">
      <div>
        <img src="/friend.png" alt="friend" />
      </div>
      <div>
        <h3 className="name">Big Kahuna Burger Ltd.</h3>
      </div>
      <div className="flex flex-col ml-auto">
        <button className="font-inter text-base font-normal text-brand">
          Unfriend
        </button>
        <button className="font-inter text-base font-normal text-red-500">
          Block
        </button>
      </div>
    </div>
  );
};

export default FriendItems;
