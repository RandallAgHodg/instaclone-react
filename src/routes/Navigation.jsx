import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import React, { useEffect } from "react";
import Home from "../pages/Home/";
import User from "../pages/User.jsx";
import Error404 from "../pages/Error404/Error404.jsx";
import MainLayout from "../layouts/MainLayout.jsx";

export default function Navigation() {
  return (
    <BrowserRouter>
      <Routes>
        {/* {
        map(routes, (route, index) => {
            <Route path={route.path} element={<route} />
        })
        } */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="user/:username" element={<User />} />
          <Route path="*" element={<Error404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
