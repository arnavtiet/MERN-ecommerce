import React from "react";
import Navigation from "./Navbar";
import Footer from "./Footer";
import "./style.css";
import { Toaster } from "react-hot-toast";
const Layout = ({ children }) => {
  return (
    <>
      <Navigation name="User" />
      <main>
        <Toaster />
        {children}
      </main>
      <Footer />{" "}
    </>
  );
};

export default Layout;
