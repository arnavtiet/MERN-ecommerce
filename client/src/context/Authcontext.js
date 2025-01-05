import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const Context = createContext();
const AuthContext = ({ children }) => {
  const [auth, SetAuth] = useState({ user: null, token: "" });
  //default - axios

  axios.defaults.headers.common["Authorization"] = auth?.token;
  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parseData = JSON.parse(data);
      SetAuth({ ...auth, user: parseData.user, token: parseData.token });
    }
    //eslint-disable-next-line
  }, []);
  return (
    <Context.Provider value={[auth, SetAuth]}>{children}</Context.Provider>
  );
};
const CreateAuth = () => useContext(Context);

export { CreateAuth, AuthContext };
