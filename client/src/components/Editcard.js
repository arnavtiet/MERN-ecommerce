import React, { useState } from "react";

import Card from "react-bootstrap/Card";

import "./buycard.css";

import { Button, Modal } from "react-bootstrap";

import Editproductform from "./Editproductform";
const Editcard = ({ product }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Card
        className="buycard"
        style={{
          width: "18rem",
          border: "3px solid black",
          boxShadow: "5px 5px 1px black",
        }}
      >
        <Card.Img
          variant="top"
          src={`${process.env.REACT_APP_API}/api/v1/product/prod-photo/${product._id}`}
          className="buycard-img"
        />
        <Card.Body>
          <Card.Text className="text-center fs-1  ">{product.title}</Card.Text>
          <Card.Text className="text-center  custom-font-light fs-5 ">
            {product.description}
          </Card.Text>
          <div className="d-flex justify-content-between align-items-center">
            <Card.Text className="text-RIGHT  custom-font-medium fs-4 ">
              {product.price}
            </Card.Text>
            <Button onClick={handleShow}>EDIT</Button>
          </div>
        </Card.Body>
      </Card>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Editproductform pid={product._id} pslug={product.slug} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Editcard;
