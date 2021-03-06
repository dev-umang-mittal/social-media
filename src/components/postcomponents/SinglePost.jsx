import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import useErrorHandler from "../../customHooks/useErrorHandler";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function SinglePost() {
  const { user, isAuthenticated } = useContext(AuthContext);
  const params = useParams();
  const [post, setPost] = useState();
  const [comments, setComments] = useState([]);
  const comment = useRef();
  const errorHandler = useErrorHandler();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_TESTING_URL}/post?postId=${params.id}`)
      .then((res) => {
        if (!res.data) {
          navigate("/");
        }
        res.data[0].createdAt = new Date(res.data[0].createdAt);
        setPost(res.data[0]);
        getComments(res.data[0]._id);
      })
      .catch((e) => {
        errorHandler(e);
      });
  }, [params]);

  function getComments(id) {
    axios
      .get(`${process.env.REACT_APP_TESTING_URL}/comment/blog/${id}`)
      .then((res) => {
        setComments(res.data);
      })
      .catch((e) => {
        errorHandler(e);
      });
  }

  function submitComment(id) {
    axios
      .post(
        `${process.env.REACT_APP_TESTING_URL}/comment/create`,
        {
          commentedOnId: id,
          comment: comment.current.value,
          commenter: user.response._id,
        },
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      )
      .then((res) => {
        getComments(post._id);
        errorHandler({ code: 11 });
      })
      .catch((e) => {
        errorHandler(e);
      });
  }

  function deleteBlog() {
    if (user.response._id !== post.authorDetails._id) return;
    axios
      .delete(`${process.env.REACT_APP_TESTING_URL}/post/delete/${post._id}`, {
        headers: { Authorization: `Bearer ${user.accessToken}` },
      })
      .then((res) => {
        errorHandler({ code: 11 });
        navigate("/");
      })
      .catch((e) => {
        errorHandler(e);
      });
  }

  return (
    <>
      <div className="content_lft">
        <div className="contnt_2">
          <div className="div_a">
            <div className="div_title">{post && post.title}</div>
            <div className="btm_rgt">
              <div className="btm_arc">{post && post.tags}</div>
            </div>
            <div className="div_top">
              <div className="div_top_lft">
                {post && (
                  <img
                    style={{ borderRadius: 50 + "%", width: 40 + "px" }}
                    src={post.authorDetails.image}
                  />
                )}
                {post && post.authorDetails.name}
              </div>
              <div className="div_top_rgt">
                <span className="span_date">
                  {post && post.createdAt.toDateString()}
                </span>
                <span className="span_time">
                  {post && post.createdAt.toLocaleTimeString()}
                </span>
              </div>
            </div>
            <div className="div_image">
              {post && <img src={post.image} alt="pet" />}
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
                    <a>
                      <span className="btn_icon">
                        <img
                          src={require("../../assets/images/icon_003.png")}
                          alt="share"
                        />
                      </span>
                      {post && post.likes} Likes
                    </a>
                  </li>
                  <li>
                    <a>
                      <span className="btn_icon">
                        <img
                          src={require("../../assets/images/icon_004.png")}
                          alt="share"
                        />
                      </span>
                      {post && post.comments} Comments
                    </a>
                  </li>
                  {isAuthenticated &&
                    post &&
                    user.response._id === post.authorDetails._id && (
                      <li onClick={deleteBlog}>Delete</li>
                    )}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="contnt_3">
          <ul>
            <li>
              <div className="cmnt_div1">
                <input
                  type="text"
                  placeholder="Enter your Comment"
                  className="cmnt_bx1"
                  ref={comment}
                />
                <input
                  type="submit"
                  className="sub_bttn1"
                  defaultValue="Submit Comment"
                  onClick={() => submitComment(params.id)}
                />
              </div>
            </li>
            {comments.map((comment) => {
              return (
                <li key={comment._id}>
                  <div className="list_image">
                    <div className="image_sec">
                      <img src={comment.commenter.image} />
                    </div>
                    <div className="image_name">{comment.commenter.name}</div>
                  </div>
                  <div className="list_info">{comment.comment}</div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
