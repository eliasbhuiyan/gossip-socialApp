import React from "react";
import { Link } from "react-router-dom";

const Registration = () => {
  return (
    <section className="h-screen flex items-center justify-center">
      <div className="form-container">
        <p className="title">Get started with easily register</p>
        <form className="form">
          <input type="email" className="input" placeholder="Email" />
          <input type="text" className="input" placeholder="Full Name" />
          <input type="password" className="input" placeholder="Password" />
          <button className="form-btn">Registration</button>
        </form>
        <p className="sign-up-label">
          Already have an account?
          <Link to="/login" className="sign-up-link pl-2">
            Sign In
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Registration;
