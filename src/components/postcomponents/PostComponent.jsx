import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";
import { AuthContext } from "./../../context/AuthContext";

export default function PostComponent({ postDetails }) {
  const alert = useAlert();
  const { user } = useContext(AuthContext);
  const [likeStatus, likeStatusChange] = useState(false);

  function likeBlog() {
    if (likeStatus) return;
    axios
      .get(
        `${process.env.REACT_APP_TESTING_URL}/post/like/${postDetails._id}`,
        { headers: { Authorization: `Bearer ${user.accessToken}` } }
      )
      .then((res) => {
        likeStatusChange(true);
      })
      .catch((e) => {
        alert.error(e.response.statusText);
      });
  }

  return (
    <>
      <div className="contnt_2">
        <div className="div_a">
          <div className="div_title">
            <Link to={`/post/${postDetails._id}`}>{postDetails.title}</Link>
          </div>
          <div className="btm_rgt">
            <div className="btm_arc">Cats</div>
          </div>
          <div className="div_top">
            <Link to={`/user/${postDetails.authorDetails.id}`}>
              <div className="div_top_lft">
                {/* <img src={require("../../assets/images/img_6.png")} /> */}
                <img
                  src={postDetails.authorDetails.image}
                  style={{ borderRadius: 50 + "%", width: 30 + "px" }}
                />
                {postDetails.authorDetails.name}
              </div>
            </Link>
            <div className="div_top_rgt">
              <span className="span_date">02 Jan 2014</span>
              <span className="span_time">11:15am</span>
            </div>
          </div>
          <div className="div_image">
            <img src={postDetails.image} alt="pet" />
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
                  <a onClick={likeBlog}>
                    <span className="btn_icon">
                      <img
                        src={require("../../assets/images/icon_003.png")}
                        alt="share"
                      />
                    </span>
                    {postDetails.likes} Likes
                  </a>
                </li>
                <li>
                  <Link to={"/post/id"}>
                    <span className="btn_icon">
                      <img
                        src={require("../../assets/images/icon_004.png")}
                        alt="share"
                      />
                    </span>
                    {postDetails.comments} Comments
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
