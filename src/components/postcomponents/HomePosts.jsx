import React from "react";
import PostComponent from "./PostComponent";

export default function HomePosts() {
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
            <div className="post_txt">4 New Post Updates</div>
          </div>
        </div>
        <PostComponent></PostComponent>
      </div>
    </>
  );
}
