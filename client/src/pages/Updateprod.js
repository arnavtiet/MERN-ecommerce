import React from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Form, Button, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
const Updateprod = (pid) => {
  const params = useParams();
  const [id, setId] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setselectedCategory] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();
  const [qty, setQty] = useState(0);
  const [shipped, setShipped] = useState(false);
  const [pic, setPic] = useState("");

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      let answer = window.prompt(
        "are you sure you want to delete this product"
      );
      if (!answer) return;
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/product/delete-product/${id}`
      );
      if (data?.success) {
        toast.success("Item deleted Successfully");
        setTimeout(() => {
          navigate(`/dashboard/admin`);
        });
      } else {
        toast.error("something  went  wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("qty", qty);
    formData.append("shipped", shipped);
    formData.append("category", selectedCategory);

    if (pic) {
      formData.append("image", pic);
    }

    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/product/update-prod/${id}`,
        formData
      );

      if (data?.success) {
        toast.success(data?.message);
      } else {
        toast.success("Product Updated successfully", 10);
      }
      setTimeout(() => {
        navigate("/dashboard/admin");
      }, 10);
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };
  const Singleproduct = async (e) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-single-product/${params.slug}`
      );
      setName(data.product.name);
      setselectedCategory(data.product.category._id);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setQty(data.product.qty);
      setShipped(data.product.shipped);
      setPic(data.product.image);
      setId(data.product._id);
    } catch (error) {
      console.log(error);
    }
  };
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
  useEffect(() => {
    getcategory();
    Singleproduct();

    // console.log(categories);
    //eslint-disable-next-line
  }, []);
  return (
    <Layout>
      <div className="container mt-4">
        <h2>Update Product</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              CATAGORY:
            </Form.Label>
            <Col sm={10}>
              <Form.Select
                required
                value={selectedCategory}
                onChange={(e) => {
                  setselectedCategory(e.target.value);
                  console.log(selectedCategory);
                }}
              >
                <option value="">Select category</option>
                {categories?.map((c) => {
                  return (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  );
                })}
              </Form.Select>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              Description:
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                as="textarea"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter product description"
                required
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              Name:
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder=""
                required
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              Price:
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="number"
                name="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder=""
                required
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              Quantity:
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="number"
                name="qty"
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
                placeholder="Enter quantity"
                required
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              Shipped:
            </Form.Label>
            <Col sm={10}>
              <Form.Check
                type="checkbox"
                name="shipped"
                checked={shipped}
                onChange={(e) => setShipped(e.target.checked)}
                label="Mark as shipped"
                value={(e) => {
                  if (shipped) {
                    e.target.value = true;
                  } else {
                    e.target.value = false;
                  }
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              Image:
            </Form.Label>
            <Col sm={10}>
              <label className="btn btn-outline-secondary col-md-12">
                {pic
                  ? pic.name.split(" ")[0] +
                    (pic.name.includes(" ") ? " ..." : "")
                  : "Upload photo"}

                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => {
                    setPic(e.target.files[0]);
                  }}
                  hidden
                ></input>
              </label>
              <div className="mb-3">
                {pic ? (
                  <div className="text-center p-5">
                    <img
                      src={URL.createObjectURL(pic)}
                      alt="product pic"
                      height={"500px"}
                      width={"300px"}
                    />
                  </div>
                ) : (
                  <div className="text-center p-5">
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/product/prod-photo/${id}`}
                      alt="product pic"
                      height={"500px"}
                      width={"300px"}
                    />
                  </div>
                )}
              </div>
            </Col>
          </Form.Group>
          <div className="w-100 d-flex justify-content-between align-items-center mb-5">
            <Button
              className="btn btn-primary w-75 mx-2 fs-4 py-3"
              type="submit"
            >
              Update Product
            </Button>
            <Button
              onClick={handleDelete}
              className="btn btn-danger w-25 fs-4 mx-2  py-3"
            >
              <FontAwesomeIcon className=" fs-2" icon={faTrash} />
            </Button>
          </div>
        </Form>
      </div>
    </Layout>
  );
};

export default Updateprod;
