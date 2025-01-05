import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import noorder from "../images/notfound.jpg";
import { CreateAuth } from "../context/Authcontext";
import { Image } from "react-bootstrap";
const Orders = () => {
  const [orders, Setorders] = useState([]);
  const [auth] = CreateAuth();
  const handleorders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/myorders`
      );
      console.log(data);
      Setorders(data);
    } catch (error) {
      console.log(error);
      toast.error("Couldnt fetch orders ");
    }
  };
  useEffect(() => {
    handleorders();
  }, [auth?.token]);
  return (
    <>
      {orders?.length > 0 ? (
        <>
          {orders?.map((o) => {
            return o;
          })}
        </>
      ) : (
        <div className=" w-100 h-100 ms-auto">
          <Image className="w-100 h-75" src={noorder} />
        </div>
      )}
      {/* {orders?.map((o) => {
        return o;
      })} */}
    </>
  );
};

export default Orders;
