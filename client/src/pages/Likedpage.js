import React from "react";
import { useLike } from "../context/Likedcontext";
import { Card } from "react-bootstrap";
import Layout from "../components/Layout";
import Buycard from "../components/Buycard";

const Likedpage = () => {
  const [like, setLike] = useLike();
  return (
    <Layout>
      {like.map((prod) => {
        return <Buycard product={prod} />;
      })}
    </Layout>
  );
};

export default Likedpage;
