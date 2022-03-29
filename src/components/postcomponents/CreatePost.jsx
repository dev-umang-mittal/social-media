import axios from "axios";
import React, { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import useErrorHandler from "../../customHooks/useErrorHandler";

export default function CreatePost() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useContext(AuthContext);
  const [imgSrc, setImgSrc] = useState();
  const [imgFile, setImgfile] = useState();
  const title = useRef();
  const tag = useRef();
  const formData = new FormData();
  let file;
  const errorHandler = useErrorHandler();

  function fileChanged(e) {
    // Assuming only image
    file = e.target.files[0];
    setImgfile(e.target.files[0]);
    let reader = new FileReader();
    let url = reader.readAsDataURL(file);
    reader.onloadend = function(e) {
      setImgSrc(reader.result);
    };
  }

  function submitPost() {
    if (!title.current.value || !imgFile) {
      errorHandler({ code: 6 });
      return;
    }
    formData.append("title", title.current.value);
    formData.append("image", imgFile);
    formData.append("authorId", user.response._id);
    formData.append("tags", tag.current.value || "Others");
    axios
      .post(`${process.env.REACT_APP_TESTING_URL}/post/create`, formData, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        errorHandler({ code: 11 });
        navigate(`/user/${user.response._id}`);
      })
      .catch((e) => {
        console.log(e);
        errorHandler(e);
      });
  }

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
