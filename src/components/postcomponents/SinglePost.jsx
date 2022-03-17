import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function SinglePost() {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [post, setPost] = useState();
  const [comments, setComments] = useState([]);
  const comment = useRef();
  const alert = useAlert();
  //TODO: use the id to fetch a certain blog.

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_TESTING_URL}/post/${id}`)
      .then((res) => {
        setPost(res.data);
        getComments(res.data._id);
      })
      .catch((e) => {
        alert.error(e.response.statusText);
      });
  }, []);

  function getComments(id) {
    axios
      .get(`${process.env.REACT_APP_TESTING_URL}/comment/blog/${id}`)
      .then((res) => {
        setComments(res.data);
      })
      .catch((e) => {
        alert.error(e.response.statusText);
      });
  }

  function submitComment(id) {
    axios
      .post(`${process.env.REACT_APP_TESTING_URL}/comment/create`, {
        commentedOnId: id,
        comment: comment.current.value,
        commenter: {
          name: user.response.name,
          image: user.response.image,
          id: user.response.id,
          username: user.response.username,
        },
      })
      .then((res) => {
        getComments(post._id);
        alert.success("Comment created successfully");
      })
      .catch((e) => {
        alert.error(e.response.statusText);
      });
  }

  return (
    <>
      <div className="content_lft">
        <div className="contnt_2">
          <div className="div_a">
            <div className="div_title">{post && post.title}</div>
            <div className="btm_rgt">
              <div className="btm_arc">Cats</div>
            </div>
            <div className="div_top">
              <div className="div_top_lft">
                {post && <img src={post.authorDetails.image} />}
                {post && post.authorDetails.name}
              </div>
              <div className="div_top_rgt">
                <span className="span_date">02 Jan 2014</span>
                <span className="span_time">11:15am</span>
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
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="contnt_3">
          <ul>
            {comments.map((comment) => {
              return (
                <li>
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
            <li>
              <div className="cmnt_div1">
                <input
                  type="text"
                  defaultValue="Enter your Comment"
                  className="cmnt_bx1"
                  ref={comment}
                />
                <input
                  type="submit"
                  className="sub_bttn1"
                  defaultValue="Submit Comment"
                  onClick={() => submitComment(id)}
                />
              </div>
            </li>
          </ul>
          <div className="view_div">
            <a href="#">View more</a>
          </div>
        </div>
      </div>
    </>
  );
}
