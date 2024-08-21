import React, { useEffect, useState } from "react";
import Title from "./Title";
import Search from "./Search";
import GroupItems from "./GroupItems";
import { GiCrossMark } from "react-icons/gi";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { useSelector } from "react-redux";

const MyGroup = () => {
  const loggedUser = useSelector((state) => state.loggedUser.user);
  const [open, setOpen] = useState(false)
  const [groupName , setGroupName] = useState('')
  const [nameErr , setNameErr] = useState('')
  const [groupList, setGroupList] = useState([])
  const db = getDatabase();
  const handelCreate = ()=>{
    if(!groupName){
     return  setNameErr("Please enter a group name!")
    }
    set(
      push(ref(db, "groups/"), {
        groupName: groupName,
        groupImg: '/defaultuser.png',
        createdBy: loggedUser.uid,
        createdByName: loggedUser.displayName,
      }).then(()=>{
        setOpen(false)
        setGroupName("")
      })
    );
  }
  useEffect(() => {
    let arr = [];
    onValue(ref(db, "groups/"), (snapshot) => {
      snapshot.forEach((item) => {    
          if(item.val().createdBy === loggedUser.uid){
          arr.push({...item.val(), key: item.key})
          }
          
      });
      setGroupList(arr);
    });
  }, []);
  return (
    <div className="w-1/3 bg-white p-4 rounded-xl relative overflow-hidden">
      <Title title="My Groups" click={setOpen}/>
      <Search />
      <div className="mt-5 pr-4 overflow-y-scroll h-4/6 cardscroll">
      {
        groupList.map((item)=>(
          <GroupItems data={item} key={item.key}/>
        ))
      }
      </div>
      {
        open &&
        <div className="absolute top-0 left-0 w-full h-full bg-slate-300 p-8 flex flex-col items-center">
        <GiCrossMark onClick={()=>{setOpen(false),setGroupName("")}} className="ml-auto text-xl text-red-600 cursor-pointer"/>
        <h3 className="title">Create a new group</h3>
        <input onChange={(e)=>{setGroupName(e.target.value), setNameErr('')}} type="text" placeholder="Group Name" className="w-full p-2 rounded-xl"/>
         <p className="text-red-500">{nameErr}</p>
        <button onClick={handelCreate} className="py-2 px-4 bg-brand text-white rounded-xl mt-10">Create</button>
      </div>
      }
    </div>
  );
};

export default MyGroup;
