import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import useBottom from "../../customHooks/useBottom";
import useErrorHandler from "../../customHooks/useErrorHandler";
import PostComponent from "./PostComponent";

export default function HomePosts() {
  const [posts, setPosts] = useState([]);
  const alert = useAlert();
  const [filter, setFilter] = useState({ limit: 4, skip: 0 });
  // const isBottom = useBottom();
  const errorHandler = useErrorHandler();

  useEffect(() => {
    window.scrollTo(0, 0);
    axios
      .get(
        `${process.env.REACT_APP_TESTING_URL}/post/?limit=${filter.limit}&skip=${filter.skip}`
      )
      .then((res) => {
        // errorHandler("hello");
        if (res.data.length === 0)
          alert.info("No posts are availbale right now");
        setPosts(res.data);
      })
      .catch((error) => {
        errorHandler(error);
      });
  }, [filter]);

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
              setFilter((prev) => {
                if (prev.skip > 0)
                  return { ...prev, skip: prev.skip - prev.limit };
                else return prev;
              });
            }}
          ></input>
          {posts.length > 0 && (
            <input
              type="button"
              value="Next"
              onClick={() => {
                setFilter((prev) => {
                  return { ...prev, skip: prev.skip + prev.limit };
                });
              }}
            ></input>
          )}
        </div>
      </div>
    </>
  );
}
