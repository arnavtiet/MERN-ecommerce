import React, { useEffect, useState } from "react";
import "./nav.css";
import "../461954a9-580c-4bb5-91b1-0b13e1107d69.webp";
import "../logo.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { CreateAuth } from "../context/Authcontext";
import toast from "react-hot-toast";
import { Container, Image, Nav, Navbar } from "react-bootstrap";
import { Badge } from "antd";
import { useCart } from "../context/Cartcontext";
const Navigation = () => {
  const [auth, setAuth] = CreateAuth();
  const [cart] = useCart();
  const [cartcount, setcartCount] = useState(cart.length);
  const logOut = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    toast.success("logout success");
  };
  useEffect(() => {
    setcartCount(cart.length);
  }, [cart]);
  return (
    <>
      {/* second navbar */}
      <Navbar className="nav" sticky="top">
        <Container className="ms-1">
          {/* Left side */}
          <Navbar.Brand className=" ms-0">
            <Link to="/">
              <Image
                src={require("../logo.jpg")}
                alt="logo here"
                className="logo "
              />
            </Link>
          </Navbar.Brand>

          {/* Right side */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto py-5">
              <Nav.Item>
                <Link to="/Orders">
                  <button className=" long-btn-cart me-4 mt-1 fs-3">
                    <Badge size="small" count={cartcount}>
                      <FontAwesomeIcon icon={faCartShopping} className="fs-4" />{" "}
                    </Badge>
                  </button>
                </Link>
              </Nav.Item>

              <Nav.Item>
                <Link
                  to={`Dashboard/${
                    auth?.user?.role === 1 ? "admin" : "Profile"
                  }`}
                >
                  <button className="long-btn-cart me-4 mt-1 d-flex justify-content-center py-1">
                    <FontAwesomeIcon
                      icon={faCircleUser}
                      className="fs-4 align-center "
                    />
                  </button>
                </Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
        <Nav className="me-4 ">
          {!auth.user ? (
            <>
              {" "}
              <Link to="/Login">
                <button className="long-btn ">Login</button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/Login">
                <button className="long-btn" onClick={logOut}>
                  Logout
                </button>
              </Link>
            </>
          )}
        </Nav>
      </Navbar>
    </>
  );
};

export default Navigation;
