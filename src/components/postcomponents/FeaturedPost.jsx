import React from "react";
import { Link } from "react-router-dom";

export default function FeaturedPost({ postDetails }) {
  return (
    <Link to={`/post/${postDetails._id}`}>
      <div className="feat_sec">
        <div className="feat_sec_img">
          <img src={postDetails.image} alt="image" />
        </div>
        <div className="feat_txt">{postDetails.title}</div>
        <div className="btm_rgt">
          <div className="btm_arc">{postDetails.tags}</div>
        </div>
      </div>
    </Link>
  );
}
