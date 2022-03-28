import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useParams, useLocation } from "react-router-dom";
import PostComponent from "./PostComponent";

export default function CategoryPosts() {
  const alert = useAlert();
  const [posts, setPosts] = useState();
  const params = useParams();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const [pageNo, setPageNo] = useState(0);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_TESTING_URL}/post/category/${
          params.tag
        }?page=${query.get("page")}`
      )
      .then((res) => {
        setPosts(res.data);
      })
      .catch((e) => {
        alert.error(JSON.stringify(e));
      });
  }, [params.tag, pageNo]);

  return (
    <>
      <div className="content_lft">
        {posts && posts.length == 0 && <h3>No posts are available.</h3>}
        {posts &&
          posts.map((post) => {
            return (
              <PostComponent
                key={post.title}
                postDetails={post}
                setPostDetails={setPosts}
              ></PostComponent>
            );
          })}
      </div>
      <div className="clear" />
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
        {posts && posts.length > 0 && (
          <input
            type="button"
            value="Next"
            onClick={() => {
              setPageNo((prev) => prev + 1);
            }}
          ></input>
        )}
      </div>
    </>
  );
}
