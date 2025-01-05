import React, { useState } from "react";
import Layout from "../components/Layout";

import "./register.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGoogle,
  faApple,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";
// import { toast } from "react-toastify";
import toast from "react-hot-toast";
// import forgotPasswordImage from "../images/Forgot password-rafiki.svg";
import leftimage from "../images/2101.i039.015.footwear_shoes_production_isometric.jpg";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  // useEffect(() => {
  //   document.body.style.zoom = "67%";
  // }, []);
  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page refresh

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/register`,
        { name, email, phone, address, password }
      );
      if (res.data && res.data.success) {
        toast.success(res.data.message, {
          className: "custom-toast",
          duration: 4000,
        });
        setTimeout(() => {
          navigate("/login");
        }, 2000);
        // navigate("/login");
      } else {
        if (password !== confirmPassword) {
          return toast.error("Password doesn't match", {
            className: "custom-toast",
            duration: 4000,
          });
        }
        return toast.error(res.data.message, {
          className: "custom-toast",
          duration: 4000,
        });
      }
    } catch (error) {
      console.log(error.response);
      return toast.error("Could'nt Process the request", {
        className: "custom-toast",
        duration: 4000,
      });
    }
  };
  return (
    <Layout>
      {/* <div className="reg-container">
        <div className="reg-image-left">
          <img src={leftimage} alt="Social Media" />
        </div>

        <div className="reg-form-container">
          <h1 className="reg-form-title">
            NEW USER
            <form onSubmit={handleSubmit}>
              <table className="reg-form">
                <tr className="reg-first-row">
                  <input
                    placeholder="Who should we call you?"
                    value={name}
                    type="text"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </tr>
                <tr className="reg-second-row">
                  <input
                    placeholder="Password: Make it unique & secure"
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                  <input
                    placeholder="Confirm Password: Just to be sure..."
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                    }}
                  />
                </tr>
                <tr className="reg-third-row">
                  <input
                    placeholder="Enter Email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </tr>
                <tr className="reg-fourth-row">
                  <input
                    placeholder="Where do you call home?"
                    type="text"
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                  />
                </tr>
                <tr className="reg-fifth-row">
                  <input
                    placeholder="Best contact number"
                    type="text"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                  />
                </tr>

                <tr className="reg-six-row">
                  <button className="reg-submit-btn" type="submit">
                    Register
                  </button>
                </tr>

                <tr className="reg-seventh-row">
                  <div className="reg-seperator-left"></div>
                  <h1>or sign in with</h1>
                  <div className="reg-seperator-right"></div>
                </tr>
                <tr className="reg-eight-row">
                  <div className="reg-form-logo">
                    <button className="reg-submit-logo-btn-google">
                      GOOGLE{" "}
                      <FontAwesomeIcon
                        icon={faGoogle}
                        style={{ color: "#ffffff" }}
                      />
                    </button>
                    <button className="reg-submit-logo-btn-apple">
                      APPLE ID{" "}
                      <FontAwesomeIcon
                        icon={faApple}
                        style={{ color: "#fdfcfc" }}
                      />
                    </button>
                    <button className="reg-submit-logo-btn-facebook">
                      FACEBOOK{" "}
                      <FontAwesomeIcon
                        icon={faFacebook}
                        style={{ color: "#fdfcfc" }}
                      />
                    </button>
                  </div>
                </tr>

                <tr className="reg-ninth-row">
                  <h3>
                    Already have an account?
                    <Link to={"/Login"}> Login here</Link>
                  </h3>
                </tr>
              </table>
            </form>
          </h1>
        </div>
      </div> */}
      <Container className="mt-3 mb-5">
        <Row className="align-items-center">
          {/* Left Image */}
          <Col md={6} className="text-center mb-4 mb-md-0">
            <img
              src={leftimage}
              alt="Register Illustration"
              className="img-fluid"
            />
          </Col>

          {/* Registration Form */}
          <Col md={6} className="bg-custom-reg  px-4 py-2">
            <h1 className="mb-4 text-center reg-form-title">NEW USER</h1>
            <Form onSubmit={handleSubmit}>
              {/* Name */}
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Who should we call you?"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className=" fs-5"
                />
              </Form.Group>

              {/* Password and Confirm Password */}
              <Row className="mb-3">
                <Col>
                  <Form.Control
                    type="password"
                    placeholder="Password: Make it unique & secure"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className=" fs-5"
                  />
                </Col>
                <Col>
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password: Just to be sure..."
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className=" fs-5"
                  />
                </Col>
              </Row>

              {/* Email */}
              <Form.Group className="mb-3">
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className=" fs-5"
                />
              </Form.Group>

              {/* Address */}
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Where do you call home?"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className=" fs-5"
                />
              </Form.Group>

              {/* Phone */}
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Best contact number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className=" fs-5"
                />
              </Form.Group>

              {/* Submit Button */}
              <button type="submit" className="w-100 mb-3 reg-submit-btn">
                Register
              </button>

              {/* Separator */}
              <div className="d-flex align-items-center my-2">
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

              {/* Social Buttons */}
              <Row className="text-center">
                <Col>
                  <button className="w-100 mb-2 reg-submit-logo-btn-google">
                    GOOGLE <FontAwesomeIcon icon={faGoogle} />
                  </button>
                </Col>
                <Col>
                  <button className="w-100 mb-2 reg-submit-logo-btn-apple">
                    APPLE ID <FontAwesomeIcon icon={faApple} />
                  </button>
                </Col>
                <Col>
                  <button className="w-100 mb-2 reg-submit-logo-btn-facebook">
                    FACEBOOK <FontAwesomeIcon icon={faFacebook} />
                  </button>
                </Col>
              </Row>

              {/* Login Link */}
              <p className="text-center mt-3">
                Already have an account? <Link to="/Login">Login here</Link>
              </p>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Register;
