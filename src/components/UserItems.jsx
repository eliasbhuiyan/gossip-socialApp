import React from "react";

const UserItems = () => {
  return (
    <div className="flex items-center gap-4 mb-4">
      <div>
        <img src="/friend.png" alt="friend" />
      </div>
      <div>
        <h3 className="name">Big Kahuna Burger Ltd.</h3>
      </div>
      <button className="ml-auto font-inter text-lg font-normal text-brand">
        Add Request
      </button>
    </div>
  );
};

export default UserItems;
