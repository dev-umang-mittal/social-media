import React from "react";

export default function Footer() {
  return (
    <div className="footr">
      <div className="footr_lft">
        <div className="footer_div1">
          Copyright © Pet-Socail 2014 All Rights Reserved
        </div>
        <div className="footer_div2">
          <p>Privacy Policy </p>| <p> Terms & Conditions</p>
        </div>
      </div>
      <div className="footr_rgt">
        <ul>
          <li>
            <a>
              <img src={require("../../assets/images/social_1.png")} />
            </a>
          </li>
          <li>
            <a>
              <img src={require("../../assets/images/social_2.png")} />
            </a>
          </li>
          <li>
            <a>
              <img src={require("../../assets/images/social_3.png")} />
            </a>
          </li>
          <li>
            <a>
              <img src={require("../../assets/images/social_4.png")} />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
