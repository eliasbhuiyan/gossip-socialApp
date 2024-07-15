import React, { useEffect, useState } from "react";
import Title from "./Title";
import Search from "./Search";
import UserItems from "./UserItems";
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";
import { useSelector } from "react-redux";
const Users = () => {
  const db = getDatabase();
  const loggedUser = useSelector((state) => state.loggedUser.user);
  const [userList, setUserList] = useState([]);
  console.log(loggedUser.uid);
  useEffect(() => {
    onValue(ref(db, "users/"), (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (loggedUser.uid !== item.key) {
          arr.push({ ...item.val(), key: item.key });
        }
      });
      setUserList(arr);
    });
  }, []);
  return (
    <div className="w-1/3 bg-white p-4 rounded-xl">
      <Title title="Users" />
      <Search />
      <div className="mt-5 pr-4 overflow-y-scroll h-4/6 cardscroll">
        {userList.map((item) => (
          <UserItems data={item} key={item.key} />
        ))}
      </div>
    </div>
  );
};

export default Users;
