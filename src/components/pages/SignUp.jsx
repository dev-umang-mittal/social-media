import React, { useRef, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import useErrorHandler from "../../customHooks/useErrorHandler";
import md5 from "md5";
import { GoogleLogin } from "react-google-login";

export default function SignUp() {
  const {
    user,
    setUser,
    isAuthenticated,
    setAuthenticationStatus,
  } = useContext(AuthContext);
  const name = useRef();
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();
  const errorHandler = useErrorHandler();

  const responseGoogle = (resp) => {
    console.log(resp);
    axios
      .post(`${process.env.REACT_APP_TESTING_URL}/user/login`, {
        gauth: true,
        token: resp.tokenId,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.accessToken);
        setAuthenticationStatus(true);
        setUser(res.data);
      })
      .catch((error) => {
        console.log(error.response.data.messages);
        error.response.data.messages.forEach((msg) => {
          errorHandler({ message: msg });
        });
      });
  };

  const errorGoogle = (err) => {
    console.log(err);
    errorHandler({ code: 12 });
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
      return;
    }
  }, [isAuthenticated]);

  function handleSubmit() {
    axios
      .post(`${process.env.REACT_APP_TESTING_URL}/user/create`, {
        name: name.current.value,
        password: md5(password.current.value),
        email: email.current.value,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.accessToken);
        setAuthenticationStatus(true);
        setUser(res.data);
      })
      .catch((error) => {
        console.log(error.response.data.messages);
        error.response.data.messages.forEach((msg) => {
          errorHandler({ message: msg });
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
                      type="password"
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
                      onKeyDown={(e) => {
                        if (e.code === "Enter") handleSubmit();
                      }}
                    />
                  </li>
                  <li>
                    <input
                      type="button"
                      defaultValue="Register"
                      onClick={handleSubmit}
                    />
                  </li>
                </ul>
                <GoogleLogin
                  clientId="449291285820-q3m2575vj89s9u3ll93bqqgt3je4oo4n.apps.googleusercontent.com"
                  buttonText="Login"
                  onSuccess={responseGoogle}
                  onFailure={errorGoogle}
                  cookiePolicy={"single_host_origin"}
                />
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
