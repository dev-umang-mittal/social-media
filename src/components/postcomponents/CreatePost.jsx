import axios from "axios";
import React, { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useAlert } from "react-alert";

export default function CreatePost() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useContext(AuthContext);
  const [imgSrc, setImgSrc] = useState();
  const [imgFile, setImgfile] = useState();
  const title = useRef();
  const tag = useRef();
  const formData = new FormData();
  let file;
  const alert = useAlert();

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
      alert.error("Please fill in the details to post");
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
        alert.success("post created successfully");
        navigate(`/user/${user.response._id}`);
      })
      .catch((e) => {
        console.log(e);
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
