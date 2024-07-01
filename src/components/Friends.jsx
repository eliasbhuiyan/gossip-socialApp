import React from "react";
import Title from "./Title";
import Search from "./Search";
import FriendItems from "./FriendItems";
const Friends = () => {
  return (
    <div className="w-1/3 bg-white p-4 rounded-xl">
      <Title title="Friends" />
      <Search />
      <div className="mt-5 pr-4 overflow-y-scroll h-4/6 cardscroll">
        <FriendItems />
        <FriendItems />
        <FriendItems />
        <FriendItems />
        <FriendItems />
      </div>
    </div>
  );
};

export default Friends;
