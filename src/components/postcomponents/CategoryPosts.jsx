import axios from "axios";
import React, { useEffect, useState } from "react";
import useErrorHandler from "../../customHooks/useErrorHandler";
import { useParams, useLocation } from "react-router-dom";
import PostComponent from "./PostComponent";

export default function CategoryPosts() {
  const errorHandler = useErrorHandler();
  const [posts, setPosts] = useState([]);
  const params = useParams();
  const [filter, setFilter] = useState({
    tag: params.tag,
    limit: 4,
    skip: 0,
  });

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_TESTING_URL}/post/?tag=${filter.tag}&limit=${filter.limit}&skip=${filter.skip}`
      )
      .then((res) => {
        setPosts(res.data);
      })
      .catch((error) => {
        errorHandler(error);
      });
  }, [filter]);

  useEffect(() => {
    setFilter({ ...filter, tag: params.tag });
  }, [params.tag]);

  return (
    <>
      <div className="content_lft">
        {posts.length == 0 && <h3>No posts are available.</h3>}
        {posts.map((post) => {
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
    </>
  );
}
