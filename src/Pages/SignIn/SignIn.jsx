import React, { useState } from "react";

import { getDatabase, ref, set } from "firebase/database";
import { FcGoogle } from "react-icons/fc";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { Link } from "react-router";

const SignIn = () => {
  const auth = getAuth();
  const database = getDatabase();

  const [logInInfo, setLogInInfo] = useState({
    email: "",
    password: "",
  });

  //   ! On Change Listener
  const logInCng = (event) => {
    const { name, value } = event.target;
    setLogInInfo({
      ...logInInfo,
      [name]: value,
    });
  };

  // ! handle handleForm
  const handleForm = (e) => {
    e.preventDefault();
  };
  //   ! handle login click
  const handleLogIn = () => {
    const { email, password } = logInInfo;
    signInWithEmailAndPassword(auth, email, password)
      .then((info) => {
        console.log(info);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //   ! Handle Google
  const handleGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((userInfo) => {
        set(ref(database, "users/"), {
          username: "Mahmud",
          email: "mahmud@1234",
          profile_picture: "imageUrl",
        });
        console.log(userInfo);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="flex">
        <div className="w-1/2  h-screen flex items-center justify-center">
          <div className="">
            <h1>Login to your account!</h1>
            <div
              className="border rounded-2xl mt-3 justify-between py-2 px-4 flex items-center cursor-pointer"
              onClick={handleGoogle}
            >
              <span className="text-3xl pr-1.5">
                <FcGoogle />
              </span>
              Login with Google
            </div>
            <div>
              <form
                action="#"
                className="flex flex-col gap-y-4 mt-5"
                onSubmit={handleForm}
              >
                <div className="flex flex-col items-start gap-y-2">
                  <label htmlFor="email" className="text-gray-400">
                    {" "}
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={logInInfo.email}
                    onChange={logInCng}
                    placeholder="Youraddres@email.com"
                    className="px-3 py-1 border-b border-b-gray-500 focus:outline-0"
                  />
                </div>
                <div className="flex flex-col items-start gap-y-2">
                  <label htmlFor="email" className="text-gray-400">
                    {" "}
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={logInInfo.password}
                    onChange={logInCng}
                    placeholder="Enter your password"
                    className="mt-0 px-3 py-1 border-b border-b-gray-500 focus:outline-0"
                  />
                </div>
              </form>
            </div>
            <p className="mt-5">
              Don't have an Account?{" "}
              <Link to={"/signup"} className="text-blue-400">
                Sign Up
              </Link>
            </p>
            <button
              className="bg-mainColor cursor-pointer py-3 px-5 text-white mt-6 rounded "
              type="button"
              onClick={handleLogIn}
            >
              Login to Continue
            </button>
          </div>
        </div>
        <div className="w-1/2 bg-blue-400 h-screen">right</div>
      </div>
    </div>
  );
};

export default SignIn;
