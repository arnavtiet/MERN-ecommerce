import React, { useEffect, useState } from "react";
// import Buycard from "./Buycard";
import Editcard from "./Editcard";
import axios from "axios";
import { Link } from "react-router-dom";
const Products = () => {
  const [products, SetProducts] = useState([]);
  const getproducts = async (e) => {
    try {
      const data = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product`
      );
      SetProducts(data.data.products);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getproducts();
    console.log(products);
    //eslint-disable-next-line
  }, []);

  return (
    <div className="container mt-4">
      <div className="row g-4">
        {" "}
        {products.map((product) => (
          <Link
            className="col-12 col-sm-6 col-md-4 col-lg-3"
            to={`/Dashboard/admin/product/${product.slug}`}
            style={{ textDecoration: "none" }}
          >
            <div
              key={product._id}
              className="col-12 col-sm-6 col-md-4 col-lg-3"
            >
              <Editcard product={product} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Products;
