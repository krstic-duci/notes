import React from "react";
import { useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

// Redux slice
import { selectFilteredCategories } from "../features/create-note/notesSlice";

function NoteCategoryFiltered() {
  const filteredCategories = useSelector(selectFilteredCategories);

  return (
    <>
      <h2>Here is what we could find:</h2>
      <div className="border border-info rounded p-3">
        {filteredCategories.map((elem) => {
          return (
            <Form.Row key={`form-${elem.id}`} className="my-3">
              <Col className="col-sm-1">
                <Form.Check readOnly checked={elem.isChecked} />
              </Col>

              <Col className="col-sm-11">
                <p className="text-muted">{elem.text}</p>
              </Col>
            </Form.Row>
          );
        })}
      </div>
    </>
  );
}

export default NoteCategoryFiltered;
