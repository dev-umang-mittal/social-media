import axios from "axios";
import React, { useEffect, useState } from "react";
import useErrorHandler from "../../customHooks/useErrorHandler";
import { useParams } from "react-router-dom";
import PostComponent from "./PostComponent";

export default function SearchComponent() {
  const params = useParams();
  const [posts, setPosts] = useState([]);
  const errorHandler = useErrorHandler();
  const [pageNo, setPageNo] = useState(0);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_TESTING_URL}/search/${params.searchTerm}?page=${pageNo}`
      )
      .then((res) => {
        setPosts(res.data);
      })
      .catch((e) => {
        errorHandler(e);
      });
  }, [params, pageNo]);

  return (
    <React.Fragment>
      <div className="content_lft">
        {posts.length > 0 ? (
          posts.map((post) => {
            return (
              <PostComponent
                key={post.title}
                postDetails={post}
              ></PostComponent>
            );
          })
        ) : (
          <h3>Nothind found regarding your search term.</h3>
        )}
        <div>
          <input
            type="button"
            value="Prev"
            onClick={() => {
              setPageNo((prev) => prev - 1);
            }}
          ></input>
          <input
            type="button"
            value="Next"
            onClick={() => {
              setPageNo((prev) => prev + 1);
            }}
          ></input>
        </div>
      </div>

      <div className="clear" />
    </React.Fragment>
  );
}
