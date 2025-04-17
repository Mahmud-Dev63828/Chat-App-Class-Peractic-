import React, { useState } from "react";
import libery from "../../Lib/lib";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { BeatLoader } from "react-spinners";
import { toast, Bounce, Flip } from "react-toastify";
import { Link } from "react-router";
import { getDatabase, push, ref, set } from "firebase/database";
const SignUp = () => {
  const db = getDatabase();
  const auth = getAuth();
  const { successToast, infoToast, errorToast } = libery;
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");

  //  Error state
  const [emailError, setEmailError] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  // eye
  const [eye, setEye] = useState(false);
  // loading
  const [loading, setLoading] = useState(false);

  // ! handle signup function apply
  const handleSignUp = () => {
    if (!email) {
      setEmailError("Email missing");
    } else if (!fullName) {
      setEmailError("");
      setFullNameError("FullName missing");
    } else if (!password) {
      setEmailError("");
      setFullNameError("");
      setPasswordError("Password missing");
    } else {
      setLoading(true);
      setEmailError("");
      setPasswordError("");
      createUserWithEmailAndPassword(auth, email, password)
        .then((userinfo) => {
          successToast("registarion sucessfull ");
          updateProfile(auth.currentUser, {
            displayName: fullName,
            photoURL:
              "https://images.pexels.com/photos/6940512/pexels-photo-6940512.jpeg?auto=compress&cs=tinysrgb&w=600",
          });
        })
        .then(() => {
          const userdb = ref(db, "users/");
          set(push(userdb), {
            userid: auth.currentUser.uid,
            username: auth.currentUser.displayName || fullName,
            email: auth.currentUser.email || email,
            profile_picture:
              auth.currentUser.photoURL ||
              `https://images.pexels.com/photos/6940512/pexels-photo-6940512.jpeg?auto=compress&cs=tinysrgb&w=600`,
          });
          // send email for autheicate user;
          return sendEmailVerification(auth.currentUser);
        })
        .then((mailData) => {
          infoToast("🦄mail send sucessfulll Check your email");
        })
        .catch((err) => {
          errorToast(err.code);
        })
        .finally(() => {
          setLoading(false);
          setFullName("");
          setEmail("");
          setPassword("");
        });
    }
  };

  console.log(auth.currentUser);

  // ! adding data on use state
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleFullName = (event) => {
    setFullName(event.target.value);
  };
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  // ! handleEye
  const handleEye = () => {
    setEye(!eye);
  };
  console.log(passwordError, emailError, fullNameError);

  // loading button
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  return (
    <div>
      <div className="bg-mainBgColor flex items-center justify-between">
        <div className="w-1/2 h-screen flex justify-center items-center">
          <div className="">
            <h1>Get Started With Easily Registerd</h1>
            <p>Free Register And You Can Enjoy It</p>

            <form
              action="#"
              className="mt-10"
              onSubmit={(e) => e.preventDefault()}
            >
              {/* {data?.map(({ name, id, requierd }) => ( */}
              <div
                className="flex flex-col gap-y-1 items-start mb-5"
                // key={id}
              >
                <label htmlFor="email">
                  {`Fill Up The email`}
                  {/*requierd && */ <span className="text-red-600">*</span>}
                  {/* {requierd? (<span className="text-red-600">*</span>}) : (arekta) */}
                </label>
                <input
                  type={"email"}
                  onChange={handleEmail}
                  placeholder={"email"}
                  value={email}
                  name={"email"}
                  className="border border-gray-500 py-1 px-2"
                />

                {emailError && (
                  <span className="text-red-500"> {emailError}</span>
                )}
                {/*  For Dynamic */}
                {/* {name == "email" && email == "" ? (
                    <span className="text-red-600">{emailError}</span>
                  ) : name == "fullName" && fullName == "" ? (
                    <span className="text-red-600">{fullNameError}</span>
                  ) : name == "password" && password == "" ? (
                    <span className="text-red-600">{passwordError}</span>
                  ) : (
                    ""
                  )} */}
              </div>
              <div className="flex flex-col gap-y-1 items-start mb-5">
                <label htmlFor="email">
                  {`Fill Up The Full Name`}
                  {<span className="text-red-600 ml-1">*</span>}
                </label>
                <input
                  type={"text"}
                  placeholder={"FullName"}
                  onChange={handleFullName}
                  value={fullName}
                  name={"fullName"}
                  className="border border-gray-500 py-1 px-2"
                />
                {fullNameError && (
                  <span className="text-red-500"> {fullNameError}</span>
                )}
              </div>
              <div className="flex flex-col gap-y-1 items-start mb-5 relative">
                <label htmlFor="email">
                  {`Fill Up The password`}
                  {<span className="text-red-600">*</span>}
                </label>
                <input
                  type={eye ? "text" : "password"}
                  onChange={handlePassword}
                  placeholder={"password"}
                  value={password}
                  name={"password"}
                  className="border border-gray-500 py-1 px-2"
                />
                <span
                  className="absolute right-[24%] top-[60%] cursor-pointer "
                  onClick={handleEye}
                >
                  {eye ? <FaEyeSlash /> : <FaRegEye />}
                </span>
                {passwordError && (
                  <span className="text-red-500"> {passwordError}</span>
                )}
              </div>
              {/* ))} */}
              {loading ? (
                <button
                  onClick={handleSignUp}
                  className="px-5 py-2 bg-mainColor text-mainBgColor rounded text-lg cursor-pointer"
                >
                  <BeatLoader
                    color={"white"}
                    loading={true}
                    cssOverride={override}
                    size={16}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                </button>
              ) : (
                <button
                  onClick={handleSignUp}
                  className="px-5 py-2 bg-mainColor text-mainBgColor rounded text-lg cursor-pointer"
                >
                  Sign Up
                </button>
              )}
            </form>
            <p className="mt-5">
              Already Have an Account?{" "}
              <Link to={"/signin"} className="text-blue-400">
                Sign In
              </Link>
            </p>
          </div>
        </div>
        <div className="w-1/2 bg-green-400 h-svh">two</div>
      </div>
    </div>
  );
};

export default SignUp;
