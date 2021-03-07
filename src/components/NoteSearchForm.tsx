import React from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";

interface NoteSearchFormProps {
  searchInputVal: string;
  setSearchInputVal: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function NoteSearchForm({
  searchInputVal,
  setSearchInputVal,
}: NoteSearchFormProps) {
  return (
    <Form.Row className="mt-2">
      <Col className="col-sm-3">
        <span>Search by :</span>
      </Col>

      <Col className="col-sm-9">
        <FormControl
          type="text"
          onChange={setSearchInputVal}
          value={searchInputVal}
        />
      </Col>
    </Form.Row>
  );
}

export default NoteSearchForm;
