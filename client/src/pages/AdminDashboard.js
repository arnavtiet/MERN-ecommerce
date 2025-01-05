import React, { useState } from "react";
import Layout from "../components/Layout";
import "./AdminDashboard.css";

import ProductForm from "../components/ProductForm";
import Products from "../components/Products";
import Createcategory from "../components/Createcategory";

const AdminDashboard = () => {
  const [currentView, setCurrentView] = useState(""); // Keeps track of the active section

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  return (
    <Layout>
      <div className="dashboard">
        <div className="dashboard_sidebar">
          <h3 className="sidebar_heading">Admin Menu</h3>
          <button
            className="sidebar_btn"
            onClick={() => handleViewChange("createCategory")}
          >
            Create Category
          </button>
          <button
            className="sidebar_btn"
            onClick={() => handleViewChange("createProduct")}
          >
            Create Product
          </button>
          <button
            className="sidebar_btn"
            onClick={() => handleViewChange("SHOWPRODUCTS")}
          >
            Show Products
          </button>
        </div>

        <div className="dashboard_main">
          {currentView === "createCategory" && <Createcategory />}

          {currentView === "createProduct" && <ProductForm />}

          {currentView === "SHOWPRODUCTS" && <Products />}
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
