import React from "react";
import { useDispatch } from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import { DashCircleFill } from "react-bootstrap-icons";

// Redux slice
import {
  deleteCategoryNote,
  editCategoryNote,
  updateCheckedNote,
  moveNoteFromTo,
} from "../features/create-note/notesSlice";

// Utils/Types
import { Note, Notes } from "../utils/types";

// Style
import styles from "./NoteItem.module.css";

function NoteItem({
  note,
  categoryName,
  categories,
}: {
  note: Note;
  categoryName: string;
  categories: Notes;
}) {
  const dispatch = useDispatch();

  const changeCheckedState = (itemId: string) => () => {
    dispatch(updateCheckedNote(categoryName, itemId));
  };

  const deleteNoteById = (categoryName: string, itemId: string) => () => {
    dispatch(deleteCategoryNote(categoryName, itemId));
  };

  // e type based on: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/16208
  const editNoteById = (itemId: string) => (e: React.BaseSyntheticEvent) => {
    dispatch(editCategoryNote(categoryName, itemId, e.target.value));
  };

  const btnMoveIntoCategory = (
    note: Note,
    moveFrom: string,
    moveTo: string
  ) => () => {
    dispatch(moveNoteFromTo(note, moveFrom, moveTo));
  };

  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <Form.Row className="align-items-center my-1">
        <Col className="col-sm-1">
          <Form.Check
            checked={note.isChecked}
            onChange={changeCheckedState(note.id)}
          />
        </Col>

        <Col className="col-sm-6">
          <Form.Control
            className={styles.note__container__input}
            type="text"
            value={note.text}
            onChange={editNoteById(note.id)}
          />
        </Col>

        <Col className="col-sm-3">
          {Object.keys(categories).length > 1 ? (
            <DropdownButton
              title="Move into..."
              variant="outline-info"
              className="text-muted"
            >
              {Object.keys(categories)
                .filter((elemName) => elemName !== categoryName)
                .map((categoryDropdown, categoryDropdownId) => {
                  return (
                    <Dropdown.Item
                      as="button"
                      key={categoryDropdownId}
                      onClick={btnMoveIntoCategory(
                        note,
                        categoryName,
                        categoryDropdown
                      )}
                    >
                      {categoryDropdown}
                    </Dropdown.Item>
                  );
                })}
            </DropdownButton>
          ) : null}
        </Col>

        <Col className="col-sm-2 text-right">
          <Button
            onClick={deleteNoteById(categoryName, note.id)}
            variant="danger"
          >
            <DashCircleFill />
          </Button>
        </Col>
      </Form.Row>
    </Form>
  );
}

export default NoteItem;
