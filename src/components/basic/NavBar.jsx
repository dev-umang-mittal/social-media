import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function NavBar() {
  const { user } = useContext(AuthContext);
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
                <Link to={"/"}>
                  <div>Home</div>
                </Link>
              </li>
              {!user && (
                <li>
                  <Link to={"/signup"}>
                    <div>Signup</div>
                  </Link>
                </li>
              )}
              {!user && (
                <li>
                  <Link to={"/login"}>
                    <div>Login</div>
                  </Link>
                </li>
              )}
              {user && (
                <li>
                  <Link to={"/user/id"}>
                    <div>Dashboard</div>
                  </Link>
                </li>
              )}
              <li>
                <Link to={"/signup"}>
                  <div>Signup</div>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="header_rgt">
          <div className="flag_div">
            <img src={require("../../assets/images/flag.png")} />
          </div>
          <input type="text" placeholder="Search" className="txt_box" />
          <div className="info_div">
            <Link to={user ? "/user/id" : "/login"}>
              <div className="image_div">
                <img src={require("../../assets/images/pic.png")} />
              </div>
              <div className="info_div1">Me</div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
