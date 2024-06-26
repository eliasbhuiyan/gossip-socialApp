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
import { Link } from "react-router-dom";

const Navbar = () => {
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
            className="bg-brand text-white py-3 px-10 w-fit items-center rounded-xl"
          >
            <IoHomeOutline />
            <p className="pl-2">Home</p>
          </Link>
        </NavItem>
        <NavItem>
          <Link
            to="/"
            className="bg-white text-brand py-3 px-10 w-fit items-center rounded-xl"
          >
            <IoHomeOutline />
            <p className="pl-2">Chat</p>
          </Link>
        </NavItem>
      </MenuBar>
      <Contact>
        <div className="flex items-center gap-3">
          <FaRegUserCircle className="text-2xl" />
          <p className="flex flex-col text-lg">
            <span> Paula Mora</span>
            <span>Edit Profile</span>
          </p>
        </div>
      </Contact>
    </SideNavbar>
  );
};

export default Navbar;
