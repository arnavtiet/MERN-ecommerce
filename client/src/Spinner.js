import React, { useEffect, useState } from "react";
// import { Watch } from "react-loader-spinner";
import "./spinner.css";
import { useNavigate, useLocation } from "react-router-dom";

const Spinner = ({ path = "/login" }) => {
  const [count, setCount] = useState(5);
  const [mount, Setmount] = useState(true);
  const Navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount((prevcount) => prevcount - 1);
    }, 1000);
    return () => {
      clearInterval(intervalId);
      Setmount(false);
    };
  }, []);

  useEffect(() => {
    if (count === 0) {
      Navigate(`${path}`, { state: location.pathname });
    }
  }, [count, Navigate, mount, location, path]);

  return (
    <div className="loader">
      <div className="loader-text">
        {" "}
        <h1>Hold up!</h1>
        <h1>Unauthorized Access</h1>
        <h1>Redirecting You in {count}</h1>
        {/* <Watch
          visible={true}
          height="180"
          width="180"
          radius="48"
          color="#4fa94d"
          ariaLabel="watch-loading"
          wrapperStyle={{}}
          wrapperClass=""
        /> */}
        <div
          aria-label="Orange and tan hamster running in a metal wheel"
          role="img"
          className="wheel-and-hamster"
        >
          <div className="wheel" />
          <div className="hamster">
            <div className="hamster__body">
              <div className="hamster__head">
                <div className="hamster__ear" />
                <div className="hamster__eye" />
                <div className="hamster__nose" />
              </div>
              <div className="hamster__limb hamster__limb--fr" />
              <div className="hamster__limb hamster__limb--fl" />
              <div className="hamster__limb hamster__limb--br" />
              <div className="hamster__limb hamster__limb--bl" />
              <div className="hamster__tail" />
            </div>
          </div>
          <div className="spoke" />
        </div>
      </div>
      <div>
        <img
          src={require("./images/xvzt_966p_230515.jpg")}
          alt="police"
          className="loader-image"
        />
      </div>
    </div>
  );
};

export default Spinner;
