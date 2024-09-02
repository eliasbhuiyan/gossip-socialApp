import React, { useEffect, useState } from "react";
import Title from "./Title";
import Search from "./Search";
import FriendItems from "./FriendItems";
import FriendReqItems from "./FriendReqItems";
import { getDatabase, onValue, ref } from "firebase/database";
import { useSelector } from "react-redux";

const FriendRequest = () => {
  const loggedUser = useSelector((state) => state.loggedUser.user);
  let [friendReqList, setFriendReqList] = useState([]);
  const db = getDatabase();
  useEffect(() => {
    onValue(ref(db, "friendReq/"), (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (item.val().reciverId == loggedUser.uid) {
          arr.push({ ...item.val(), key: item.key });
        }
      });
      setFriendReqList(arr);
    });
  }, []);

  return (
    <div className="w-1/3 bg-white p-4 rounded-xl">
      <Title title="Friend Requests" />
      <div className="mt-5 pr-4 overflow-y-scroll h-5/6 cardscroll">
        {
          friendReqList.length > 0
          ?
          friendReqList.map((item) => (
            <FriendReqItems data={item} key={item.key} />
          ))
          :
          <p className="text-center">
            No Friend request available
          </p>
        }
      </div>
    </div>
  );
};

export default FriendRequest;
