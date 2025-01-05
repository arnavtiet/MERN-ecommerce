import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "./context/Authcontext";
import "animate.css";
import { CartProvider } from "./context/Cartcontext";
import { LikeProvider } from "./context/Likedcontext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContext>
    <LikeProvider>
      <CartProvider>
        <BrowserRouter>
          {" "}
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </BrowserRouter>
      </CartProvider>
    </LikeProvider>
  </AuthContext>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
