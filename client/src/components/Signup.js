import "./sign.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

import "../sneaker-svgrepo-com.svg";
import { useState } from "react";
function Sign() {
  const [user, setUser] = useState("Username");
  const [pass, setPass] = useState("");

  return (
    <div className="App">
      <div class="navbar">
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
          <button>
            Register <FontAwesomeIcon icon={faUser} />
          </button>
          {/* <button>
            Sign up <FontAwesomeIcon icon={faRightToBracket} />
          </button> */}
          <button>
            About Us <FontAwesomeIcon icon={faPaperPlane} />
          </button>
          <button class="contact">
            Contact Us <FontAwesomeIcon icon={faPhone} />
          </button>
        </span>
      </div>
      <div class="container-sign">
        <form>
          <h2>Sign up</h2>
          <table>
            {/* <tr class="row0">
              <input type="text" placeholder="First name"></input>
              <input type="text" placeholder="Last Name"></input>
            </tr> */}
            <tr class="row1">
              <input
                type="text"
                value={user}
                onChange={(e) => setUser(e.target.value)}
              ></input>
            </tr>
            <tr class="row2">
              <input
                type="password"
                placeholder="Password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
              ></input>
            </tr>
            {/* <tr class="row3">
              <input type="text" placeholder="Phone number"></input>
            </tr> */}
            {/* <tr class="row5">
              <input type="email" placeholder="Email"></input>
            </tr> */}
            {/* <tr class="row6">
              <input id="Adr" type="text" placeholder="Address"></input>
            </tr> */}
            <tr class="row7">
              <span id="form-text">
                {/* <input type="checkbox" placeholder="Keep Logged IN"></input> */}
                {/* Forgot Password Keep Logged in <button type="toggle"></button> */}
                <a href="./App.css">
                  <h1 id="f-pass">Forgot Password</h1>
                </a>
              </span>
              <button id="submit-btn">
                Submit <FontAwesomeIcon id="submit-arrow" icon={faArrowRight} />
              </button>
            </tr>
          </table>
        </form>
      </div>
    </div>
  );
}

export default Sign;
