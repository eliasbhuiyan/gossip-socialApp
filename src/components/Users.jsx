import React from "react";
import Title from "./Title";
import Search from "./Search";
import UserItems from "./UserItems";

const Users = () => {
  return (
    <div className="w-1/3 bg-white p-4 rounded-xl">
      <Title title="Users" />
      <Search />
      <div className="mt-5 pr-4 overflow-y-scroll h-4/6 cardscroll">
        <UserItems />
        <UserItems />
        <UserItems />
        <UserItems />
        <UserItems />
        <UserItems />
      </div>
    </div>
  );
};

export default Users;
