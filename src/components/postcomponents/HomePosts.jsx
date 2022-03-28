import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import PostComponent from "./PostComponent";

export default function HomePosts() {
  const [posts, setPosts] = useState([]);
  const alert = useAlert();
  const [pageNo, setPageNo] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    axios
      .get(`${process.env.REACT_APP_TESTING_URL}/post/timeline?page=${pageNo}`)
      .then((res) => {
        if (res.data.length === 0)
          alert.info("No posts are availbale right now");
        setPosts(res.data);
      })
      .catch((error) => {
        alert.error("Something went wrong. Try again later");
      });
  }, [pageNo]);

  return (
    <>
      <div className="content_lft">
        <div className="contnt_1"></div>
        {posts.map((post) => {
          return (
            <PostComponent key={post.title} postDetails={post}></PostComponent>
          );
        })}
        <div>
          <input
            type="button"
            value="Prev"
            onClick={() => {
              setPageNo((prev) => {
                if (prev > 0) return prev - 1;
                else return prev;
              });
            }}
          ></input>
          {posts.length > 0 && (
            <input
              type="button"
              value="Next"
              onClick={() => {
                setPageNo((prev) => prev + 1);
              }}
            ></input>
          )}
        </div>
      </div>
    </>
  );
}
