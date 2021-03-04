import React from "react";
import { useDispatch } from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {
  deleteCategoryNote,
  editCategoryNote,
  updateCheckedNote,
} from "../features/create-note/notesSlice";

// Types
import { Note } from "../utils/types";

function NoteItem({
  note: { id, text, isChecked },
  categoryName,
}: {
  note: Note;
  categoryName: string;
}) {
  const dispatch = useDispatch();

  const changeCheckedState = (itemId: number) => () => {
    dispatch(updateCheckedNote(categoryName, itemId));
  };

  const deleteNoteById = (categoryName: string, itemId: number) => () => {
    dispatch(deleteCategoryNote(categoryName, itemId));
  };

  // based on: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/16208
  // could cast e.target.value to string also
  const editNoteById = (e: React.BaseSyntheticEvent, itemId: number) => {
    dispatch(editCategoryNote(categoryName, itemId, e.target.value));
  };

  return (
    <Form className="my-2 d-flex align-items-baseline">
      <Form.Group className="d-flex">
        <Form.Control
          size="sm"
          type="checkbox"
          checked={isChecked}
          onChange={changeCheckedState(id)}
        />

        <p style={{ width: "300px", marginLeft: "10px" }}>
          <Form.Control
            type="text"
            value={text}
            onChange={(e) => editNoteById(e, id)}
            style={{ border: 0, outline: 0 }}
          />
        </p>

        <Button onClick={deleteNoteById(categoryName, id)} className="ml-2">
          Delete
        </Button>
      </Form.Group>
    </Form>
  );
}

export default NoteItem;
