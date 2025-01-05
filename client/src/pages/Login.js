import React, { useState } from "react";
import Layout from "../components/Layout";
import "./login.css";
import toast from "react-hot-toast";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGoogle,
  faApple,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";
import axios from "axios";
import { CreateAuth } from "../context/Authcontext";

import forgotPasswordImage from "../images/Forgot password-rafiki.svg";
import leftimage from "../images/Add to Cart-rafiki.svg";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

const Login = () => {
  const [email, SetEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [auth, setAuth] = CreateAuth();
  const location = useLocation();
  // useEffect(() => {
  //   document.body.style.zoom = "67%";
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page refresh

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/login`,
        { email, password }
      );
      if (res && res.data.success) {
        toast.success(`${res.data.message}. Welcome ${res.data.user.name}`, {
          className: "custom-toast",
          duration: 4000,
        });
        setAuth({ ...auth, user: res.data.user, token: res.data.token });
        localStorage.setItem("auth", JSON.stringify(res.data));
        setTimeout(() => {
          navigate(location.state || "/");
        }, 1000);
        // navigate("/");
      } else {
        toast.error(res.data.message);
        console.log(res.data);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Couldn't process the request";

      toast.error(errorMessage, {
        className: "custom-toast",
        duration: 4000,
      });
      // return toast.error("Could'nt Process the request", {
      //   className: "custom-toast",
      //   duration: 4000,
      // });
    }
  };
  return (
    <Layout>
      {/* <div className="cont">
        <div className="image-left">
          <img src={leftimage} alt="left" loop />
        </div>
        <div className="image-right">
          <img src={forgotPasswordImage} alt="right" />
        </div>
        <div className="form-container">
          <h1 className="form-title">
            User Login
            <form onSubmit={handleSubmit}>
              <table className="form">
                <tr className="first-row">
                  <input
                    placeholder={"Enter Email"}
                    type="email"
                    value={email}
                    onChange={(e) => {
                      SetEmail(e.target.value);
                    }}
                  ></input>
                </tr>
                <tr className="second-row">
                  <input
                    placeholder={"Password"}
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  ></input>
                </tr>

                <tr className="third-row">
                  <button className="submit-btn" type="submit">
                    Login
                  </button>
                </tr>

                <tr className="fourth-row">
                  <div className="seperator-left"></div>
                  <h1>or sign in with</h1>
                  <div className="seperator-right"></div>
                </tr>
                <tr className="fifth-row">
                  <div className="form-logo">
                    <button className="submit-logo-btn-google">
                      GOOGLE{" "}
                      <FontAwesomeIcon
                        icon={faGoogle}
                        style={{ color: "#ffffff" }}
                      />
                    </button>
                    <button className="submit-logo-btn-apple">
                      APPLE ID{" "}
                      <FontAwesomeIcon
                        icon={faApple}
                        style={{ color: "#fdfcfc" }}
                      />
                    </button>
                    <button className="submit-logo-btn-facebook">
                      FACEBOOK{""}
                      <FontAwesomeIcon
                        icon={faFacebook}
                        style={{ color: "#fdfcfc" }}
                      />
                    </button>
                  </div>
                </tr>

                <tr className="sixth-row">
                  <h3>
                    Dont have an account?
                    <Link to={"/Register"}> Register here</Link>
                  </h3>
                </tr>
              </table>
            </form>
          </h1>
        </div>
      </div>
       */}
      <Container className="mt-1  mb-3 rounded">
        <Row className="align-items-center">
          <Col md={6} className="text-center mb-4 mb-md-0">
            <img src={leftimage} alt="left" className="img-fluid" />
          </Col>
          <Col md={6} className="bg-custom rounded px-5 py-3 ">
            <h1 className="mb-4 text-center form-title ">User Login</h1>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => SetEmail(e.target.value)}
                  className="custom-input"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="custom-input"
                />
              </Form.Group>
              <button type="submit" className="w-100 mb-3 submit-btn">
                Login
              </button>
              <div className="d-flex align-items-center my-3">
                <div
                  className="flex-grow-1 bg-secondary"
                  style={{ height: "1px" }}
                ></div>
                <span className="mx-2 fw-bold">or sign in with</span>
                <div
                  className="flex-grow-1 bg-secondary"
                  style={{ height: "1px" }}
                ></div>
              </div>
              <Row className="text-center">
                <Col>
                  <button className="w-100 mb-2 submit-logo-btn-google">
                    GOOGLE <FontAwesomeIcon icon={faGoogle} />
                  </button>
                </Col>
                <Col>
                  <button className="w-100 mb-2 submit-logo-btn-apple">
                    APPLE ID <FontAwesomeIcon icon={faApple} />
                  </button>
                </Col>
                <Col>
                  <button className="w-100 mb-2 submit-logo-btn-facebook">
                    FACEBOOK
                    <FontAwesomeIcon icon={faFacebook} />
                  </button>
                </Col>
              </Row>
              <p className="text-center mt-3">
                Don’t have an account? <Link to="/Register">Register here</Link>
              </p>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Login;
