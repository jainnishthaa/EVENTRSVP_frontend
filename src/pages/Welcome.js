import axios from "../utils/axios";
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Welcome = () => {
  const [signup, setSignup] = useState(true);
  const nameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const navigate = useNavigate();
  const signupHandler = async () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const name = nameRef.current.value;
    const formdata = {
      name: name,
      email: email,
      password: password,
    };
    try {
      const { data } = await axios.post("signup", formdata);
      sessionStorage.setItem("userData", JSON.stringify(data.user));
      navigate("/home");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const loginHandler = async () => {
    const name = nameRef.current.value;
    const password = passwordRef.current.value;
    try {
      const { data } = await axios.post("login", { name, password });
      sessionStorage.setItem("userData", JSON.stringify(data.user));
      navigate("/home");
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  return (
    <>
      {signup && (
        <div className="signupdiv">
          <div>Sign up to Event Manager</div>
          <input ref={nameRef} type="text" placeholder="Enter Name" />
          <br />
          <input ref={emailRef} type="email" placeholder="Enter Email" />
          <br />
          <input
            ref={passwordRef}
            type="password"
            placeholder="Enter password"
          />
          <br />
          <button onClick={signupHandler}>Sign Up</button>
          <div>
            Already a User!{" "}
            <Link
              onClick={() => {
                setSignup(false);
              }}
            >
              Login
            </Link>
          </div>
        </div>
      )}
      {!signup && (
        <div className="logindiv">
          <div>Login to Event Manager</div>
          <input ref={nameRef} type="text" placeholder="Enter name or email" />
          <br />
          <input
            ref={passwordRef}
            type="password"
            placeholder="Enter password"
          />
          <br />
          <button onClick={loginHandler}>Login</button>
          <div>
            New User?{" "}
            <Link
              onClick={() => {
                setSignup(true);
              }}
            >
              Sign up
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Welcome;
