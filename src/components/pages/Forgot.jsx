import axios from "axios";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useErrorHandler from "../../customHooks/useErrorHandler";

export default function Forgot() {
  const email = useRef();
  const navigate = useNavigate();
  const errorHandler = useErrorHandler();

  const sendEmail = () => {
    axios
      .get(
        `${process.env.REACT_APP_TESTING_URL}/user/forgot/${email.current.value}`
      )
      .then((res) => {
        if (res.data) {
          sessionStorage.setItem("token", res.data.token);
          errorHandler({
            custom: {
              type: "success",
              message: "OTP is sent on registered email",
            },
          });
          navigate("/reset");
        } else {
          errorHandler({
            custom: {
              type: "error",
              message: "Email is not linked ot any account",
            },
          });
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
