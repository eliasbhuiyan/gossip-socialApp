import React from "react";
import { IoMdMore } from "react-icons/io";

const ChatArea = () => {
  return (
    <div className="bg-white w-1/2 border-l rounded-r-xl">
      <div className="pt-12 pb-3 px-3 flex items-center gap-4 shadow-md">
        <div>
          <img src="/friend.png" alt="friend" />
        </div>
        <h3 className="name">Jenny Wilson</h3>
        <IoMdMore className="ml-auto" />
      </div>

      {/* Chat Area Start*/}
      <div className="p-5 flex flex-col gap-3">
        {/* Receive Message */}
        <p className="reveive-message">Receive Message</p>
        {/* Sende Message */}
        <p className="send-message">Sende Message</p>
      </div>
      {/* Chat Area End*/}
    </div>
  );
};

export default ChatArea;
