import React, { useEffect, useState } from "react";
import Title from "./Title";
import Search from "./Search";
import GroupItems from "./GroupItems";
import { getDatabase, onValue, ref } from "firebase/database";
import { useSelector } from "react-redux";

const AllGroup = () => {
  const loggedUser = useSelector((state) => state.loggedUser.user);
  const db = getDatabase();
  const [groupList, setGroupList] = useState([])
  useEffect(() => {
    onValue(ref(db, "groups/"), (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {    
          arr.push({...item.val(), key: item.key})          
      });
      setGroupList(arr);
    });
  }, []);
  
  return (
    <div className="w-1/3 bg-white p-4 rounded-xl relative">
      <Title title="Group" />
      <Search />
      <div className="mt-5 pr-4 overflow-y-scroll h-4/6 cardscroll">
      {
        groupList.map((item)=>(
          <GroupItems data={item} key={item.key}/>
        ))
      }
      </div>
    </div>
  );
};

export default AllGroup;
