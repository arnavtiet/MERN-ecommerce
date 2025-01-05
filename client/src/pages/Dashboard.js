import React, { useEffect, useRef, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import Buycard from "../components/Buycard";
import Image from "react-bootstrap/Image";
import "./dashboard.css";
import { Checkbox, Radio } from "antd";
import Carousel from "react-bootstrap/Carousel";
import { motion, useInView } from "framer-motion";
import notfound from "../images/noproduct.jpeg";
import { ThreeDots } from "react-loader-spinner";

import { useCart } from "../context/Cartcontext";
import { Prices } from "../components/Prices";
import carouselImg1 from "../images/carousel-1.webp";
import carouselImg2 from "../images/carousel-2.webp";
import carouselImg3 from "../images/carousel-3.webp";
import toast from "react-hot-toast";

const Dashboard = () => {
  const cardContainerRef = useRef(null); // Reference for the div containing cards
  const isInView = useInView(cardContainerRef, { once: true });
  const [products, SetProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [filterloading, setFilterloading] = useState(false);
  // const [cart, setCart] = useCart();
  //filter by cat
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  //get all products
  const getproducts = async (e) => {
    try {
      setFilterloading(true);
      const data = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product`
      );
      SetProducts(data.data.products);
      setFilterloading(false);
    } catch (error) {
      console.log(error);
    }
  };

  //get all category
  const getcategory = async (e) => {
    try {
      const data = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/getcategory`
      );
      setCategories(data.data.data);
      console.log(data.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  //filter products
  const filterProduct = async () => {
    try {
      setFilterloading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/prod-filter`,
        { checked, radio }
      );
      // console.log(data);
      SetProducts(data?.products);
      setFilterloading(false);
    } catch (error) {
      console.log(error);
      toast.error("Could'nt filter products");
    }
  };

  useEffect(() => {
    getcategory();
    console.log(products);
    //eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (!checked.length || !radio.length) getproducts();
  }, [checked.length, radio.length]);
  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  return (
    <>
      <Layout>
        <div className="mt-5 w-90 m-4 border-3">
          <Carousel interval={800}>
            <Carousel.Item>
              <div className="w-100">
                <Image
                  className="d-block w-100"
                  src={carouselImg1}
                  alt="Slide 1"
                  // style={{ objectFit: "cover", height: "auto" }}
                  rounded
                  fluid
                />
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="w-100">
                <Image
                  className="d-block w-100"
                  src={carouselImg2}
                  alt="Slide 2"
                  // style={{ objectFit: "cover", height: "auto" }}
                  rounded
                  fluid
                />
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="w-100">
                <Image
                  className="d-block w-100"
                  src={carouselImg3}
                  alt="Slide 3"
                  // style={{ objectFit: "cover", height: "auto" }}
                  rounded
                  fluid
                />
              </div>
            </Carousel.Item>
          </Carousel>
        </div>
        <div
          class=" text-center py-5 m-3"
          style={{
            backgroundColor: "white",
            // border: "5rem solid #D5BDAF",
            color: "black",
          }}
        >
          <h1 className="montserrat-custom-bold">
            Your Sole Mate Is Waiting.
            <br />
            Let’s Get You Steppin’!
          </h1>

          <p class="montserrat-custom-light mb-3">
            Find Everything You Need, All in One Place.
            <br />
            Exclusive Deals, Quality Products, and Fast Delivery!
          </p>
          <button class="btn  btn-dark mt-3 p-3 fs-4">
            Start Shopping Now
          </button>
          <hr className="dash-main-line" />
        </div>
        <div className="dash-main">
          <div className="dash-left ml-4">
            <aside>
              {" "}
              <h4 className="text-center mt-5 mx-1 fw-bold">Category</h4>
              <div className="d-flex flex-column selections-wrapper">
                {categories.map((c) => {
                  return (
                    <Checkbox
                      onChange={(e) => {
                        handleFilter(e.target.checked, c._id);
                      }}
                      id={c._id}
                      className="fs-4 selections"
                    >
                      {c.name}
                    </Checkbox>
                  );
                })}
              </div>
              {/* price filter */}
              <h4 className="text-center mt-4 fw-bold"> Price </h4>
              <div className="d-flex flex-column selections-wrapper ">
                <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                  {Prices?.map((p) => (
                    <div key={p._id} className="mb-2">
                      <Radio className="fs-5" value={p.array}>
                        {p.name}
                      </Radio>
                    </div>
                  ))}
                </Radio.Group>
              </div>
              <div className="d-flex flex-column p-5">
                <button
                  className="btn btn-dark "
                  onClick={() => window.location.reload()}
                >
                  RESET
                </button>
              </div>
            </aside>
          </div>
          <div className=" container mt-5 mb-5">
            <div className="container mt-5 mb-5 ">
              <div className=" row   g-5 mb-2">
                {" "}
                {filterloading ? (
                  <div className="d-flex justify-content-center align-items-center w-100 h-100">
                    <ThreeDots
                      visible={true}
                      height="80"
                      width="80"
                      color="black"
                      radius="9"
                      ariaLabel="three-dots-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                    />
                  </div>
                ) : products.length > 0 ? (
                  products.map((product, index) => (
                    <motion.div
                      key={product._id}
                      initial={{ opacity: 0, x: -100 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{
                        delay: index * 0.2,
                        duration: 0.8,
                        type: "spring",
                        ease: "easeOut",
                      }}
                      exit={{ opacity: 0, x: -100 }}
                      className="col-12 col-sm-6 col-md-4"
                      ref={cardContainerRef}
                    >
                      <Buycard product={product} classname="g-5"/>
                    </motion.div>
                  ))
                ) : (
                  <>
                    <div className="d-flex justify-content-center pe-5">
                      <Image src={notfound} className="notfound me-4" />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Dashboard;
