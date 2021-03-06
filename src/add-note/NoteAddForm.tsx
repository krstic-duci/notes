import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { PlusSquareFill } from "react-bootstrap-icons";
import { addCategoryNote } from "../features/create-note/notesSlice";

interface NoteFormProps {
  categoryName: string;
}

function NoteForm({ categoryName }: NoteFormProps) {
  const dispatch = useDispatch();
  const [inputVal, setInputVal] = useState("");

  const addCategoryNewNote = (categoryName: string) => () => {
    dispatch(addCategoryNote(categoryName, inputVal));
    setInputVal("");
  };

  const addNoteKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement>,
    categoryName: string
  ) => {
    if (e.key === "Enter") {
      dispatch(addCategoryNote(categoryName, inputVal));
      setInputVal("");
      // FIXME: function below is not working
      // addCategoryNewNote(categoryName);
    }
  };

  const inputValHandler = (e: React.BaseSyntheticEvent) => {
    setInputVal(e.target.value);
  };
  return (
    <Form className="mt-auto" onSubmit={(e) => e.preventDefault()}>
      <Form.Row>
        <Col className="col-sm-10">
          <Form.Control
            type="text"
            placeholder="Add things to do..."
            value={inputVal}
            onChange={inputValHandler}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
              addNoteKeyPress(e, categoryName)
            }
          />
        </Col>
        <Col className="col-sm-2 text-right">
          <Button
            onClick={addCategoryNewNote(categoryName)}
            disabled={inputVal.length === 0}
            variant={inputVal.length === 0 ? "secondary" : "primary"}
          >
            <PlusSquareFill />
          </Button>
        </Col>
      </Form.Row>
    </Form>
  );
}

export default NoteForm;
