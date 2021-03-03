import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { addNewCategory } from "../features/add-note/notesSlice";
import { uniqueId } from "../utils/helpers";

interface Note {
  id: string;
  text: string;
  isChecked: boolean;
}

function CreateNoteModal() {
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const [openModal, setOpenModal] = useState(false);
  const [categoryName, setCategoryName] = useState("");

  const openModalHandler = () => {
    setOpenModal(true);

    setCategoryName("");
  };

  const closeModalHandler = () => {
    setOpenModal(false);
  };

  const createCategoryHeading = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(e.target.value);
  };

  const createNewNote = () => {
    // FIXME: only for showcase - needs to be changed
    const newNote = {
      [categoryName]: {
        id: `notes_${uniqueId()}`,
        text: "",
        isChecked: false,
      },
    };
    dispatch(addNewCategory(newNote));

    setOpenModal(false);
  };

  const createNewNoteOnEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      createNewNote();
    }
  };

  useEffect(() => {
    inputRef.current && inputRef.current.focus();
  });

  return (
    <>
      <Button type="primary" onClick={openModalHandler}>
        Create new note
      </Button>

      <Modal show={openModal} onHide={closeModalHandler} centered>
        <Modal.Body>
          <Form onSubmit={(e) => e.preventDefault()}>
            <Row>
              <Col>
                <Form.Group controlId="categoryName">
                  <Form.Label>Name</Form.Label>

                  <Form.Control
                    ref={inputRef}
                    type="text"
                    placeholder="Add category name"
                    name="name"
                    value={categoryName}
                    onChange={createCategoryHeading}
                    onKeyDown={createNewNoteOnEnter}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="default" onClick={closeModalHandler}>
            Cancel
          </Button>
          <Button
            variant={categoryName.length === 0 ? "secondary" : "primary"}
            onClick={createNewNote}
            disabled={categoryName.length === 0}
          >
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateNoteModal;
