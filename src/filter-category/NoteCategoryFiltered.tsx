import React from "react";
import { useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { selectFilteredCategories } from "../features/create-note/notesSlice";

function NoteCategoryFiltered() {
  const filteredCategories = useSelector(selectFilteredCategories);

  return (
    <div>
      {filteredCategories.map((elem) => {
        return (
          <Form onSubmit={(e) => e.preventDefault()} key={`form-${elem.id}`}>
            <Form.Row>
              <Col className="col-sm-1">
                <Form.Control
                  readOnly
                  checked={elem.isChecked}
                  type="checkbox"
                />
              </Col>
              <Col className="col-sm-11">
                <p>{elem.text}</p>
              </Col>
            </Form.Row>
          </Form>
        );
      })}
    </div>
  );
}

export default NoteCategoryFiltered;
