import React from "react";
import { IoMdMore } from "react-icons/io";

const Title = ({ title }) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="font-inter font-semibold text-primary text-2xl">
        {title}
      </h2>
      <IoMdMore />
    </div>
  );
};

export default Title;
