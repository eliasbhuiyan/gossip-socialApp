import React from "react";
import { getDatabase, push, ref, remove, set } from "firebase/database";
import { useSelector } from "react-redux";
const FriendItems = ({data}) => {
  const loggedUser = useSelector((state) => state.loggedUser.user);
  const db = getDatabase();
  const handelUnfriend = ()=>{
    remove(ref(db, "friendList/" + data.key));
  }
  const handelBlock = ()=>{
    set(push(ref(db, 'blockList/')), {
      blockedId: data.friendId,
      blockedName: data.friendName,
      blockedImg: data.friendImg,
      blockedById: loggedUser.uid,
  }).then(()=>{
    remove(ref(db, "friendList/" + data.key));
  });
    
  }
  return (
    <div className="flex items-center gap-4 mb-4">
      <div className="w-12 h-12 rounded-full overflow-hidden">
        <img src={data?.friendImg} alt="users" className="w-full" />
      </div>
      <div>
        <h3 className="name">{data.friendName}</h3>
      </div>
      <div className="flex flex-col ml-auto gap-3">
        <button onClick={handelUnfriend} className="font-inter text-base font-normal text-brand">
          Unfriend
        </button>
        <button onClick={handelBlock} className="font-inter text-base font-normal text-red-500">
          Block
        </button>
      </div>
    </div>
  );
};

export default FriendItems;
