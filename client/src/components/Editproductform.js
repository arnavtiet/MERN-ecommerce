import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Form, Button, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Editproductform = ({ pid, pslug }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setselectedCategory] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();
  const [qty, setQty] = useState(0);
  const [shipped, setShipped] = useState(false);
  const [pic, setPic] = useState("");
  const [prod, setProd] = useState([]);
  const getsingleProduct = async (e) => {
    try {
      const temp = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-single-product/${pslug}`
      );
      setProd(temp);
      console.log(prod);
    } catch (error) {
      console.log(error);
      toast.error("something went wrong!");
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
      const { data } = axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/update-prod/${pid}`,
        formData
      );

      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product created successfully", 10);
        setTimeout(() => {
          navigate("/dashboard/admin/product");
        }, 10);
      }
    } catch (error) {
      console.log(error.message);
      toast.error("something went wrong");
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
    getsingleProduct();
    // console.log(categories);
    //eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="container mt-4">
        <h2>Create Product</h2>
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
                <option value="">"{prod.data.product.category.name}"</option>
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
                placeholder={prod.data.product.name}
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
                {pic && (
                  <div className="text-center p-5">
                    <img
                      src={URL.createObjectURL(pic)}
                      alt="product pic"
                      height={"500px"}
                      width={"300px"}
                    />
                  </div>
                )}
              </div>
            </Col>
          </Form.Group>

          <Button className="w-100 col-md-12 btn " type="submit">
            Create Product
          </Button>
        </Form>
      </div>
    </>
  );
};

export default Editproductform;
