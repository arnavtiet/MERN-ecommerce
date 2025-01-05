import React from "react";
import "./App.css";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
// import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
// import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
function Landing() {
  return (
    <div>
      <div class="landing-navbar">
        <svg
          width="100px"
          height="100px"
          viewBox="-40 -40 480.00 480.00"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          stroke="#fffafa"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0">
            <rect
              x="-40"
              y="-40"
              width="480.00"
              height="480.00"
              rx="240"
              fill="#f0f0f0"
              strokewidth="0"
            ></rect>
          </g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <path
              d="M113.06 167.083C130.274 218.365 182.371 145.346 183.095 146.004C217.431 177.213 319.732 206.097 311.582 238.662C306.369 253.886 111.726 260.822 96.1102 239.867C80.092 218.377 91.0943 183.052 100.952 161.886"
              stroke="#000000"
              stroke-opacity="0.9"
              stroke-width="16"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>{" "}
            <path
              d="M96.9775 197.152C107.133 197.471 117.288 193.997 123.91 184.725"
              stroke="#000000"
              stroke-opacity="0.9"
              stroke-width="16"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>{" "}
            <path
              d="M204.709 199.938C199.025 206.633 183.183 223.195 175.211 234.513"
              stroke="#000000"
              stroke-opacity="0.9"
              stroke-width="16"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>{" "}
            <path
              d="M226.512 209.619C218.509 217.596 210.786 225.89 203.427 234.513"
              stroke="#000000"
              stroke-opacity="0.9"
              stroke-width="16"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>{" "}
            <path
              d="M245.75 222.066C240.881 225.851 237.031 230.267 232.925 234.513"
              stroke="#000000"
              stroke-opacity="0.9"
              stroke-width="16"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>{" "}
            <path
              d="M300.155 237.925C239.338 247.728 151.119 239.31 107.238 237.925"
              stroke="#000000"
              stroke-opacity="0.9"
              stroke-width="16"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>{" "}
          </g>
        </svg>
        <span>
          {/* <button>
            Register <FontAwesomeIcon icon={faUser} />
          </button> */}
          <motion.button
            class="landing-button"
            initial={{ opacity: 0 }}
            whileInView={{
              opacity: 1,

              transition: { delay: 0.2, duration: 0.9 },
            }}
          >
            Sign up <FontAwesomeIcon icon={faRightToBracket} />
          </motion.button>
          <motion.button
            class="landing-button"
            initial={{ opacity: 0 }}
            whileInView={{
              opacity: 1,

              transition: { delay: 0.2, duration: 0.9 },
            }}
          >
            About Us <FontAwesomeIcon icon={faPaperPlane} />
          </motion.button>
          <motion.button
            class="contact landing-button"
            initial={{ opacity: 0 }}
            whileInView={{
              opacity: 1,

              transition: { delay: 0.2, duration: 0.9 },
            }}
          >
            Contact Us <FontAwesomeIcon icon={faPhone} />
          </motion.button>
        </span>
      </div>
      <div class="container-landing">
        <motion.div class="welcome">
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            whileInView={{
              opacity: 1,
              x: 0,
              transition: { delay: 0.2, duration: 0.5 },
            }}
            viewport={{ once: false, amount: 0.5 }}
          >
            Welcome to <br />
            <motion.span
              class="title-comp"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{
                opacity: 1,
                x: 0,
                transition: { delay: 0.4, duration: 0.5 },
              }}
              viewport={{ once: false, amount: 0.5 }}
            >
              Urban Kicks
            </motion.span>
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            whileInView={{
              opacity: 1,
              x: 0,
              transition: { delay: 0.6, duration: 0.5 },
            }}
            viewport={{ once: false, amount: 0.5 }}
            class="tagline"
          >
            Step into Style & Comfort
          </motion.h1>
          {/* <motion.h1
            initial={{ opacity: 0, y: 10 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: { delay: 0.4, duration: 1 },
            }}
            viewport={{ once: false, amount: 0.5 }}
            class="wlc-2-title"
          >
            Why <br /> <span class="sec">Choose</span> <br />
            <span class="third">Us?</span>
          </motion.h1> */}
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{
          opacity: 1,
          y: 0,
          transition: { delay: 0.25, duration: 0.1 },
        }}
        viewport={{ once: false, amount: 0.5 }}
        class="welcome-2"
      >
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { delay: 0.4, duration: 1 },
          }}
          viewport={{ once: false, amount: 0.5 }}
          class="wlc-2-title"
        >
          Why <br /> <span class="sec">Choose</span> <br />
          <span class="third">Us?</span>
        </motion.h1>
        <motion.div class="list-wlc-2">
          <ul>
            <motion.li
              initial={{ opacity: 0, x: -20 }}
              whileInView={{
                opacity: 1,
                x: 0,
                transition: { delay: 0.1, duration: 0.3 },
              }}
              viewport={{ once: false, amount: 0.5 }}
              class="bullet-1"
            >
              Unmatched Quality
            </motion.li>
            <motion.li
              initial={{ opacity: 0, x: -20 }}
              whileInView={{
                opacity: 1,
                x: 0,
                transition: { delay: 0.3, duration: 0.3 },
              }}
              viewport={{ once: false, amount: 0.5 }}
              class="bullet-2"
            >
              Innovative Designs
            </motion.li>
            <motion.li
              initial={{ opacity: 0, x: -20 }}
              whileInView={{
                opacity: 1,
                x: 0,
                transition: { delay: 0.6, duration: 0.3 },
              }}
              viewport={{ once: false, amount: 0.5 }}
              class="bullet-3"
            >
              Comfort First
            </motion.li>
          </ul>
        </motion.div>
      </motion.div>
      <div>hellow</div>
    </div>
  );
}

export default Landing;
