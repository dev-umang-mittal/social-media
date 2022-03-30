import axios from "axios";
import React, { useContext, useEffect, useRef } from "react";
import useErrorHandler from "../../customHooks/useErrorHandler";
import { Link, useNavigate, NavLink, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function NavBar() {
  const { user, setUser, setAuthenticationStatus } = useContext(AuthContext);
  const errorHandler = useErrorHandler();
  const navigate = useNavigate();
  const searchTerm = useRef();
  const location = useLocation();

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
        errorHandler(err);
        errorHandler({ code: 5 });
        localStorage.clear();
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
    if (searchTerm.current.value === "") navigate("/home");
    else navigate("/search/" + searchTerm.current.value);
  }

  return (
    <>
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
                    style={({ isActive }) => {
                      return {
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "bottom center",
                        width: 12 + "px",
                        height: 7 + "px",
                        pointerEvents: isActive ? "none" : "auto",
                      };
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
                    style={({ isActive }) => {
                      return {
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "bottom center",
                        width: 12 + "px",
                        height: 7 + "px",
                      };
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
                    style={({ isActive }) => {
                      return {
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "bottom center",
                        width: 12 + "px",
                        height: 7 + "px",
                      };
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
                    style={({ isActive }) => {
                      return {
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "bottom center",
                        width: 12 + "px",
                        height: 7 + "px",
                      };
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
              {user && (
                <div className="info_div1">{user.response.username}</div>
              )}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
