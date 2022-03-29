import axios from "axios";
import md5 from "md5";
import React, { useContext, useEffect, useRef } from "react";
import useErrorHandler from "../../customHooks/useErrorHandler";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Login() {
  const {
    user,
    setUser,
    isAuthenticated,
    setAuthenticationStatus,
  } = useContext(AuthContext);
  const email = useRef(email);
  const password = useRef(password);
  const errorHandler = useErrorHandler();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
      return;
    }
  }, [isAuthenticated]);

  function login(email, password) {
    axios
      .post(`${process.env.REACT_APP_TESTING_URL}/user/login`, {
        email: email,
        password: md5(password),
      })
      .then((res) => {
        console.log(res);
        if (!res.data.response) {
          errorHandler({ code: 1 });
          return;
        }
        localStorage.setItem("token", res.data.accessToken);
        setAuthenticationStatus(true);
        setUser(res.data);
      })
      .catch((error) => {
        errorHandler(error);
      });
  }

  return (
    <>
      <div>
        <div className="container">
          <div className="content">
            <div className="content_rgt">
              <div className="login_sec">
                <h1>Log In</h1>
                <ul>
                  <li>
                    <span>Email-ID</span>
                    <input
                      type="text"
                      placeholder="Enter your email"
                      ref={email}
                    />
                  </li>
                  <li>
                    <span>Password</span>
                    <input
                      type="password"
                      placeholder="Enter your password"
                      ref={password}
                      onKeyDown={(e) => {
                        if (e.code === "Enter")
                          login(email.current.value, password.current.value);
                      }}
                    />
                  </li>
                  <li>
                    <input
                      type="button"
                      defaultValue="Log In"
                      onClick={() => {
                        login(email.current.value, password.current.value);
                      }}
                    />
                    <Link to={"/forgot"}>Forgot Password</Link>
                  </li>
                </ul>
                <div className="addtnal_acnt">
                  I do not have any account yet.
                  <Link to={"/signup"}>Create My Account Now !</Link>
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
                hidden in the middle of text.
              </p>
              <img src={require("../../assets/images/img_9.png")} alt="" />
            </div>
          </div>
        </div>
        <div className="clear" />
      </div>
    </>
  );
}
