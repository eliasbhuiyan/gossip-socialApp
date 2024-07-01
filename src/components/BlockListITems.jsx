import React from "react";

const BlockListITems = () => {
  return (
    <div className="flex items-center gap-4 mb-4">
      <div>
        <img src="/friend.png" alt="friend" />
      </div>
      <div>
        <h3 className="name">Big Kahuna Burger Ltd.</h3>
      </div>
      <button className="ml-auto font-inter text-lg font-normal text-brand">
        Unblock
      </button>
    </div>
  );
};

export default BlockListITems;
