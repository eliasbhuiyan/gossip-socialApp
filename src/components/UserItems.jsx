import React from "react";
import { useSelector } from "react-redux";

const UserItems = ({ data }) => {
  const loggedUser = useSelector((state) => state.loggedUser.user);
  const handelReq = () => {
    console.log(loggedUser);
  }
  return (
    <div className="flex items-center gap-4 mb-4">
      <div className="w-12 h-12 rounded-full overflow-hidden">
        <img src={data?.photoURL} alt="users" className="w-full" />
      </div>
      <div>
        <h3 className="name">{data?.displayName}</h3>
      </div>
      <button onClick={handelReq} className="ml-auto font-inter text-lg font-normal text-brand">
        Add Request
      </button>
    </div>
  );
};

export default UserItems;
