import React from "react";
import { Route, Routes } from "react-router-dom";
import MainPage from "../pages/MainPage/MainPage";
import SignInPage from "../pages/SignInPage/SignInPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default Router;
