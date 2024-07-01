import React from "react";
import Title from "./Title";
import BlockListITems from "./BlockListITems";

const BlockList = () => {
  return (
    <div className="w-1/3 bg-white p-4 rounded-xl">
      <Title title="Block List" />
      <div className="mt-5 pr-4 overflow-y-scroll h-5/6 cardscroll">
        <BlockListITems />
        <BlockListITems />
        <BlockListITems />
      </div>
    </div>
  );
};

export default BlockList;
