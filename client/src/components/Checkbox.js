import React from "react";
import "./checkbox.css";
import Form from "react-bootstrap/Form";

const Checkbox = ({ name }) => {
  return (
    <div className="form-check form-check-inline custom-checkbox">
      <input
        className="form-check-input"
        type="checkbox"
        id="customCheck1"
        defaultValue
      />
      <label className="form-check-label" htmlFor="customCheck1">
        Checkbox Label
      </label>
    </div>
  );
};

export default Checkbox;
