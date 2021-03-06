import React from "react";
import { useDispatch } from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import { DashCircleFill } from "react-bootstrap-icons";
import {
  deleteCategoryNote,
  editCategoryNote,
  updateCheckedNote,
} from "../features/create-note/notesSlice";
import { Note, Notes } from "../utils/types";

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

  const changeCheckedState = (itemId: number) => () => {
    dispatch(updateCheckedNote(categoryName, itemId));
  };

  const deleteNoteById = (categoryName: string, itemId: number) => () => {
    dispatch(deleteCategoryNote(categoryName, itemId));
  };

  // based on: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/16208
  const editNoteById = (e: React.BaseSyntheticEvent, itemId: number) => {
    dispatch(editCategoryNote(categoryName, itemId, e.target.value));
  };

  const btnMoveIntoCategory = (
    note: Note,
    moveFrom: string,
    moveTo: string
  ) => () => {
    // FIXME: should component re-render when I click on this dropdown btn
    console.log(
      `Need to move ${JSON.stringify(note)} from ${moveFrom} to ${moveTo}`
    );
  };

  return (
    <Form>
      <Form.Row className="align-items-center my-3">
        <Col className="col-sm-1">
          <Form.Control
            size="sm"
            type="checkbox"
            checked={note.isChecked}
            onChange={changeCheckedState(note.id)}
          />
        </Col>

        <Col className="col-sm-6">
          <Form.Control
            type="text"
            value={note.text}
            onChange={(e) => editNoteById(e, note.id)}
            style={{ border: 0, outline: 0 }}
          />
        </Col>

        <Col className="col-sm-3">
          {Object.keys(categories).length > 1 ? (
            <DropdownButton title="Move into..." variant="outline-info">
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
