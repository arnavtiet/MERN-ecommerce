import React from "react";
import { Button, Card, Form } from "react-bootstrap";

const Updatepassword = () => {
  return (
    <>
      <Card>
        <Card.Body>
          <h5>Change Password</h5>
          <Form>
            {/* password */}
            <Form.Group controlId="fullName" className="mt-3">
              <Form.Label>New Password *</Form.Label>
              <Form.Control type="text" placeholder="John Snow" />
            </Form.Group>
            <Form.Group controlId="fullName" className="mt-3">
              <Form.Label>Confirm Password *</Form.Label>
              <Form.Control type="text" placeholder="John Snow" />
            </Form.Group>

            {/* Submit Button */}
            <Button className="mt-3" variant="primary" type="submit">
              Next
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default Updatepassword;
