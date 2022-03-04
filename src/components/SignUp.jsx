import React from "react";
import { Link } from "react-router-dom";

export default function SignUp() {
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
                    <input type="text" placeholder="Enter your username" />
                  </li>
                  <li>
                    <span>Password</span>
                    <input type="text" placeholder="Enter your password" />
                  </li>
                  <li>
                    <span>Email</span>
                    <input type="text" placeholder="Enter your email" />
                  </li>
                  <li>
                    <span>First Name</span>
                    <input type="text" placeholder="Enter your first name" />
                  </li>
                  <li>
                    <span>Last Name</span>
                    <input type="text" placeholder="Enter your last name" />
                  </li>
                  <li>
                    <input type="checkbox" />I agree to Term &amp; Conditions
                  </li>
                  <li>
                    <input type="submit" defaultValue="Register" />
                  </li>
                </ul>
                <div className="addtnal_acnt">
                  I already have an account.
                  <Link to={"/login"}>
                    <a href>Login My Account !</a>
                  </Link>
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
