import React, { useEffect, useState } from "react";
import { IoMdMore } from "react-icons/io";
import { IoSend } from "react-icons/io5";
import { BsEmojiSmile } from "react-icons/bs";
import { FaRegImage } from "react-icons/fa";
import { useSelector } from "react-redux";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import {
  getStorage,
  ref as imgref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import EmojiPicker from "emoji-picker-react";
import ScrollToBottom from "react-scroll-to-bottom";
const ChatArea = () => {
  const [message, setMessage] = useState("");
  const [chatImage, setChatImage] = useState("");
  const [emojiToggle, setEmojiToggle] = useState(false);
  const [messageList, setMessageList] = useState([]);
  const loggedUser = useSelector((state) => state.loggedUser.user);
  const activeChat = useSelector((state) => state.activeChat.active);
  const activeType = useSelector((state) => state.activeChat.active?.type);
  const db = getDatabase();
  const storage = getStorage();

  const handelSendMsg = () => {
    if (activeType === "single") {
      const storageRef = imgref(storage, `chatimg/${Date.now()}`);
      if (chatImage) {
        uploadBytes(storageRef, chatImage).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((downloadURL) => {
            set(
              push(ref(db, "allchat/"), {
                imageMsg: downloadURL,
                senderId: loggedUser.uid,
                reciverID: activeChat?.friendId,
                type: "single",
              }).then(() => {
                setChatImage("");
              })
            );
          });
        });
      } else {
        set(
          push(ref(db, "allchat/"), {
            senderMsg: message,
            imageMsg: chatImage,
            senderId: loggedUser.uid,
            reciverID: activeChat?.friendId,
            type: "single",
          }).then(() => {
            setMessage("");
            setEmojiToggle(false);
          })
        );
      }
    } else if (activeType === "group") {
      set(
        push(ref(db, "allchat/"), {
          senderMsg: message,
          senderId: loggedUser.uid,
          groupID: activeChat.groupId,
          type: "group",
        }).then(() => {
          setMessage("");
          setEmojiToggle(false);
        })
      );
    }
  };

  useEffect(() => {
    onValue(ref(db, "allchat/"), (snapshot) => {
      let arr = [];
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
  const handelEmoji = (e) => {
    setMessage((prevInput) => prevInput + e.emoji);
  };
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
      {/* <div className=""> */}
      <ScrollToBottom
        className={`${emojiToggle ? "h-1/4" : "h-3/4"} messageArea`}
      >
        {messageList.map((item) =>
          item.type === "single" ? (
            item.senderId === loggedUser.uid ? (
              item.senderMsg ? (
                <p key={item.key} className="send-message">
                  {item.senderMsg}
                </p>
              ) : (
                item.imageMsg && (
                  <div key={item.key} className="w-36 ml-auto">
                    <img src={item.imageMsg} className="w-full" />
                  </div>
                )
              )
            ) : (
              item.reciverID === loggedUser.uid &&
              (item.senderMsg ? (
                <p key={item.key} className="reveive-message">
                  {item.senderMsg}
                </p>
              ) : (
                item.imageMsg && (
                  <div key={item.key} className="w-36">
                    <img src={item.imageMsg} className="w-full" />
                  </div>
                )
              ))
            )
          ) : (
            item.type === "group" &&
            (item.senderId === loggedUser.uid ? (
              <p key={item.key} className="send-message">
                {item.senderMsg}
              </p>
            ) : (
              <p key={item.key} className="reveive-message">
                {item.senderMsg}
              </p>
            ))
          )
        )}
      </ScrollToBottom>
      {/* </div> */}
      {/* Chat Area End*/}

      <div className="py-4 px-3 mx-2 mt-auto bg-[#F4F4F4] flex justify-between rounded-lg relative">
        <input
          onKeyDown={(e) => e.key == "Enter" && handelSendMsg()}
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          type="text"
          placeholder="Text Here"
          className="w-4/5 h-5 max-h-20 bg-transparent outline-none"
        />
        <button>
          <BsEmojiSmile
            onClick={() => setEmojiToggle(!emojiToggle)}
            className="text-xl text-brand"
          />
        </button>
        <label htmlFor="image" className="cursor-pointer">
          <FaRegImage className="text-xl text-brand" />
        </label>
        <input
          onChange={(e) => setChatImage(e.target.files[0])}
          type="file"
          id="image"
          className="hidden"
          accept="image/png, image/gif, image/jpeg"
        />
        {chatImage && (
          <div className="absolute left-0 bottom-full border-2 w-20">
            <button
              onClick={() => setChatImage("")}
              className="w-5 h-5 rounded-full bg-red-600 flex items-center justify-center text-white ml-auto absolute right-0"
            >
              X
            </button>
            <img
              src={URL.createObjectURL(chatImage)}
              alt=""
              className="w-full"
            />
          </div>
        )}
        {(message || chatImage) && (
          <button onClick={handelSendMsg}>
            <IoSend className="text-xl text-brand" />
          </button>
        )}
      </div>
      <div className="px-3">
        <EmojiPicker
          open={emojiToggle}
          style={{ width: "100%" }}
          onEmojiClick={handelEmoji}
        />
      </div>
    </div>
  );
};

export default ChatArea;
