import axios from "axios";
import React, { useState, useRef, useEffect, useContext } from "react";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
//TODO use useRef to update tag value when clicked.
// Add title and image useRef.
export default function CreatePost() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useContext(AuthContext);
  const [imgSrc, setImgSrc] = useState();
  const title = useRef();
  const tag = useRef();
  const alert = useAlert();

  function fileChanged(e) {
    // Assuming only image
    let file = e.target.files[0];
    let reader = new FileReader();
    let url = reader.readAsDataURL(file);
    reader.onloadend = function(e) {
      setImgSrc(reader.result);
    };
  }

  function submitPost() {
    console.log(user, isAuthenticated);
    axios
      .post(
        `${process.env.REACT_APP_TESTING_URL}/post/create`,
        {
          title: title.current.value,
          image: `https://picsum.photos/id/${Math.floor(
            Math.random() * 1000
          )}/400/200`,
          tags: [tag.current.value],
          authorDetails: {
            username: user.response.username,
            name: user.response.name,
            id: user.response._id,
            image: user.response.image,
          },
        },
        { headers: { Authorization: `Bearer ${user.accessToken}` } }
      )
      .then((res) => {
        console.log(res);
        alert.success("post created successfully");
        navigate(`/user/${user.response._id}`);
      })
      .catch((e) => {
        alert.error(e.response.statusText);
      });
  }

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
  }, []);

  return (
    <>
      <div className="content_lft">
        <div className="contnt_3">
          <ul>
            <li>
              <h2>What's on your mind?</h2>
              <div className="cmnt_div">
                <input
                  type="text"
                  maxLength={120}
                  placeholder="Enter the title"
                  className="cmnt_bx"
                  ref={title}
                />
              </div>
            </li>
            <li>
              <h2>Upload Image</h2>
              <div className="cmnt_div">
                <input
                  type="file"
                  placeholder="Enter the title"
                  className="cmnt_bx"
                  onChange={fileChanged}
                />
              </div>
              {imgSrc && <img src={imgSrc} alt="img" />}
            </li>
            <li>
              <h4>Tag</h4>
              <div className="cmnt_div">
                <input
                  type="text"
                  maxLength={10}
                  placeholder="Cat, Dog, ..."
                  className="cmnt_bx"
                  ref={tag}
                />
                <ul>
                  <h4 className="tag_search_li">hello</h4>
                </ul>
              </div>
            </li>
          </ul>
          <div className="view_div" onClick={submitPost}>
            <div>POST</div>
          </div>
        </div>
      </div>
    </>
  );
}
