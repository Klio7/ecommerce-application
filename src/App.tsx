import React from "react";
import "./App.scss";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import SignInForm from "./components/SignIn/SignInForm";
import Header from "./components/Header/Header";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import SignUpForm from "./components/SignUp/SignUpForm";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/signin" element={<SignInForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <footer />
    </>
  );
}

export default App;
