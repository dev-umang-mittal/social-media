import React from "react";
import { Link } from "react-router-dom";

export default function Login() {
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
                    <input type="text" placeholder="Enter your email" />
                  </li>
                  <li>
                    <span>Password</span>
                    <input type="text" placeholder="Enter your password" />
                  </li>
                  <li>
                    <input type="checkbox" />
                    Remember Me
                  </li>
                  <li>
                    <input type="submit" defaultValue="Log In" />
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
