import React from "react";
import { useState, useEffect } from "react";
import { CreateAuth } from "../context/Authcontext";
import axios from "axios";
import { Outlet } from "react-router-dom";
import Spinner from "../Spinner";

const Admin = () => {
  const [ok, SetOk] = useState(false);
  const [auth] = CreateAuth();
  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/admin-auth`
      );
      console.log("code was here");
      console.log(res.data);
      if (res.data.ok) {
        SetOk(true);
      } else {
        SetOk(false);
      }
    };
    if (auth?.token) {
      authCheck();
    }
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner />;
};

export default Admin;
