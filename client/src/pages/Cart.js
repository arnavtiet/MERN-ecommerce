import React, { useEffect, useState } from "react";
import "./cart.css";
import Layout from "../components/Layout";
import { useCart } from "../context/Cartcontext";
import { Link, useNavigate } from "react-router-dom";
import { CreateAuth } from "../context/Authcontext";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";
import nocart from "../images/nocart.png";

const Cart = () => {
  const [auth] = CreateAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, Setinstance] = useState("");
  const [loading, Setloading] = useState(false);
  const navigate = useNavigate();
  //token

  const getuserToken = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/token`
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getuserToken();
  }, [auth?.token]);

  //payment

  const handlePayment = async (e) => {
    try {
      Setloading(true);
      const { nonce } = await instance.requestPaymentMethod();

      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/payment`,
        { nonce, cart }
      );
      console.log(data);
      Setloading(false);
      if (data.success) {
        localStorage.removeItem("cart");
        setCart([]);
        navigate("/");
      } else if (!data.success) {
        toast.error("Payment Failed. Try again!");
      }
      // if(data)

      // if (data?.payment.success) toast.success("Payment Successful");
    } catch (error) {
      toast.error("Couldnt make payment");
      console.log(error);
      Setloading(false);
    }
  };
  //gst
  const calculateGST = (total) => {
    if (!total) return "0.00";
    return 0.28 * total;
  };
  //shipping charge
  const calculateDelivery = (total) => {
    if (!total) return "0.00";
    return 0.03 * total;
  };
  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total;
    } catch (error) {
      console.log(error);
    }
  };
  //detele item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };
  const total = totalPrice(cart);
  return (
    <Layout>
      {cart?.length > 0 ? (
        <div className="container">
          {/* <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className="text-center">
              {cart?.length
                ? `You Have ${cart.length} items in your cart ${
                    auth?.token ? "" : "please login to checkout"
                  }`
                : " Your Cart Is Empty"}
            </h4>
          </div>
        </div> */}
          <div className="row mt-4">
            <div className="col-md-8 ">
              {cart?.map((p) => (
                <div className="row mb-2 p-3  flex-row border-top border-dark py-3">
                  <div className="col-md-4">
                    <img
                      src={p.imageUrl}
                      className="card-img-top"
                      alt={p.name}
                      width="auto"
                      height={"auto"}
                    />
                  </div>
                  <div className="col-md-8 ">
                    <p className="fs-2 cart-custom-font ">{p.name}</p>
                    <p className="fs-4"> {p.description}</p>
                    <p>Price : {p.price}</p>
                    {/* <button
                    className="btn btn-danger"
                    onClick={() => removeCartItem(p._id)}
                  >
                    Remove
                  </button> */}

                    <button
                      className="cart-delete-btn"
                      onClick={() => removeCartItem(p._id)}
                    >
                      <svg viewBox="0 0 448 512" className="svgIcon">
                        <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-md-4 text-center  px-4 ">
              <div className="card-main ms-5 mb-4">
                <h4 className="card__title">ORDER SUMMARY</h4>

                <Row className="mb-3">
                  <Col xs={6} className="fw-bold">
                    SUBTOTAL
                  </Col>
                  <Col xs={6} className="text-end">
                    {total.toLocaleString("en-US", {
                      style: "currency",
                      currency: "INR",
                    })}
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col xs={6} className="fw-bold">
                    SHIPPING
                  </Col>
                  <Col xs={6} className="text-end">
                    {calculateDelivery(total).toLocaleString("en-US", {
                      style: "currency",
                      currency: "INR",
                    })}
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col xs={6} className="fw-bold">
                    GST
                  </Col>
                  <Col xs={6} className="text-end">
                    {calculateGST(total).toLocaleString("en-US", {
                      style: "currency",
                      currency: "INR",
                    })}
                  </Col>
                </Row>

                <hr />

                <Row className="mb-4">
                  <Col xs={6} className="fw-bold">
                    TOTAL
                  </Col>
                  <Col xs={6} className="text-end fw-bold">
                    {(total + 0.28 * total + 0.05 * total).toLocaleString(
                      "en-US",
                      {
                        style: "currency",
                        currency: "INR",
                      }
                    )}
                  </Col>
                </Row>

                <div className="card__form">
                  {auth?.user ? (
                    <>
                      <button
                        className={
                          loading ? "card__payment " : "card__button nowrap"
                        }
                        onClick={handlePayment}
                        disabled={loading || !instance || !auth?.user?.address}
                      >
                        {loading ? "Processing ...." : "PAY"}
                      </button>
                      <div className="mt-2">
                        {!clientToken || !cart?.length ? (
                          ""
                        ) : (
                          <>
                            <DropIn
                              options={{
                                authorization: clientToken,
                                paypal: {
                                  flow: "vault",
                                },
                              }}
                              onInstance={(instance) => Setinstance(instance)}
                            />
                          </>
                        )}
                      </div>
                    </>
                  ) : (
                    <button
                      onClick={() => navigate("/login")}
                      className="card__button__login nowrap w-75"
                    >
                      LOGIN TO CHECKOUT!
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Container
          fluid
          className="d-flex justify-content-center align-items-center vh-100 bg-light "
        >
          <Row className="text-center">
            <Col>
              {/* Image */}
              <Image
                src={nocart}
                alt="Empty Cart"
                className="mb-1 "
                style={{ maxWidth: "30vw", maxHeight: "50vh" }}
              />

              {/* Title */}
              <h3 className="fw-bold">Your cart is empty</h3>

              {/* Subtitle */}
              <p className="text-muted">
                Looks like you haven’t added anything to cart.
              </p>

              {/* Button */}
              <Button
                variant="dark"
                size="lg"
                className="mt-2 fs-3"
                onClick={() => {
                  navigate("/");
                }}
              >
                Back to Menu
              </Button>
            </Col>
          </Row>
        </Container>
      )}
    </Layout>
  );
};

export default Cart;
