// import React from "react";
// import "./style.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faLinkedin,
//   faSquareInstagram,
//   faYoutube,
//   faMeta,
// } from "@fortawesome/free-brands-svg-icons";
// const Footer = () => {
//   return (
//     <>
//       <footer>
//         <div className="footer-main">
//           <div class="footer-container">
//             <h3 className="footer-text">
//               All rights reserved &copy; Arnav Chaudhary
//             </h3>
//           </div>

//           <div className="footer-social">
//             <button className="short-btn">
//               <FontAwesomeIcon icon={faSquareInstagram} size="xl" />
//             </button>
//             <button className="short-btn">
//               <FontAwesomeIcon icon={faYoutube} size="xl" />
//             </button>
//             <button className="short-btn">
//               <FontAwesomeIcon icon={faMeta} size="l" />
//             </button>
//             <button className="short-btn">
//               <FontAwesomeIcon icon={faLinkedin} size="xl" />
//             </button>
//           </div>
//         </div>
//       </footer>
//     </>
//   );
// };

// export default Footer;
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-dark text-light w-100 py-4 m-0">
      <Container fluid className="bg-dark text-light  ">
        <Row className="text-center text-md-start ms-5">
          {/* About Section */}
          <Col md={4} className="mb-3">
            <h5 className="mb-3">About Us</h5>
            <p>
              We are your go-to platform for premium quality products. Shop with
              us and experience the best online shopping.
            </p>
          </Col>

          {/* Navigation Links */}
          <Col md={4} className="mb-3">
            <h5 className="mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/shop" className="text-light text-decoration-none">
                  Shop
                </a>
              </li>
              <li>
                <a href="/about" className="text-light text-decoration-none">
                  About
                </a>
              </li>
              <li>
                <a href="/contact" className="text-light text-decoration-none">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/faq" className="text-light text-decoration-none">
                  FAQs
                </a>
              </li>
            </ul>
          </Col>

          {/* Contact Section */}
          <Col md={4} className="mb-3">
            <h5 className="mb-3">Contact Us</h5>
            <p>Email: arnavch0909@gmail.com</p>
            <p>Phone: +91 9208606254</p>
            <div className="d-flex justify-content-center justify-content-md-start">
              <a href="https://facebook.com" className="text-light me-3">
                <FaFacebookF />
              </a>
              <a href="https://twitter.com" className="text-light me-3">
                <FaTwitter />
              </a>
              <a href="https://instagram.com" className="text-light me-3">
                <FaInstagram />
              </a>
              <a href="https://linkedin.com" className="text-light">
                <FaLinkedin />
              </a>
            </div>
          </Col>
        </Row>

        {/* Copyright */}
        <Row className="mt-3">
          <Col className="text-center">
            <p className="mb-0">
              &copy; {new Date().getFullYear()}Arnav Chaudhary. All Rights
              Reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
