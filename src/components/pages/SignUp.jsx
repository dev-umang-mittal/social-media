import React, { useRef, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import axios, { Axios } from "axios";
import { useAlert } from "react-alert";

export default function SignUp() {
  const { user, setUser } = useContext(AuthContext);
  const name = useRef();
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();
  const alert = useAlert();

  useEffect(() => {
    if (user) {
      navigate("/home");
      return;
    }
  }, [user]);

  function handleSubmit() {
    axios
      .post(`${process.env.REACT_APP_TESTING_URL}/user/create`, {
        username: username.current.value,
        name: name.current.value,
        password: password.current.value,
        email: email.current.value,
      })
      // axios
      //   .post(`${process.env.REACT_APP_TESTING_URL}/user/create`, {
      //     username: "uma",
      //     name: "Umang Mittal",
      //     password: "password",
      //     email: "email",
      //   })
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.data.accessToken);
        setUser(res.data);
      })
      .catch((error) => {
        console.log(error.response.data.messages);
        error.response.data.messages.forEach((msg) => {
          alert.error(msg);
        });
      });
  }

  return (
    <>
      <div>
        <div className="container">
          <div className="content">
            <div className="content_rgt">
              <div className="register_sec">
                <h1>Create An Account</h1>
                <ul>
                  <li>
                    <span>Username</span>
                    <input
                      type="text"
                      placeholder="Enter your username"
                      ref={username}
                    />
                  </li>
                  <li>
                    <span>Email</span>
                    <input
                      type="text"
                      placeholder="Enter your email"
                      ref={email}
                    />
                  </li>
                  <li>
                    <span>Password</span>
                    <input
                      type="text"
                      placeholder="Enter your password"
                      ref={password}
                    />
                  </li>
                  <li>
                    <span>Your Name</span>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      ref={name}
                    />
                  </li>
                  <li>
                    <input
                      type="submit"
                      defaultValue="Register"
                      onClick={handleSubmit}
                    />
                  </li>
                </ul>
                <div className="addtnal_acnt">
                  I already have an account.
                  <Link to={"/login"}>Login My Account !</Link>
                </div>
              </div>
            </div>
            <div className="content_lft">
              <h1>Welcome from PPL!</h1>
              <p className="discrptn">
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form, by
                injected humour, or randomised words which don't look even
                slightly believable. If you are going to use a passage of Lorem
                Ipsum, you need to be sure there isn't anything embarrassing
                hidden in the middle of text.{" "}
              </p>
              <img src="images/img_9.png" alt="" />
            </div>
          </div>
        </div>
        <div className="clear" />
      </div>
    </>
  );
}
