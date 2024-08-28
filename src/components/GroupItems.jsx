import React, { useEffect, useState } from "react";
import { IoMdMore } from "react-icons/io";
import { useSelector } from "react-redux";
import { GiCrossMark } from "react-icons/gi";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
const GroupItems = ({data}) => {
  const db = getDatabase();
  const loggedUser = useSelector((state) => state.loggedUser.user);
  const [userList, setUserList] = useState([]);
  const [groupMemberList, setGroupMemberList] = useState([]);
  const [open, setOpen] = useState(false)
  const [openUser, setOpenUser] = useState(false)
  useEffect(() => {
    onValue(ref(db, "users/"), (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {        
        if (loggedUser?.uid !== item.key) {
          arr.push({ ...item.val(), key: item.key });
        }
      });
      setUserList(arr);
    });
    onValue(ref(db, "groupMembers/"), (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {        
          arr.push(item.val().groupId + item.val().memberId);
      });
      setGroupMemberList(arr);
    });
  }, []);
  
  const handleAddToGroup = (userData)=>{
   set(
    push(ref(db, "groupMembers/"), {
      groupId: data.key,
      groupName: data.groupName,
      memberName: userData.displayName,
      memberId: userData.key,
      createdBy: data.createdBy
    })
  );
  }
  return (
     <div className="flex items-center gap-4 mb-4">
      <div className="w-12 h-12 rounded-full overflow-hidden">
        <img src={data?.groupImg} alt="group" className="w-full"/>
      </div>
      <div>
        <h3 className="name">{data?.groupName}</h3>
        <p>Admin : {loggedUser.uid === data.createdBy ? "You" : `${data.createdByName}`}</p>
      </div>
      {
        loggedUser.uid === data.createdBy
        ?
        <IoMdMore className="ml-auto cursor-pointer text-3xl" onClick={()=>setOpen(true)}/>
       : 
       groupMemberList.includes(data.key + loggedUser.uid)
       ?
       <button className="ml-auto cursor-pointer">Leave</button>
       :
       <button className="ml-auto cursor-pointer">Join</button>
      }
     {
      open &&
      <div className="absolute h-full w-full top-0 left-0 bg-slate-400 flex flex-col items-center justify-center gap-7">
        <h3 className="name">Group Name : {data.groupName}</h3>
        <div className="flex justify-center items-center gap-5">
          <GiCrossMark onClick={()=>setOpen(false)} className="absolute top-8 right-8 text-red-600 cursor-pointer"/>
          <button className="text-white py-2 px-4 rounded-xl bg-red-600">Delete Group</button>
          <button onClick={()=>{setOpenUser(true), setOpen(false)}} className="text-white py-2 px-4 rounded-xl bg-green-600">Add Member</button>
        </div>
      </div>
     }
     {
      openUser &&
      <div className="absolute h-full w-full top-0 left-0 bg-slate-400 flex flex-col items-start p-8 overflow-scroll">
        <GiCrossMark onClick={()=>setOpenUser(false)} className="absolute top-8 right-8 text-red-600 cursor-pointer"/>
        {
          userList.map((item) => (
            <div key={item.key} className="flex items-center gap-4 my-4 w-full">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img src={item?.photoURL} alt="users" className="w-full" />
              </div>
              <div>
                <h3 className="name">{item?.displayName}</h3>
              </div>
              {
                groupMemberList.includes(data.key + item.key)
                ?
                <button
                  className="ml-auto font-inter text-lg font-normal text-brand"
                >
                  Added
                </button>
                :
                <button
                onClick={()=>handleAddToGroup(item)}
                  className="ml-auto font-inter text-lg font-normal text-brand"
                >
                  Add
                </button>
              }
            </div>
          ))
        }
      </div>
     }
    </div>
  );
};

export default GroupItems;
