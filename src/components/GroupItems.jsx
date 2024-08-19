import React from "react";
import { IoMdMore } from "react-icons/io";

const GroupItems = ({data}) => {
  return (
    <div className="flex items-center gap-4 mb-4">
      <div className="w-12 h-12 rounded-full overflow-hidden">
        <img src={data?.groupImg} alt="group" className="w-full"/>
      </div>
      <div>
        <h3 className="name">{data?.groupName}</h3>
        <p>Love You.....</p>
      </div>
      <IoMdMore className="ml-auto cursor-pointer" />
    </div>
  );
};

export default GroupItems;
