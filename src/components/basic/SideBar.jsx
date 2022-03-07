import React from "react";
import { Link } from "react-router-dom";
import FeaturedPost from "../postcomponents/FeaturedPost";
//TODO : Select Category from list
//TODO : Got to post component when clicked the featured posts
export default function SideBar() {
  return (
    <div className="content_rgt">
      <div className="rght_btn">
        <span className="rght_btn_icon">
          <img src={require("../../assets/images/btn_iconb.png")} alt="up" />
        </span>
        <span className="btn_sep">
          <img src={require("../../assets/images/btn_sep.png")} alt="sep" />
        </span>
        <Link to={"/create"}>Upload Post</Link>
      </div>
      <div className="rght_btn">
        <span className="rght_btn_icon">
          <img src={require("../../assets/images/btn_icona.png")} alt="up" />
        </span>
        <span className="btn_sep">
          <img src={require("../../assets/images/btn_sep.png")} alt="sep" />
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
          <FeaturedPost
            postDetails={{
              title: "Hello world",
              img: "https://picsum.photos/500",
              tag: "cat",
            }}
          ></FeaturedPost>
        </div>
      </div>
    </div>
  );
}
