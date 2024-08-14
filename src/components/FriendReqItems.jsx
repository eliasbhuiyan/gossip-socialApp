import React from "react";
import { getDatabase, push, ref, remove, set } from "firebase/database";
const FriendReqItems = ({ data }) => {
  const db = getDatabase();
  const handelCancel = () => {
    remove(ref(db, "friendReq/" + data.key));
  };
  const hendelConfirm = ()=>{
    set(push(ref(db, 'friendList/')), {
        senderId: data.senderId,
        senderName: data.senderName,
        senderImg: data.senderImg,
        reciverId: data.reciverId,
        reciverName: data.reciverName,
        reciverImg: data.reciverImg,
    }).then(()=>{
      remove(ref(db, "friendReq/" + data.key));
    });
  }
  return (
    <div className="flex items-center gap-4 mb-4">
      <div className="w-12 h-12 rounded-full overflow-hidden">
        <img src={data?.senderImg} alt="friend" className="w-full" />
      </div>
      <div>
        <h3 className="name">{data?.senderName}</h3>
      </div>
      <div className="flex flex-col ml-auto">
        <button onClick={hendelConfirm} className="font-inter text-lg font-normal text-brand">
          Confirm
        </button>
        <button
          onClick={handelCancel}
          className="font-inter text-lg font-normal text-red-500"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default FriendReqItems;
