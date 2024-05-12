import React from "react";
import "./App.scss";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import SignInForm from "./components/SignIn/SignInForm";
import Header from "./components/Header/Header";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={ <MainPage />} />
        <Route path="/signin" element={ <SignInForm />} />
        <Route path="/signup" />
        <Route path="*" element={ <NotFoundPage />} />
      </Routes>
      <footer />
    </>
  );
}

export default App;
