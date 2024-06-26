import React from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <section className="h-screen flex items-center justify-center">
      <div className="form-container">
        <p className="title">Welcome to Gossip</p>
        <form className="form">
          <input type="email" className="input" placeholder="Email" />
          <input type="password" className="input" placeholder="Password" />
          <p className="page-link">
            <span className="page-link-label">Forgot Password?</span>
          </p>
          <button className="form-btn">Log in</button>
        </form>
        <p className="sign-up-label">
          Don't have an account?
          <Link to="/registration" className="sign-up-link pl-2">
            Sign up
          </Link>
        </p>
        <div className="buttons-container">
          <div className="google-login-button">
            <FcGoogle className="text-2xl" />
            <span>Log in with Google</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
