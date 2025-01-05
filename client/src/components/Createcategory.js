import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";

import axios from "axios";
import toast from "react-hot-toast";
import { Modal } from "react-bootstrap";
import CategoryForm from "../pages/CategoryForm";
const Createcategory = () => {
  const [category, setCategory] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [updatedCategory, SetupdatedCategory] = useState("");
  const [selected, Setselected] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleDelete = async (pid) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/category/delete-category/${pid}`
      );
      if (data?.success) {
        toast.success(data.message, 20);
        getcategory();
      } else {
        toast(data.message);
      }
    } catch (error) {
      console.log(error);
      toast("Something went wrong");
    }
  };

  const getcategory = async (e) => {
    try {
      const data = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/getcategory`
      );
      setCategory(data.data.data);
      console.log();
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`,
        {
          name: updatedCategory,
        }
      );
      if (data?.success) {
        toast.success(data.message, 20);
        Setselected(null);
        SetupdatedCategory("");
        getcategory();
      } else {
        toast(data.message);
      }
    } catch (error) {
      console.log(error);
      toast("Something went wrong");
    }
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    // try {
    //   const response = await axios.post(
    //     "http://localhost:8080/api/v1/category/create-category",
    //     { name: "temp1" }
    //   );
    //   console.log(response.data);
    // } catch (error) {
    //   if (error.response) {
    //     console.error("Response data:", error.response.data);
    //   } else {
    //     console.error("Error:", error.message);
    //   }
    // }

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/category/create-category`,
        {
          name: newCategory,
        }
      );
      if (data?.success) {
        toast.success(data.message, 20);
        getcategory();
      } else {
        toast(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.danger("Something went wrong");
    }
  };
  useEffect(() => {
    getcategory();
    console.log(category);
    //eslint-disable-next-line
  }, []);
  return (
    <div className="main_section">
      <CategoryForm
        handlesubmit={handleCategorySubmit}
        setCategoryName={setNewCategory}
        categoryName={newCategory}
      />

      <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {category.map((c) => {
            return (
              <tr>
                {" "}
                <td key={c._id}>{c.name}</td>
                <td className="table-button">
                  <Button
                    variant="success"
                    onClick={() => {
                      handleShow();
                      Setselected(c);
                      SetupdatedCategory(c.name);
                    }}
                  >
                    EDIT
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => {
                      handleDelete(c._id);
                    }}
                  >
                    DELETE
                  </Button>
                </td>
                <td></td>
              </tr>
            );
          })}
          ;
        </tbody>
      </table>
      {/* edit form pop up */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>EDIT CATEGORY</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CategoryForm
            handlesubmit={handleUpdate}
            setCategoryName={SetupdatedCategory}
            categoryName={updatedCategory}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Createcategory;
