import React from "react";
import Layout from "../components/Layout";
import { CreateAuth } from "../context/Authcontext";

const Homepage = () => {
  const [auth] = CreateAuth();
  console.log(auth);
  return (
    <Layout>
      <div>Homepage</div>

      <pre>{JSON.stringify(auth, null, 4)}</pre>
    </Layout>
  );
};

export default Homepage;
