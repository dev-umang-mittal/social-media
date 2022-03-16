import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";
import PostComponent from "./PostComponent";

export default function SearchComponent() {
  const params = useParams();
  const [posts, setPosts] = useState([]);
  const alert = useAlert();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_TESTING_URL}/search/${params.searchTerm}`)
      .then((res) => {
        console.log(res.data);
        setPosts(res.data);
      })
      .catch((e) => {
        alert.error(e.response.statusText);
      });
  }, [params]);

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
      </div>

      <div className="clear" />
    </React.Fragment>
  );
}
