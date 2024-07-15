import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loggedUserData } from "../reducer/userSlice";

const Login = () => {
  const loggedUser = useSelector((state) => state.loggedUser.user);
  const navigate = useNavigate();
  const auth = getAuth();
  const db = getDatabase();
  const provider = new GoogleAuthProvider();
  const dispatch = useDispatch();
  const [passShow, setPassShow] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [userErr, setUserErr] = useState({
    emailErr: "",
    passwordErr: "",
  });
  const handelLogin = () => {
    if (!user.email) {
      setUserErr({ ...userErr, emailErr: "Email is required!" });
    } else if (!user.password) {
      setUserErr({ ...userErr, passwordErr: "Password is required!" });
    } else {
      signInWithEmailAndPassword(auth, user.email, user.password)
        .then((res) => {
          if (res.user.emailVerified) {
            set(ref(db, "users/" + res.user.uid), {
              displayName: res.user.displayName,
              email: res.user.email,
              photoURL: res.user.photoURL,
            })
              .then(() => {
                dispatch(loggedUserData(res.user));
                toast.success("Login successfull!");
                setTimeout(() => {
                  navigate("/");
                }, 2000);
              })
              .catch((err) => {
                console.log(err.message);
              });
          } else {
            toast.error(
              "Email is not verified! please check your email and verify."
            );
          }
        })
        .catch((err) => {
          console.log(err.code);
          if (err.code == "auth/invalid-email") {
            setUserErr({ ...userErr, emailErr: "Invalid Email Address!" });
          } else if (err.code == "auth/invalid-credential") {
            setUserErr({ ...userErr, passwordErr: "Authontication Failed!" });
          }
        });
    }
  };
  const handelGoogle = () => {
    signInWithPopup(auth, provider)
      .then((res) => {
        set(ref(db, "users/" + res.user.uid), {
          displayName: res.user.displayName,
          email: res.user.email,
          photoURL: res.user.photoURL,
        })
          .then(() => {
            dispatch(loggedUserData(res.user));
            toast.success("Login successfull!");
            setTimeout(() => {
              navigate("/");
            }, 2000);
          })
          .catch((err) => {
            console.log(err.message);
          });
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
      });
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
        <p className="title">Welcome to Gossip</p>
        <div className="form">
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
          <p className="page-link">
            <span className="page-link-label">Forgot Password?</span>
          </p>
          <button onClick={handelLogin} className="form-btn">
            Log in
          </button>
        </div>
        <p className="sign-up-label">
          Don't have an account?
          <Link to="/registration" className="sign-up-link pl-2">
            Sign up
          </Link>
        </p>
        <div className="buttons-container">
          <div onClick={handelGoogle} className="google-login-button">
            <FcGoogle className="text-2xl" />
            <span>Log in with Google</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
