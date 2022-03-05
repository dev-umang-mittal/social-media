import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePosts from "../postcomponents/HomePosts";
import UserTimeline from "../postcomponents/UserTimeline";

export default function Home() {
  return (
    <>
      <div className="container">
        <div className="content">
          <div className="content_rgt">
            <div className="rght_btn">
              <span className="rght_btn_icon">
                <img
                  src={require("../../assets/images/btn_iconb.png")}
                  alt="up"
                />
              </span>
              <span className="btn_sep">
                <img
                  src={require("../../assets/images/btn_sep.png")}
                  alt="sep"
                />
              </span>
              <a>Upload Post</a>
            </div>
            <div className="rght_btn">
              <span className="rght_btn_icon">
                <img
                  src={require("../../assets/images/btn_icona.png")}
                  alt="up"
                />
              </span>
              <span className="btn_sep">
                <img
                  src={require("../../assets/images/btn_sep.png")}
                  alt="sep"
                />
              </span>
              <a>Invite Friends</a>
            </div>
            <div className="rght_cate">
              <div className="rght_cate_hd" id="rght_cat_bg">
                Categories
              </div>
              <div className="rght_list">
                <ul>
                  <li>
                    <a>
                      <span className="list_icon">
                        <img
                          src={require("../../assets/images/icon_01.png")}
                          alt="up"
                        />
                      </span>
                      CATS
                    </a>
                  </li>
                  <li>
                    <a>
                      <span className="list_icon">
                        <img
                          src={require("../../assets/images/icon_02.png")}
                          alt="up"
                        />
                      </span>
                      Dogs
                    </a>
                  </li>
                  <li>
                    <a>
                      <span className="list_icon">
                        <img
                          src={require("../../assets/images/icon_03.png")}
                          alt="up"
                        />
                      </span>
                      Birds
                    </a>
                  </li>
                  <li>
                    <a>
                      <span className="list_icon">
                        <img
                          src={require("../../assets/images/icon_04.png")}
                          alt="up"
                        />
                      </span>
                      Rabbit
                    </a>
                  </li>
                  <li>
                    <a>
                      <span className="list_icon">
                        <img
                          src={require("../../assets/images/icon_05.png")}
                          alt="up"
                        />
                      </span>
                      Others
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="rght_cate">
              <div className="rght_cate_hd" id="opn_cat_bg">
                Featured
              </div>
              <div className="sub_dwn">
                <div className="feat_sec">
                  <div className="feat_sec_img">
                    <img src="images/feat_img1.png" alt="image" />
                  </div>
                  <div className="feat_txt">Lorem Ipusum Text</div>
                  <div className="btm_rgt">
                    <div className="btm_arc">Cats</div>
                  </div>
                </div>
                <div className="feat_sec">
                  <div className="feat_sec_img">
                    <img src="images/feat_img2.png" alt="image" />
                  </div>
                  <div className="feat_txt">Lorem Ipusum Text</div>
                  <div className="btm_rgt">
                    <div className="btm_arc">Dogs</div>
                  </div>
                </div>
                <div className="feat_sec">
                  <div className="feat_sec_img">
                    <img src="images/feat_img3.png" alt="image" />
                  </div>
                  <div className="feat_txt">Lorem Ipusum Text</div>
                  <div className="btm_rgt">
                    <div className="btm_arc">Rabbits</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <UserTimeline></UserTimeline>
          {/* <Routes>
            <Route path="/:id" element={<UserTimeline />} />
          </Routes> */}
        </div>
        <div className="clear"></div>
      </div>
    </>
  );
}
