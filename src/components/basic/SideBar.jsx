import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FeaturedPost from "../postcomponents/FeaturedPost";

export default function SideBar() {
  const [featuredPosts, setFeaturedPosts] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_TESTING_URL}/post/featured`)
      .then((res) => {
        setFeaturedPosts(res.data);
      });
  }, []);

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
              <Link to={"/category/cats"}>
                <span className="list_icon">
                  <img
                    src={require("../../assets/images/icon_01.png")}
                    alt="up"
                  />
                </span>
                CATS
              </Link>
            </li>
            <li>
              <Link to={"/category/dogs"}>
                <span className="list_icon">
                  <img
                    src={require("../../assets/images/icon_02.png")}
                    alt="up"
                  />
                </span>
                Dogs
              </Link>
            </li>
            <li>
              <Link to={"/category/birds"}>
                <span className="list_icon">
                  <img
                    src={require("../../assets/images/icon_03.png")}
                    alt="up"
                  />
                </span>
                Birds
              </Link>
            </li>
            <li>
              <Link to={"/category/rabbit"}>
                <span className="list_icon">
                  <img
                    src={require("../../assets/images/icon_04.png")}
                    alt="up"
                  />
                </span>
                Rabbit
              </Link>
            </li>
            <li>
              <Link to={"/category/others"}>
                <span className="list_icon">
                  <img
                    src={require("../../assets/images/icon_05.png")}
                    alt="up"
                  />
                </span>
                Others
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="rght_cate">
        <div className="rght_cate_hd" id="opn_cat_bg">
          Featured
        </div>
        <div className="sub_dwn">
          {featuredPosts.map((post) => {
            return (
              <FeaturedPost key={post.title} postDetails={post}></FeaturedPost>
            );
          })}
        </div>
      </div>
    </div>
  );
}
