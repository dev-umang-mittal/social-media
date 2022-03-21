import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import PostComponent from "./PostComponent";
import { useAlert } from "react-alert";

export default function UserTimeline() {
  const { user, isAuthenticated } = useContext(AuthContext);
  const [userDetails, setUserDetails] = useState();
  const params = useParams();
  const [posts, setPosts] = useState();
  const [isEditable, setEditable] = useState(false);
  const bioRef = useRef();
  const alert = useAlert();

  function getUser() {
    axios
      .get(`${process.env.REACT_APP_TESTING_URL}/user/${params.id}`)
      .then((res) => {
        setUserDetails(res.data);
      });
  }

  function getPosts() {
    axios
      .get(`${process.env.REACT_APP_TESTING_URL}/post/all/${params.id}`)
      .then((res) => {
        setPosts(res.data);
      });
  }

  function updateDetails() {
    setEditable(!isEditable);
    if (!isEditable) return;
    if (bioRef.current.value === userDetails.bio) return;
    axios
      .patch(
        `${process.env.REACT_APP_TESTING_URL}/user/update/${params.id}`,
        { bio: bioRef.current.value },
        { headers: { Authorization: `Bearer ${user.accessToken}` } }
      )
      .then((res) => {
        alert.success("Update Successfully");
      })
      .catch((e) => {
        try {
          alert.error(e.message);
        } catch {
          alert.error(e.response.statusText);
        }
      });
  }

  useEffect(() => {
    getPosts();
    if (isAuthenticated) {
      if (!user) return;
      if (user.response._id == params.id) {
        setUserDetails(user.response);
        return;
      }
      getUser();
    } else {
      getUser();
    }
  }, []);

  return (
    <React.Fragment>
      <div className="content_lft">
        <div className="contnt_1">
          <div className="timeline_div">
            <div className="timeline_div1">
              <div className="profile_pic">
                <img src={userDetails && userDetails.image} />
                <div className="profile_text">
                  <a href="#">Change Profile Pic</a>
                </div>
              </div>
              <div className="profile_info">
                <div className="edit_div">
                  <a onClick={updateDetails}>
                    {isEditable ? "Save" : "Edit"}

                    <img
                      src={require("../../assets/images/timeline_img.png")}
                    />
                  </a>
                </div>
                <div className="profile_form">
                  <ul>
                    <li>
                      <div className="div_name1">Username :</div>
                      <div className="div_name2">
                        {userDetails && userDetails.username}
                      </div>
                    </li>
                    <li>
                      <div className="div_name1">Name :</div>
                      <div className="div_name2">
                        {userDetails && userDetails.name}
                      </div>
                    </li>
                    <li>
                      <div className="div_name1">Description :</div>
                      <div className="div_name3">
                        {userDetails && !isEditable && userDetails.bio}
                      </div>
                      {isEditable && (
                        <input
                          type="text"
                          placeholder={userDetails.bio}
                          defaultValue={userDetails.bio}
                          ref={bioRef}
                        ></input>
                      )}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="timeline_div2">
              <ul>
                <li>
                  <a href="#" className="active">
                    Timeline
                  </a>
                </li>
                <li>
                  <a href="#">About </a>
                </li>
                <li>
                  <a href="#">Album</a>
                </li>
                <li>
                  <a href="#"> Pets</a>
                </li>
                <li>
                  <a href="#">My Uploads </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {posts &&
          posts.map((post) => {
            return (
              <PostComponent
                key={post.title}
                postDetails={post}
              ></PostComponent>
            );
          })}
      </div>

      <div className="clear" />
    </React.Fragment>
  );
}
