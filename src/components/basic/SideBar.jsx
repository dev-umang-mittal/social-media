import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FeaturedPost from "../postcomponents/FeaturedPost";

export default function SideBar() {
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_TESTING_URL}/post/featured`)
      .then((res) => {
        setFeaturedPosts(res.data);
      });
    axios.get(`${process.env.REACT_APP_TESTING_URL}/alltags`).then((res) => {
      setTags(res.data);
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
          Top Trending Categories
        </div>
        <div className="rght_list">
          <ul>
            {tags.map((tag) => {
              return (
                <li key={tag._id.tags}>
                  <Link to={`/category/${tag._id.tags}?page=0`}>
                    <span className="list_icon">
                      <img
                        src={tag.image}
                        style={{ width: 100 + "px" }}
                        alt="tag"
                      />
                    </span>
                    {tag._id.tags}
                  </Link>
                </li>
              );
            })}
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
