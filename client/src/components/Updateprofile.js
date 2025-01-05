import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { CreateAuth } from "../context/Authcontext";

import toast from "react-hot-toast";
import axios from "axios";

const Updateprofile = () => {
  const [auth, SetAuth] = CreateAuth();
  const [name, Setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, Setphone] = useState("");
  const [address, Setaddr] = useState("");

  useEffect(() => {
    const username = auth.user.name;
    const useremail = auth.user.email;
    const userphone = auth.user.phone;
    const useraddress = auth.user.address;
    Setname(username);
    Setphone(userphone);
    setemail(useremail);
    Setaddr(useraddress);
  }, [auth?.user]);

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      const newdata = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/update`,
        { email, name, address, phone }
      );
      console.log(newdata.data.updatedUser);
      if (newdata?.error) {
        toast.error(newdata?.error);
      } else if (newdata.data.updatedUser) {
        SetAuth({ ...auth, user: newdata?.data.updatedUser });
        let ls = localStorage.getItem("auth");
        console.log(ls);
        ls = JSON.parse(ls);
        ls.user = newdata.data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      toast.error("Couldnt Update your profile");
      console.log(error);
    }
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h5>Shipping address</h5>
          <Form>
            {/* Full Name */}
            <Form.Group controlId="fullName" className="mt-3">
              <Form.Label>Full Name *</Form.Label>
              <Form.Control
                type="text"
                placeholder={name}
                onChange={(e) => Setname(e.target.value)}
              />
            </Form.Group>

            {/* Email */}
            <Form.Group controlId="email" className="mt-3">
              <Form.Label>Email *</Form.Label>
              <Form.Control type="email" readOnly placeholder={email} />
            </Form.Group>

            {/* Phone Number */}
            <Form.Group controlId="phoneNumber" className="mt-3">
              <Form.Label>Phone Number *</Form.Label>
              <Form.Control
                type="text"
                placeholder={phone}
                onChange={(e) => Setphone(e.target.value)}
              />
            </Form.Group>

            {/* Address */}
            <Form.Group controlId="address" className="mt-3">
              <Form.Label>Address *</Form.Label>
              <Form.Control
                type="text"
                placeholder={address}
                onChange={(e) => Setaddr(e.target.value)}
              />
            </Form.Group>

            {/* Checkbox */}
            <Form.Group className="mt-3">
              <Form.Check
                type="checkbox"
                label="Use this address for payment details"
              />
            </Form.Group>

            {/* Submit Button */}
            <Button
              className="mt-3 w-100"
              variant="dark"
              type="submit"
              onClick={updateProfile}
            >
              Make changes
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default Updateprofile;
