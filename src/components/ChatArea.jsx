import React, { useEffect, useState } from "react";
import { IoMdMore } from "react-icons/io";
import { IoSend } from "react-icons/io5";
import { BsEmojiSmile } from "react-icons/bs";
import { FaRegImage } from "react-icons/fa";
import { useSelector } from "react-redux";
import { getDatabase, onValue, push, ref, set } from "firebase/database";

const ChatArea = () => {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const loggedUser = useSelector((state) => state.loggedUser.user);
  const activeChat = useSelector((state) => state.activeChat.active);
  const activeType = useSelector((state) => state.activeChat.active?.type);
  const db = getDatabase();
  const handelSendMsg = () => {
    if (activeType === "single") {
      set(
        push(ref(db, "allchat/"), {
          senderMsg: message,
          senderId: loggedUser.uid,
          reciverID: activeChat?.friendId,
          type: "single",
        }).then(() => {
          setMessage("");
        })
      );
    } else if (activeType === "group") {
      set(
        push(ref(db, "allchat/"), {
          senderMsg: message,
          senderId: loggedUser.uid,
          groupID: activeChat.groupId,
          type: "group",
        }).then(() => {
          setMessage("");
        })
      );
    }
  };

  useEffect(() => {
    let arr = [];
    onValue(ref(db, "allchat/"), (snapshot) => {
      snapshot.forEach((item) => {
        if (activeType === "single") {
          if (
            (item.val().reciverID === loggedUser.uid ||
              item.val().senderId === loggedUser.uid) &
            (item.val().reciverID === activeChat?.friendId ||
              item.val().senderId === activeChat?.friendId)
          ) {
            arr.push({ ...item.val(), key: item.key });
          }
        } else if (activeType === "group" && item.val().type === "group") {
          if (item.val().groupID === activeChat.groupId) {
            arr.push({ ...item.val(), key: item.key });
          }
        }
      });
      setMessageList(arr);
    });
  }, [activeChat?.key]);

  return (
    <div className="bg-white w-1/2 border-l rounded-r-xl flex flex-col pb-2">
      <div className="pt-12 pb-3 px-3 flex items-center gap-4 shadow-md">
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <img
            src={
              activeType === "single"
                ? activeChat?.friendImg
                : activeType === "group" && activeChat?.groupImg
            }
            alt="friend"
            className="w-full"
          />
        </div>
        <h3 className="name">
          {activeType === "single"
            ? activeChat?.friendName
            : activeType === "group" && activeChat?.groupName}
        </h3>
        <IoMdMore className="ml-auto" />
      </div>
      {/* Chat Area Start*/}
      <div className="p-5 flex flex-col gap-3">
        {messageList.map((item) =>
          item.type === "single" ? (
            item.senderId === loggedUser.uid ? (
              <p className="send-message">{item.senderMsg}</p>
            ) : (
              item.reciverID === loggedUser.uid && (
                <p className="reveive-message">{item.senderMsg}</p>
              )
            )
          ) : (
            item.type === "group" &&
            (item.senderId === loggedUser.uid ? (
              <p className="send-message">{item.senderMsg}</p>
            ) : (
              <p className="reveive-message">{item.senderMsg}</p>
            ))
          )
        )}
      </div>
      {/* Chat Area End*/}

      <div className="mt-auto py-4 px-3 mx-2 bg-[#F4F4F4] flex justify-between rounded-lg">
        <input
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          type="text"
          placeholder="Text Here"
          className="w-4/5 h-5 max-h-20 bg-transparent outline-none"
        />
        <button>
          <BsEmojiSmile className="text-xl text-brand" />
        </button>
        <button>
          <FaRegImage className="text-xl text-brand" />
        </button>
        {message && (
          <button onClick={handelSendMsg}>
            <IoSend className="text-xl text-brand" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ChatArea;
