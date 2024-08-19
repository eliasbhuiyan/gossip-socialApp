import { useEffect, useState } from "react";
import Title from "./Title";
import Search from "./Search";
import UserItems from "./UserItems";
import { getDatabase, ref, onValue } from "firebase/database";
import { useSelector } from "react-redux";
const Users = () => {
  const db = getDatabase();
  const loggedUser = useSelector((state) => state.loggedUser.user);
  const [userList, setUserList] = useState([]);
  const [search, setSearch] = useState("")
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
  }, [search]);
  
  useEffect(() => {
    if(search.length > 0){
      onValue(ref(db, "users/"), (snapshot) => {
        let arr = [];
        snapshot.forEach((item) => {  
          if (loggedUser?.uid !== item.key) {
            if(item.val().displayName.toLowerCase().includes(search.toLowerCase())){
             return arr.push({ ...item.val(), key: item.key })
            }           
          }
          });
          setUserList(arr);
        });
      }
  }, [search]);
  
  return (
    <div className="w-1/3 bg-white p-4 rounded-xl">
      <Title title="Users" />
      <Search onSearch={setSearch}/>
      <div className="mt-5 pr-4 overflow-y-scroll h-4/6 cardscroll">
        { userList.length > 0
        ?
        userList.map((item) => (
          <UserItems data={item} key={item.key} />
        ))
      :
      <p className="text-center">No users found!</p>
      }
      </div>
    </div>
  );
};

export default Users;
