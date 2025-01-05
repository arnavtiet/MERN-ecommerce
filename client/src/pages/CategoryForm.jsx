import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function CategoryForm({ handlesubmit, setCategoryName, categoryName }) {
  return (
    <Form onSubmit={handlesubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter category name</Form.Label>
        <Form.Control
          type="text"
          placeholder={categoryName}
          onChange={(e) => {
            setCategoryName(e.target.value);
          }}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default CategoryForm;
