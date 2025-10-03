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
  const [isExpanded, setIsExpanded] = useState(false);

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
      {" "}
      {/* Responsive navbar */}
      <Navbar className="nav" sticky="top" expand="lg" expanded={isExpanded}>
        <Container className="ms-1">
          {/* Left side - Logo */}
          <Navbar.Brand className="ms-0">
            <Link to="/">
              <Image
                src={require("../logo.jpg")}
                alt="logo here"
                className="logo"
              />
            </Link>
          </Navbar.Brand>

          {/* Mobile toggle button */}
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={() => setIsExpanded(!isExpanded)}
          />

          <Navbar.Collapse id="basic-navbar-nav">
            {/* Center navigation items */}
            <Nav className="me-auto">
              <Nav.Item className="nav-item-responsive">
                <Link to="/Orders" onClick={() => setIsExpanded(false)}>
                  <button className="long-btn-cart me-4 mt-1 fs-3">
                    <Badge size="small" count={cartcount}>
                      <FontAwesomeIcon icon={faCartShopping} className="fs-4" />
                    </Badge>
                  </button>
                </Link>
              </Nav.Item>

              <Nav.Item className="nav-item-responsive">
                <Link
                  to={`Dashboard/${
                    auth?.user?.role === 1 ? "admin" : "Profile"
                  }`}
                  onClick={() => setIsExpanded(false)}
                >
                  <button className="long-btn-cart me-4 mt-1 d-flex justify-content-center py-1">
                    <FontAwesomeIcon
                      icon={faCircleUser}
                      className="fs-4 align-center"
                    />
                  </button>
                </Link>
              </Nav.Item>
            </Nav>

            {/* Right side - Login/Logout */}
            <Nav className="ms-auto">
              {!auth.user ? (
                <Link to="/Login" onClick={() => setIsExpanded(false)}>
                  <button className="long-btn">Login</button>
                </Link>
              ) : (
                <Link to="/Login" onClick={() => setIsExpanded(false)}>
                  <button className="long-btn" onClick={logOut}>
                    Logout
                  </button>
                </Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Navigation;
