import React from "react";
import Title from "./Title";
import Search from "./Search";
import GroupItems from "./GroupItems";

const AllGroup = () => {
  return (
    <div className="w-1/3 bg-white p-4 rounded-xl">
      <Title title="Group" />
      <Search />
      <div className="mt-5 pr-4 overflow-y-scroll h-4/6 cardscroll">
        <GroupItems />
        <GroupItems />
        <GroupItems />
      </div>
    </div>
  );
};

export default AllGroup;
