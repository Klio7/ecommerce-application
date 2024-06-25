import React from "react";
import "./App.scss";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Router from "./router/Router";
import { AuthProvider } from "./contexts/AuthProvider";
import { CartProvider } from "./contexts/CartContext";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Header />
        <Router />
        <Footer />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
