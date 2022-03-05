import React from "react";

export default function SinglePost() {
  return (
    <>
      <div className="content_lft">
        <div className="contnt_2">
          <div className="div_a">
            <div className="div_title">
              User Interface PSD Source files Web Designing for web
            </div>
            <div className="btm_rgt">
              <div className="btm_arc">Cats</div>
            </div>
            <div className="div_top">
              <div className="div_top_lft">
                <img src="images/img_6.png" />
                Steave Waugh
              </div>
              <div className="div_top_rgt">
                <span className="span_date">02 Jan 2014</span>
                <span className="span_time">11:15am</span>
              </div>
            </div>
            <div className="div_image">
              <img src="images/lft_img.png" alt="pet" />
            </div>
            <div className="div_btm">
              <div className="btm_list">
                <ul>
                  <li>
                    <a href="#">
                      <span className="btn_icon">
                        <img src="images/icon_001.png" alt="share" />
                      </span>
                      Share
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span className="btn_icon">
                        <img src="images/icon_002.png" alt="share" />
                      </span>
                      Flag
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span className="btn_icon">
                        <img src="images/icon_003.png" alt="share" />
                      </span>
                      0 Likes
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span className="btn_icon">
                        <img src="images/icon_004.png" alt="share" />
                      </span>
                      4 Comments
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="contnt_3">
          <ul>
            <li>
              <div className="list_image">
                <div className="image_sec">
                  <img src="images/post_img.png" />
                </div>
                <div className="image_name">Bharat</div>
              </div>
              <div className="list_info">
                This is an example of a comment. You can create as many comments
                like this one or sub comments as you like and manage all of your
                content inside your Account.
              </div>
              <input type="button" defaultValue="Reply" className="orng_btn" />
            </li>
            <li>
              <div className="list_image">
                <div className="image_sec">
                  <img src="images/post_img.png" />
                </div>
                <div className="image_name">Bharat</div>
              </div>
              <div className="list_info">
                This is an example of a comment. You can create as many comments
                like this one or sub comments as you like and manage all of your
                content inside your Account.
              </div>
              <input type="button" defaultValue="Reply" className="black_btn" />
              <div className="cmnt_div">
                <input
                  type="text"
                  defaultValue="Add a Comment"
                  className="cmnt_bx"
                />
                <input
                  type="submit"
                  className="sub_bttn"
                  defaultValue="Submit Comment"
                />
              </div>
            </li>
            <li>
              <div className="list_image">
                <div className="image_sec">
                  <img src="images/post_img.png" />
                </div>
                <div className="image_name">Bharat</div>
              </div>
              <div className="list_info">
                This is an example of a comment. You can create as many comments
                like this one or sub comments as you like and manage all of your
                content inside your Account.
              </div>
              <input type="button" defaultValue="Reply" className="orng_btn" />
            </li>
            <li>
              <div className="cmnt_div1">
                <input
                  type="text"
                  defaultValue="Enter your Comment"
                  className="cmnt_bx1"
                />
                <input
                  type="submit"
                  className="sub_bttn1"
                  defaultValue="Submit Comment"
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
