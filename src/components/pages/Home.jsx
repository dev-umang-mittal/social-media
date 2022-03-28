import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../../protectedRoute";
import SideBar from "../basic/SideBar";
import CategoryPosts from "../postcomponents/CategoryPosts";
import CreatePost from "../postcomponents/CreatePost";
import HomePosts from "../postcomponents/HomePosts";
import SearchComponent from "../postcomponents/SearchComponent";
import SinglePost from "../postcomponents/SinglePost";
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
            <Route path="/post/:id" element={<SinglePost />} />
            <Route
              path="/create"
              element={
                <ProtectedRoute>
                  <CreatePost />
                </ProtectedRoute>
              }
            />

            <Route path="/search/:searchTerm" element={<SearchComponent />} />
            <Route path="/category/:tag" element={<CategoryPosts />} />
          </Routes>
        </div>
        <div className="clear"></div>
      </div>
    </>
  );
}
