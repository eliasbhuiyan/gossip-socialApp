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
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation()

  const path = location.pathname;
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
            className={`${path === "/" ? "bg-brand text-white": "bg-white text-brand"} py-3 px-10 w-fit items-center rounded-xl`}
          >
            <IoHomeOutline />
            <p className="pl-2">Home</p>
          </Link>
        </NavItem>
        <NavItem>
          <Link
            to="/chat"
            className={`${path === "/chat" ? "bg-brand text-white": "bg-white text-brand"} py-3 px-10 w-fit items-center rounded-xl`}
          >
            <IoHomeOutline />
            <p className="pl-2">Chat</p>
          </Link>
        </NavItem>
      </MenuBar>
      <Contact>
        <Link to="/profile" className={`w-full flex items-center justify-center py-2 rounded-lg gap-3 ${path === "/profile" && "bg-brand text-white"}`}>
          <FaRegUserCircle className="text-2xl" />
          <p className="flex flex-col text-lg">
            <span> Paula Mora</span>
            <span>Edit Profile</span>
          </p>
        </Link>
      </Contact>
    </SideNavbar>
  );
};

export default Navbar;
