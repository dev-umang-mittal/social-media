import axios from "axios";
import React, { useRef, useState } from "react";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";

export default function Forgot() {
  const email = useRef();
  const navigate = useNavigate();
  const alert = useAlert();

  const sendEmail = () => {
    axios
      .get(
        `${process.env.REACT_APP_TESTING_URL}/user/forgot/${email.current.value}`
      )
      .then((res) => {
        if (res.data) {
          sessionStorage.setItem("token", res.data.token);
          alert.success("Otp is sent on registered email id");
          navigate("/reset");
        } else {
          alert.error("Email is not found");
        }
      });
  };

  return (
    <>
      <div className="container">
        <div className="content">
          <div className="content_rgt">
            <div className="register_sec">
              <h1>Forgot Password</h1>
              <ul>
                <li>
                  <span>Enter E-mail ID</span>
                  <input type="text" ref={email} placeholder="User@gmail.com" />
                </li>
                <li>
                  <input
                    type="button"
                    onClick={sendEmail}
                    defaultValue="Submit"
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
            <img src="images/img_9.png" alt="" />
          </div>
        </div>
      </div>
      <div className="clear" />
    </>
  );
}
