import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
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
    <Form className="mt-4">
      <Form.Group className="d-flex">
        <Form.Control
          type="text"
          placeholder="Add things to do..."
          value={inputVal}
          onChange={inputValHandler}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
            addNoteKeyPress(e, categoryName)
          }
        />
        <Button
          onClick={addCategoryNewNote(categoryName)}
          disabled={inputVal.length === 0}
          variant={inputVal.length === 0 ? "secondary" : "primary"}
          className="ml-2"
        >
          Add
        </Button>
      </Form.Group>
    </Form>
  );
}

export default NoteForm;
