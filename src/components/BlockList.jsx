import React, { useEffect, useState } from "react";
import Title from "./Title";
import BlockListITems from "./BlockListITems";
import { getDatabase, onValue, ref } from "firebase/database";
import { useSelector } from "react-redux";

const BlockList = () => {
  const [blockList, setBlockList] = useState([])
  const loggedUser = useSelector((state) => state.loggedUser.user);
  const db = getDatabase();
  useEffect(() => {
    let arr = [];
    onValue(ref(db, "blockList/"), (snapshot) => {
      snapshot.forEach((item) => {
        if(item.val().blockedById === loggedUser.uid){
          arr.push({...item.val(), key: item.key})
        }
      });
      setBlockList(arr);
    });
  }, []);  
  return (
    <div className="w-1/3 bg-white p-4 rounded-xl">
      <Title title="Block List" />
      <div className="mt-5 pr-4 overflow-y-scroll h-5/6 cardscroll">
      {
        blockList.length > 0
        ?
        blockList.map((item)=>(
          <BlockListITems data={item} key={item.key}/>
        ))
        :
        <p className="text-center">Empty blocklist</p>
      }
      </div>
    </div>
  );
};

export default BlockList;
