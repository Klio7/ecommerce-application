import React from "react";
import { Route, Routes } from "react-router-dom";
import MainPage from "../pages/MainPage/MainPage";
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import CatalogPage from "../pages/CatalogPage/CatalogPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import CartPage from "../pages/CartPage/CartPage";
import DetailedProductPage from "../pages/DetailedProductPage/DetailedProductPage";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/catalog" element={<CatalogPage />} />
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/about" element={<NotFoundPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/catalog/:key" element={<DetailedProductPage />} />
    </Routes>
  );
}

export default Router;
