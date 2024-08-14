import React, { useEffect, useState } from "react";
import Title from "./Title";
import Search from "./Search";
import FriendItems from "./FriendItems";
import { getDatabase, onValue, ref } from "firebase/database";
import { useSelector } from "react-redux";
const Friends = () => {
  let [friendList, setFriendList] = useState([]);
  const loggedUser = useSelector((state) => state.loggedUser.user);
  const db = getDatabase();
  useEffect(() => {
    let arr = [];
    onValue(ref(db, "friendList/"), (snapshot) => {
      snapshot.forEach((item) => {
        if (item.val().senderId === loggedUser.uid) {
          arr.push({
            friendName: item.val().reciverName,
            friendId: item.val().reciverId,
            friendImg: item.val().reciverImg,
            key: item.key
          });
        } else if(item.val().reciverId === loggedUser.uid){
          arr.push({
            friendName: item.val().senderName,
            friendId: item.val().senderId,
            friendImg: item.val().senderImg,
            key: item.key
          });
        }
      });
      setFriendList(arr);
    });
  }, []);
  return (
    <div className="w-1/3 bg-white p-4 rounded-xl">
      <Title title="Friends" />
      <Search />
      <div className="mt-5 pr-4 overflow-y-scroll h-4/6 cardscroll">
      {
        friendList.map((item)=>(
          <FriendItems data={item} key={item.key}/>
        ))
      }
      </div>
    </div>
  );
};

export default Friends;
