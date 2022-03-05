import React from "react";
import { Routes, Route } from "react-router-dom";
import SideBar from "../basic/SideBar";
import HomePosts from "../postcomponents/HomePosts";
import UserTimeline from "../postcomponents/UserTimeline";

export default function Home() {
  return (
    <>
      <div className="container">
        <div className="content">
          <SideBar></SideBar>
          <Routes>
            <Route path="/home" element={<HomePosts />} />
            <Route path="/user/:id" element={<UserTimeline />} />
          </Routes>
        </div>
        <div className="clear"></div>
      </div>
    </>
  );
}
