import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";

const Layout = () => {
  const navigate = useNavigate();
  const loggedUser = useSelector((state) => state.loggedUser.user);

  useEffect(() => {
    if (!loggedUser) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="pl-72 pr-6">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
