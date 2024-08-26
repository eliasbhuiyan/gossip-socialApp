import React from "react";
import { useDispatch } from "react-redux";
import { activeChat } from "../reducer/chatSlice";

const ChatItems = ({data}) => {
 const dispatch = useDispatch()
  return (
    <div onClick={()=>dispatch(activeChat({...data, type: "single"}))} className="flex items-center gap-4 mb-4 cursor-pointer">
      <div className="w-12 h-12 rounded-full overflow-hidden">
        <img src={data.friendImg} alt="friend" className="w-full"/>
      </div>
      <div>
        <h3 className="name">{data.friendName}</h3>
      </div>
      <button className="ml-auto font-inter text-lg font-normal text-brand">
        10:30 PM
      </button>
    </div>
  );
};

export default ChatItems;
