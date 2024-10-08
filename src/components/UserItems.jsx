import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
const UserItems = ({ data }) => {
  const db = getDatabase();
  const loggedUser = useSelector((state) => state.loggedUser.user);
  let [friendReqList, setFriendReqList] = useState([]);
  let [friendList, setFriendList] = useState([]);
  const [blockList, setBlockList] = useState([])
  const handelReq = () => {
    set(
      push(ref(db, "friendReq/"), {
        senderId: loggedUser.uid,
        senderName: loggedUser.displayName,
        senderImg: loggedUser.photoURL,
        reciverId: data.key,
        reciverName: data.displayName,
        reciverImg: data.photoURL,
      })
    );
  };
  useEffect(() => {
    onValue(ref(db, "friendReq/"), (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (
          item.val().senderId === loggedUser.uid ||
          item.val().reciverId == loggedUser.uid
        ) {
          arr.push(item.val().senderId + item.val().reciverId);
        }
      });
      setFriendReqList(arr);
    });
  }, []);
  useEffect(() => {
    onValue(ref(db, "friendList/"), (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (
          item.val().senderId === loggedUser.uid ||
          item.val().reciverId == loggedUser.uid
        ) {
          arr.push(item.val().senderId + item.val().reciverId);
        }
      });
      setFriendList(arr);
    });
  }, []);
  useEffect(() => {
    onValue(ref(db, "blockList/"), (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if(item.val().blockedById === loggedUser.uid || item.val().blockedId === loggedUser.uid){
          arr.push(item.val().blockedById + item.val().blockedId)
        }
      });
      setBlockList(arr);
    });
  }, []);  
  return (
    <div className="flex items-center gap-4 mb-4">
      <div className="w-12 h-12 rounded-full overflow-hidden">
        <img src={data?.photoURL} alt="users" className="w-full" />
      </div>
      <div>
        <h3 className="name">{data?.displayName}</h3>
      </div>
      {friendReqList.includes(loggedUser.uid + data.key) ? (
        <button className="ml-auto font-inter text-lg font-normal text-brand">
          Cancel
        </button>
      ) : friendReqList.includes(data.key + loggedUser.uid) ? (
        <button className="ml-auto font-inter text-lg font-normal text-brand">
          Response
        </button>
      ) :
      friendList.includes(loggedUser.uid + data.key) || friendList.includes(data.key + loggedUser.uid)
      ?
      <button
          className="ml-auto font-inter text-lg font-normal text-brand"
        >
          Friends
        </button>
      :
      blockList.includes(loggedUser.uid + data.key) || blockList.includes(data.key + loggedUser.uid)
      ?
      <button
          className="ml-auto font-inter text-lg font-normal text-brand"
        >
          Blocked
        </button>
      : (
        <button
          onClick={handelReq}
          className="ml-auto font-inter text-lg font-normal text-brand"
        >
          Add Request
        </button>
      )}
    </div>
  );
};

export default UserItems;
