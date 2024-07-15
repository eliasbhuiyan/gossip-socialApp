import React from "react";
import {
  SideNavbar,
  NavbarBrand,
  MenuBar,
  NavItem,
  Contact,
} from "responsive-navigation";
import { FaRegUserCircle } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loggedUserData } from "../reducer/userSlice";
// elias.cit.bd@gmail.com
const Navbar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const loggedUser = useSelector((state) => state.loggedUser.user);
  const path = location.pathname;
  const handelLogout = () => {
    dispatch(loggedUserData(null));
    navigate("/login");
  };
  return (
    <SideNavbar style={{ width: "250px", background: "white" }}>
      <NavbarBrand>
        <Link to="/" className="text-3xl font-bold text-brand">
          GOSSIP
        </Link>
      </NavbarBrand>
      <MenuBar>
        <NavItem>
          <Link
            to="/"
            className={`${
              path === "/" ? "bg-brand text-white" : "bg-white text-brand"
            } py-3 px-10 w-fit items-center rounded-xl`}
          >
            <IoHomeOutline />
            <p className="pl-2">Home</p>
          </Link>
        </NavItem>
        <NavItem>
          <Link
            to="/chat"
            className={`${
              path === "/chat" ? "bg-brand text-white" : "bg-white text-brand"
            } py-3 px-10 w-fit items-center rounded-xl`}
          >
            <IoHomeOutline />
            <p className="pl-2">Chat</p>
          </Link>
        </NavItem>
      </MenuBar>
      <Contact>
        <div>
          <Link
            to="/profile"
            className={`w-full flex items-center justify-center py-2 rounded-lg gap-3 ${
              path === "/profile" && "bg-brand text-white"
            }`}
          >
            <div className="w-12 rounded-full overflow-hidden">
              <img
                src={loggedUser?.photoURL}
                alt="profile"
                className="w-full"
              />
            </div>
            <p className="flex flex-col text-lg">
              <span> {loggedUser?.displayName}</span>
              <span>Edit Profile</span>
            </p>
          </Link>
          <button
            onClick={handelLogout}
            className="bg-brand py-2 px-4 text-white rounded-lg w-full mt-8"
          >
            Log Out
          </button>
        </div>
      </Contact>
    </SideNavbar>
  );
};

export default Navbar;
