import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PropagateLoader } from "react-spinners";
import { useSelector } from "react-redux";
const Registration = () => {
  const loggedUser = useSelector((state) => state.loggedUser.user);
  const navigate = useNavigate();
  const auth = getAuth();
  const [passShow, setPassShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [userErr, setUserErr] = useState({
    nameErr: "",
    emailErr: "",
    passwordErr: "",
  });
  const handelSubmit = () => {
    const re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if (!user.name) {
      setUserErr({ ...userErr, nameErr: "Name is required!" });
    } else if (!user.email) {
      setUserErr({ ...userErr, emailErr: "Email is required!" });
    } else if (!user.password) {
      setUserErr({ ...userErr, passwordErr: "Password is required!" });
    }
    // else if(!re.test(user.password)){
    //   setUserErr({...userErr, passwordErr: "Please enter a strong password!"})
    // }
    else {
      setLoading(true);
      createUserWithEmailAndPassword(auth, user.email, user.password)
        .then((res) => {
          updateProfile(auth.currentUser, {
            displayName: user.name,
            photoURL: "/defaultuser.png",
          })
            .then(() => {
              sendEmailVerification(auth.currentUser).then(() => {
                setUser({
                  name: "",
                  email: "",
                  password: "",
                });
                setLoading(false);
                toast.success(
                  "Registration successfull, Please verify your email!"
                );
                setTimeout(() => navigate("/login"), 2000);
              });
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((error) => {
          setLoading(false);
          if (error.code == "auth/weak-password") {
            setUserErr({
              ...userErr,
              passwordErr: "Password should be at least 6 characters",
            });
          } else if (error.code == "auth/invalid-email") {
            setUserErr({ ...userErr, emailErr: "Invalid Email Address!" });
          } else if (error.code == "auth/email-already-in-use") {
            setUserErr({ ...userErr, emailErr: "Email already in used!" });
          } else {
            console.log(error.code);
          }
        });
    }
  };
  useEffect(() => {
    if (loggedUser) {
      navigate("/");
    }
  }, []);
  return (
    <section className="h-screen flex items-center justify-center">
      <div className="form-container">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          theme="light"
        ></ToastContainer>
        <p className="title">Get started with easily register</p>
        <div className="form">
          <input
            onChange={(e) => {
              setUser({ ...user, name: e.target.value });
              setUserErr("");
            }}
            value={user.name}
            type="text"
            className="input"
            placeholder="Full Name"
          />
          {userErr.nameErr && <p className="text-red-500">{userErr.nameErr}</p>}
          <input
            value={user.email}
            onChange={(e) => {
              setUser({ ...user, email: e.target.value });
              setUserErr("");
            }}
            type="email"
            className="input"
            placeholder="Email"
          />
          {userErr.emailErr && (
            <p className="text-red-500">{userErr.emailErr}</p>
          )}
          <div className="relative">
            <input
              value={user.password}
              onChange={(e) => {
                setUser({ ...user, password: e.target.value });
                setUserErr("");
              }}
              type={passShow ? "text" : "password"}
              className="input w-full"
              placeholder="Password"
            />
            {passShow ? (
              <IoMdEye
                onClick={() => setPassShow(false)}
                className="absolute top-1/2 right-5 -translate-y-1/2 text-2xl cursor-pointer"
              />
            ) : (
              <IoMdEyeOff
                onClick={() => setPassShow(true)}
                className="absolute top-1/2 right-5 -translate-y-1/2 text-2xl cursor-pointer"
              />
            )}
          </div>
          {userErr.passwordErr && (
            <p className="text-red-500">{userErr.passwordErr}</p>
          )}
          <button
            onClick={handelSubmit}
            disabled={loading}
            className="form-btn"
          >
            {loading ? (
              <PropagateLoader color="white" className="h-6 pt-1" />
            ) : (
              "Registration"
            )}
          </button>
        </div>
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
