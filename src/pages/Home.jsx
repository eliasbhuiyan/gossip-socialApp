import React from "react";
import MyGroup from "../components/MyGroup";
import AllGroup from "../components/AllGroup";
import Friends from "../components/Friends";
import Users from "../components/Users";
import FriendRequest from "../components/FriendRequest";
import BlockList from "../components/BlockList";

const Home = () => {
  return (
    <div className="h-screen">
      <div className="flex gap-6 pt-10 h-1/2">
        <Users />
        <FriendRequest />
        <Friends />
      </div>
      <div className="flex gap-6 pt-10 pb-10 h-1/2">
        <MyGroup />
        <AllGroup />
        <BlockList />
      </div>
    </div>
  );
};

export default Home;
