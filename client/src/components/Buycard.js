import React, { useEffect, useState } from "react";

import Card from "react-bootstrap/Card";

import {
  faCartShopping,
  faHeart,
  faMinus,
  faPlus,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import "./buycard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCart } from "../context/Cartcontext";
import toast from "react-hot-toast";
import { Button, ButtonGroup } from "react-bootstrap";
import { useLike } from "../context/Likedcontext";

const Buycard = ({ product }) => {
  const [showTitle, setShowTitle] = useState(false);
  const [isWobbling, setIsWobbling] = useState(false);
  const [count, setCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [like, setLike] = useLike();
  const [cart, Setcart] = useCart();
  //detele item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      Setcart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };
  const handleClick = () => {
    setIsWobbling(true);
    setTimeout(() => {
      setIsWobbling(false);
    }, 800);
  };
  const fetchCountFromCart = () => {
    const cartCount = JSON.parse(localStorage.getItem("cart")) || [];
    const productCount = cartCount.filter(
      (item) => item._id === product._id
    ).length;
    setCount(productCount);
  };

  useEffect(() => {
    fetchCountFromCart();
    console.log(count);
  }, [cart]);
  return (
    <Card
      className="buycard"
      style={{
       width: 'calc(33.33vw)',

        border: "3px solid black",
        boxShadow: "5px 5px 1px black",
        minHeight: "35rem",
        maxHeight: "fit-content",
      }}
    >
      <Card.Img
        variant="top"
        src={`${process.env.REACT_APP_API}/api/v1/product/prod-photo/${product._id}`}
        className="buycard-img"
      />

      <Card.Body>
        <Card.Title className="text-center custom-font fs-1 ">
          {product.name}
        </Card.Title>
        {/* <Card.Text className="text-center  custom-font-light fs-5 ">
          {product.description}
        </Card.Text> */}
        <div className=" mt-4 mb-5 w-75 mx-auto w-75 card-line">a</div>
        <div className="d-flex justify-content-between align-items-center">
          <Card.Text className="text-RIGHT  custom-font-medium fs-4 ">
            Rs.{product.price}
          </Card.Text>

          <div className="button-container">
            {count === 0 ? (
              <button
                type="button"
                className={`buy-btn animate__animated animate__bounceIn`}
                onMouseEnter={() => setShowTitle(true)}
                onMouseLeave={() => setShowTitle(false)}
                onClick={() => {
                  handleClick();
                  Setcart([...cart, product]);
                  localStorage.setItem(
                    "cart",
                    JSON.stringify([...cart, product])
                  );
                  toast.success("Item Added to cart");
                }}
              >
                {showTitle && (
                  <FontAwesomeIcon
                    style={{
                      opacity: showTitle ? 1 : 0,
                    }}
                    className="add-to-cart"
                    icon={faTruck}
                  />
                )}
                <FontAwesomeIcon
                  icon={faCartShopping}
                  className="cart-icon "
                  style={{
                    opacity: showTitle ? 0 : 1,
                  }}
                />
                {/* <FontAwesomeIcon icon="fa-regular fa-cart-shopping" /> */}
              </button>
            ) : (
              <ButtonGroup
                className={`animate__animated  animate__bounceIn ${
                  isWobbling ? "animate__animated animate__wobble " : ""
                }`}
              >
                <Button
                  className="bg-dark border-dark fs-5 hover-bg-white hover-text-dark"
                  onClick={() => {
                    handleClick();
                    removeCartItem(product._id);
                  }}
                >
                  <FontAwesomeIcon icon={faMinus} />
                </Button>
                <Button className="bg-white border-white text-black fs-5 fw-bold">
                  {count}
                </Button>
                <Button
                  className="bg-dark border-dark border-start"
                  onClick={() => {
                    handleClick();
                    Setcart([...cart, product]);
                    localStorage.setItem(
                      "cart",
                      JSON.stringify([...cart, product])
                    );
                    toast.success("Item Added to cart");
                  }}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </Button>
              </ButtonGroup>
            )}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Buycard;
