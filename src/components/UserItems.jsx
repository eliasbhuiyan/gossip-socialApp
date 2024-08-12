import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
const UserItems = ({ data }) => {
  const db = getDatabase();
  const loggedUser = useSelector((state) => state.loggedUser.user);
  let [friendReqList, setFriendReqList] = useState([]);
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
    let arr = [];
    onValue(ref(db, "friendReq/"), (snapshot) => {
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
          Requested
        </button>
      ) : friendReqList.includes(data.key + loggedUser.uid) ? (
        <button className="ml-auto font-inter text-lg font-normal text-brand">
          ""
        </button>
      ) : (
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
