import { getDatabase, ref, remove } from "firebase/database";
import React from "react";

const BlockListITems = ({data}) => {
  const db = getDatabase();
  const handelUnblocked = ()=>{
    remove(ref(db, "blockList/" + data.key));
  }
  return (
    <div className="flex items-center gap-4 mb-4">
      <div className="w-12 h-12 rounded-full overflow-hidden">
        <img src={data?.blockedImg} alt="users" className="w-full" />
      </div>
      <div>
        <h3 className="name">{data.blockedName}</h3>
      </div>
      <button onClick={handelUnblocked} className="ml-auto font-inter text-lg font-normal text-brand">
        Unblock
      </button>
    </div>
  );
};

export default BlockListITems;
