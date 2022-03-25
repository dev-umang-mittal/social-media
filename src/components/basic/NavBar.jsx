import axios from "axios";
import React, { useContext, useEffect, useRef } from "react";
import { useAlert } from "react-alert";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function NavBar() {
  const { user, setUser, setAuthenticationStatus } = useContext(AuthContext);
  const alert = useAlert();
  const navigate = useNavigate();
  const searchTerm = useRef();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    axios
      .get(`${process.env.REACT_APP_TESTING_URL}/refresh/${token}`)
      .then((res) => {
        setUser(res.data);
        setAuthenticationStatus(true);
        localStorage.setItem("token", res.data.accessToken);
      })
      .catch((err) => {
        alert.error("An Error Occured. Please login Again.");
      });
  }, []);

  function logout() {
    localStorage.removeItem("token");
    setUser(undefined);
    setAuthenticationStatus(false);
    navigate("/");
  }

  function search(e) {
    if (e.code !== "Enter") return;
    if (searchTerm.current.value === "") {
      navigate("/home");
    } else {
      navigate("/search/" + searchTerm.current.value);
    }
  }

  return (
    <>
      <div className="navbar navbar-inverse navbar-fixed-top">
        <div className="navbar-inner">
          <div className="container">
            <button
              type="button"
              className="btn btn-navbar"
              data-toggle="collapse"
              data-target=".nav-collapse"
            >
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="brand" href="">
              PPL
            </a>
            <div className="pro_info pull-right">
              <div className="pro_icn">
                <img src={require("../../assets/images/pic_small.png")} />
              </div>
              <div className="pro_txt">
                Me<b className="caret"></b>
              </div>
              <ul
                className="dropdown-menu"
                role="menu"
                aria-labelledby="dLabel"
              >
                <li>
                  <a tabIndex="-1">My Profile</a>
                </li>
                <li>
                  <a tabIndex="-1">Message Box</a>
                </li>
                <li>
                  <a tabIndex="-1">Change Language</a>
                </li>
                <li className="divider"></li>
                <li>
                  <a tabIndex="-1">
                    <input type="text" placeholder="search" />
                  </a>
                </li>
              </ul>
            </div>
            <div className="nav-collapse collapse">
              <ul className="nav">
                <li className="active">
                  <a href="">Home</a>
                </li>
                <li className="">
                  <a href="">E-Coupons</a>
                </li>
                <li className="">
                  <a href="">E-Brands</a>
                </li>
                <li className="">
                  <a href="">Resuse Market</a>
                </li>
                <li className="">
                  <a href="">Lost and Found</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="header">
        <div className="header_lft">
          <div className="logo">
            <Link to={"/"}>
              <img src={require("../../assets/images/logo.png")} />
            </Link>
          </div>
          <div className="navigatn">
            <ul>
              <li>
                {
                  <NavLink
                    to="/home"
                    className={(isActive) => {
                      "active";
                    }}
                  >
                    Home
                  </NavLink>
                }
              </li>
              {!user && (
                <li>
                  <NavLink
                    to="/signup"
                    className={(isActive) => {
                      "active";
                    }}
                  >
                    Signup
                  </NavLink>
                </li>
              )}
              {!user && (
                <li>
                  <NavLink
                    to="/login"
                    className={(isActive) => {
                      "active";
                    }}
                  >
                    Login
                  </NavLink>
                </li>
              )}
              {user && (
                <li>
                  <NavLink
                    to={`/user/${user.response._id}`}
                    className={(isActive) => {
                      "active";
                    }}
                  >
                    Dashboard
                  </NavLink>
                </li>
              )}
              {user && (
                <li>
                  <a onClick={logout}>Logout</a>
                </li>
              )}
            </ul>
          </div>
        </div>
        <div className="header_rgt">
          <div className="flag_div">
            <img src={require("../../assets/images/flag.png")} />
          </div>
          <input
            type="text"
            ref={searchTerm}
            placeholder="Search"
            className="txt_box"
            onKeyDown={search}
          />
          <div className="info_div">
            <Link to={user ? `/user/${user.response._id}` : "/login"}>
              <div className="image_div">
                {user && (
                  <img
                    src={user.response.image}
                    style={{ borderRadius: 50 + "%" }}
                  />
                )}
              </div>
            </Link>
            {user && <p>{user.response.username}</p>}
          </div>
        </div>
      </div>
    </>
  );
}
