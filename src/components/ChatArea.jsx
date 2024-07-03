import React from "react";
import { IoMdMore } from "react-icons/io";
import { IoSend } from "react-icons/io5";
import { BsEmojiSmile } from "react-icons/bs";
import { FaRegImage } from "react-icons/fa";

const ChatArea = () => {
  return (
    <div className="bg-white w-1/2 border-l rounded-r-xl flex flex-col pb-2">
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

      <div className="mt-auto py-4 px-3 mx-2 bg-[#F4F4F4] flex justify-between rounded-lg">
        <textarea type="text" placeholder="Text Here" className="w-4/5 h-5 max-h-20 bg-transparent outline-none"/>
        <button>
          <BsEmojiSmile className="text-xl text-brand"/>
        </button>
        <button>
          <FaRegImage className="text-xl text-brand"/>
        </button>
        <button>
          <IoSend className="text-xl text-brand"/>
        </button>
      </div>
    </div>
  );
};

export default ChatArea;
