import React from "react";

const UserItems = ({ data }) => {
  return (
    <div className="flex items-center gap-4 mb-4">
      <div className="w-12 h-12 rounded-full overflow-hidden">
        <img src={data?.photoURL} alt="users" className="w-full" />
      </div>
      <div>
        <h3 className="name">{data?.displayName}</h3>
      </div>
      <button className="ml-auto font-inter text-lg font-normal text-brand">
        Add Request
      </button>
    </div>
  );
};

export default UserItems;
