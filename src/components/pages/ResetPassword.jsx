import axios from "axios";
import md5 from "md5";
import React, { useEffect, useRef, useState } from "react";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const password = useRef();
  const otp = useRef();
  const confirmPass = useRef();
  const alert = useAlert();
  const navigate = useNavigate();
  const [token, setToken] = useState(sessionStorage.getItem("token"));

  useEffect(() => {
    setToken(sessionStorage.getItem("token"));
    if (!token) {
      alert.error("Link Expired");
      navigate("/");
    }
  }, []);

  const submitPassword = () => {
    if (
      confirmPass.current.value !== password.current.value ||
      password.current.value === ""
    ) {
      alert.error("password don't match");
      return;
    }
    axios
      .post(`${process.env.REACT_APP_TESTING_URL}/user/password/${token}`, {
        password: md5(password.current.value),
        otp: otp.current.value,
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          alert.success("password changed successfully");
          navigate("/login");
        }
      })
      .catch((e) => {
        alert.error(e.response.statusText);
        navigate("/");
      });
  };

  return (
    <>
      <div className="container">
        <div className="content">
          <div className="content_rgt">
            <div className="register_sec">
              <h1>Reset Password</h1>
              <ul>
                <li>
                  <span>EnterOTP sent on your registered Email</span>
                  <input type="text" placeholder="Enter your OTP" ref={otp} />
                </li>
                <li>
                  <span>Enter New Password</span>
                  <input
                    type="password"
                    placeholder="Enter your new password"
                    ref={password}
                  />
                </li>
                <li>
                  <span>Confirm Password</span>
                  <input
                    type="password"
                    placeholder="Enter your password again"
                    ref={confirmPass}
                  />
                </li>
                <li>
                  <input
                    type="button"
                    onClick={submitPassword}
                    value="Submit"
                  />
                </li>
              </ul>
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
      <div className="clear"></div>
    </>
  );
}
