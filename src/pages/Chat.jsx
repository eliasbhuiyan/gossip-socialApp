import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import Search from "../components/Search";
import ChatItems from "../components/ChatItems";
import ChatArea from "../components/ChatArea";
import { getDatabase, onValue, ref } from "firebase/database";
import { useSelector } from "react-redux";
import GroupChatItems from "../components/GroupChatItems";
const Chat = () => {
  let [friendList, setFriendList] = useState([]);
  const [groupList, setGroupList] = useState([])
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
            key: item.key,
          });
        } else if(item.val().reciverId === loggedUser.uid){
          arr.push({
            friendName: item.val().senderName,
            friendId: item.val().senderId,
            friendImg: item.val().senderImg,
            key: item.key,
          });
        }
      });
      setFriendList(arr);
    });
  }, []);

  useEffect(() => {
    let arr = [];
    onValue(ref(db, "groupMembers/"), (snapshot) => {
      snapshot.forEach((item) => { 
        if(item.val().createdBy === loggedUser.uid || item.val().memberId === loggedUser.uid){
          arr.push({...item.val(), key: item.key})        
        }   
      });
      setGroupList(arr);
    });
  }, []);
  
  return (
    <div className="py-10 h-screen flex justify-center">
      <div className="w-1/3 h-full bg-white p-4 rounded-l-xl">
        <Title title="Chat" />
        <Search />
        <div className="mt-5 pr-4 overflow-y-scroll h-5/6 cardscroll">
        <p>All Friends</p>
        {
          friendList.map((item)=>(
            <ChatItems key={item.key} data={item}/>
          ))
        }
        <p>All Groups</p>
        {
          groupList.map((item)=>(
            <GroupChatItems key={item.key} data={item}/>
          ))
        }
        </div>
      </div>
      <ChatArea />
    </div>
  );
};

export default Chat;
