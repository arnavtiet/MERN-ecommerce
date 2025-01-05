// Profile.js
import React, { useState } from "react";
import Layout from "../components/Layout";
import { Menu } from "antd";
import "./profile.css";
import { Card, Col, Container, Row } from "react-bootstrap";
import Updateprofile from "../components/Updateprofile";
import Updatepassword from "../components/Updatepassword";
import Orders from "../components/Orders";

const Profile = () => {
  const [select, Setselect] = useState("1");
  const items = [
    {
      key: "1",
      label: "User Profile",
    },
    {
      key: "2",
      label: "Forgot Password",
    },
    {
      type: "divider",
    },
    {
      key: "3",
      label: "My orders",
    },
  ];

  const handleClick = (e) => {
    Setselect(e.key);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Handle form submission
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <Container className="py-5">
        <Row>
          {/* Left Column */}
          <Col md={4}>
            <Card
              style={{
                width: "30vw",
              }}
            >
              <Card.Body>
                <Card.Title className="text-center">MENU</Card.Title>
                <Card.Text>
                  <Menu
                    onClick={handleClick}
                    style={{
                      width: "25vw",
                    }}
                    defaultSelectedKeys={select}
                    mode="inline"
                    items={items}
                  />
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          {/* Right Column */}
          <Col md={8}>
            {(() => {
              if (select === "1") {
                return <Updateprofile />;
              } else if (select === "2") {
                return <Updatepassword />;
              } else if (select === "3") {
                return <Orders />;
              }
            })()}
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Profile;
