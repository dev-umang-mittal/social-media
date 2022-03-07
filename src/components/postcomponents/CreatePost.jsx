import React, { useState, useRef } from "react";
//TODO use useRef to update tag value when clicked.
// Add title and image useRef.
export default function CreatePost() {
  const [imgSrc, setImgSrc] = useState();
  const title = useRef();
  const tag = useRef();

  function fileChanged(e) {
    // Assuming only image
    let file = e.target.files[0];
    let reader = new FileReader();
    let url = reader.readAsDataURL(file);
    reader.onloadend = function(e) {
      setImgSrc(reader.result);
    };
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
                <ul>
                  <h4 className="tag_search_li">hello</h4>
                </ul>
              </div>
            </li>
          </ul>
          <div className="view_div">
            <a>POST</a>
          </div>
        </div>
      </div>
    </>
  );
}
