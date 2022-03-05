import React from "react";
import { Link } from "react-router-dom";

export default function PostComponent() {
  return (
    <>
      <div className="contnt_2">
        <div className="div_a">
          <div className="div_title">
            <Link to={"/post/id"}>
              User Interface PSD Source files Web Designing for web
            </Link>
          </div>
          <div className="btm_rgt">
            <div className="btm_arc">Cats</div>
          </div>
          <div className="div_top">
            <div className="div_top_lft">
              <img src={require("../../assets/images/img_6.png")} />
              Steave Waugh
            </div>
            <div className="div_top_rgt">
              <span className="span_date">02 Jan 2014</span>
              <span className="span_time">11:15am</span>
            </div>
          </div>
          <div className="div_image">
            <img src={require("../../assets/images/lft_img.png")} alt="pet" />
          </div>
          <div className="div_btm">
            <div className="btm_list">
              <ul>
                <li>
                  <a>
                    <span className="btn_icon">
                      <img
                        src={require("../../assets/images/icon_001.png")}
                        alt="share"
                      />
                    </span>
                    Share
                  </a>
                </li>
                <li>
                  <a>
                    <span className="btn_icon">
                      <img
                        src={require("../../assets/images/icon_002.png")}
                        alt="share"
                      />
                    </span>
                    Flag
                  </a>
                </li>
                <li>
                  <Link to={"/post/id"}>
                    <span className="btn_icon">
                      <img
                        src={require("../../assets/images/icon_003.png")}
                        alt="share"
                      />
                    </span>
                    0 Likes
                  </Link>
                </li>
                <li>
                  <Link to={"/post/id"}>
                    <span className="btn_icon">
                      <img
                        src={require("../../assets/images/icon_004.png")}
                        alt="share"
                      />
                    </span>
                    4 Comments
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
