import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import PostComponent from "./PostComponent";

export default function HomePosts() {
  const [posts, setPosts] = useState([]);
  const alert = useAlert();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_TESTING_URL}/post/timeline`)
      .then((res) => {
        if (res.data.length === 0)
          alert.info("No posts are availbale right now");
        setPosts(res.data);
      })
      .catch((error) => {
        alert.error("Something went wrong. Try again later");
      });
  }, []);

  return (
    <>
      <div className="content_lft">
        <div className="contnt_1">
          <div className="list_1">
            <ul>
              <li>
                <input type="checkbox" className="chk_bx" />
                Friends
              </li>
              <li>
                <input type="checkbox" className="chk_bx" />
                Flaged
              </li>
            </ul>
          </div>
          <div className="post_div">
            <div className="post_list">
              <ul>
                <li>
                  <a>
                    <span className="list_img">
                      <img src={require("../../assets/images/img_2.png")} />
                    </span>
                    Oldest First
                  </a>
                </li>
                <li>
                  <a>
                    <span className="list_img">
                      <img src={require("../../assets/images/img_3.png")} />
                    </span>
                    Most Pet
                  </a>
                </li>
                <li>
                  <a>
                    <span className="list_img">
                      <img src={require("../../assets/images/img_4.png")} />
                    </span>
                    Most Clicks
                  </a>
                </li>
                <li>
                  <a>
                    <span className="list_img">
                      <img src={require("../../assets/images/img_5.png")} />
                    </span>
                    Most Commented
                  </a>
                </li>
              </ul>
            </div>
            <div className="post_txt">4 New Post Updates </div>
          </div>
        </div>
        {posts.map((post) => {
          return (
            <PostComponent key={post.title} postDetails={post}></PostComponent>
            // <DemoComponent key={post.title} postDetails={post}></DemoComponent>
          );
        })}
      </div>
    </>
  );
}
