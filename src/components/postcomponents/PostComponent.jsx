import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import useErrorHandler from "../../customHooks/useErrorHandler";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { FacebookShareButton } from "react-share";

export default function PostComponent(props) {
  const errorHandler = useErrorHandler();
  const { user, isAuthenticated } = useContext(AuthContext);
  const [likeStatus, likeStatusChange] = useState(false);
  const [postDetails, setPostDetails] = useState(props.postDetails);

  function toggleLikeBlog() {
    if (!isAuthenticated) {
      errorHandler({ code: 2 });
      return;
    }
    if (likeStatus) {
      //unlike
      axios
        .get(
          `${process.env.REACT_APP_TESTING_URL}/post/unlike/${postDetails._id}`,
          { headers: { Authorization: `Bearer ${user.accessToken}` } }
        )
        .then((res) => {
          console.log("response", res.data);
          likeStatusChange(!likeStatus);
          setPostDetails(res.data);
        })
        .catch((e) => {
          errorHandler(e);
        });
    } else {
      axios
        .get(
          `${process.env.REACT_APP_TESTING_URL}/post/like/${postDetails._id}`,
          { headers: { Authorization: `Bearer ${user.accessToken}` } }
        )
        .then((res) => {
          likeStatusChange(!likeStatus);
          setPostDetails(res.data);
        })
        .catch((e) => {
          errorHandler(e);
        });
    }
  }

  return (
    <>
      <div className="contnt_2">
        <div className="div_a">
          <div className="div_title">
            <Link to={`/post/${postDetails._id}`}>{postDetails.title}</Link>
          </div>
          <div className="btm_rgt">
            <div className="btm_arc">{postDetails.tags}</div>
          </div>
          <div className="div_top">
            <Link to={`/user/${postDetails.authorDetails._id}`}>
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
              <span className="span_date">
                {new Date(postDetails.createdAt).toDateString()}
              </span>
              <span className="span_time">
                {new Date(postDetails.createdAt).toLocaleTimeString()}
              </span>
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
                    <FacebookShareButton
                      quote="I found this amazing post"
                      hashtag="petsocial"
                      children="Share on Facebook"
                      url={`${process.env.REACT_APP_TESTING_URL}/post/${postDetails._id}`}
                    ></FacebookShareButton>
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
                  <a onClick={toggleLikeBlog} style={{ cursor: "pointer" }}>
                    <span className="btn_icon">
                      <img
                        src={require("../../assets/images/icon_003.png")}
                        alt="share"
                      />
                    </span>
                    {!likeStatus ? `${postDetails.likes} Likes` : "Liked"}
                  </a>
                </li>
                <li>
                  <Link to={`/post/${postDetails._id}`}>
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
