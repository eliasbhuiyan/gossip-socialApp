import React from "react";
import Title from "./Title";
import Search from "./Search";
import FriendItems from "./FriendItems";
import FriendReqItems from "./FriendReqItems";

const FriendRequest = () => {
  return (
    <div className="w-1/3 bg-white p-4 rounded-xl">
      <Title title="Friend Requests" />
      <div className="mt-5 pr-4 overflow-y-scroll h-5/6 cardscroll">
        <FriendReqItems />
        <FriendReqItems />
        <FriendReqItems />
        <FriendReqItems />
        <FriendReqItems />
      </div>
    </div>
  );
};

export default FriendRequest;
