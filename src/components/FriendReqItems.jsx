import React from "react";

const FriendReqItems = () => {
  return (
    <div className="flex items-center gap-4 mb-4">
      <div>
        <img src="/friend.png" alt="friend" />
      </div>
      <div>
        <h3 className="name">Big Kahuna Burger Ltd.</h3>
      </div>
      <div className="flex flex-col ml-auto">
        <button className="font-inter text-lg font-normal text-brand">
          Confirm
        </button>
        <button className="font-inter text-lg font-normal text-red-500">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default FriendReqItems;
