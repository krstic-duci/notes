import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { ThreeDots, Trash } from "react-bootstrap-icons";
import NoteAddForm from "./NoteAddForm";
import NoteItem from "./NoteItem";
import NoteSearchForm from "../components/NoteSearchForm";
import {
  deleteCategory,
  selectNotes,
} from "../features/create-note/notesSlice";

interface NotesCategoryProps {
  categoryName: string;
  categoryId: number;
}

function NotesCategory({ categoryName, categoryId }: NotesCategoryProps) {
  const categories = useSelector(selectNotes);
  const dispatch = useDispatch();
  const [showNoteOptions, setShowNoteOptions] = useState(false);
  const [searchInputVal, setSearchInputVal] = useState("");

  const deleteCategoryBtn = (categoryName: string) => () => {
    dispatch(deleteCategory(categoryName));
  };

  const showMoreNoteOption = () => {
    setShowNoteOptions(!showNoteOptions);
  };

  const changeSearchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInputVal(e.target.value);
  };
  return (
    <Col
      id={`${categoryName}`}
      key={`category_${categoryId}`}
      className="col-sm-5 rounded mb-3 p-4 d-flex flex-wrap flex-column"
    >
      <p className="d-flex mb-2">
        {/* className={styles.note__container__para} */}
        <span>{categoryName}</span>
        <OverlayTrigger
          overlay={<Tooltip id="tooltip-example">Show more options</Tooltip>}
        >
          <Button
            onClick={showMoreNoteOption}
            className="ml-auto"
            variant="outline"
          >
            <ThreeDots />
          </Button>
        </OverlayTrigger>

        <Button variant="outline" onClick={deleteCategoryBtn(categoryName)}>
          <Trash />
        </Button>
      </p>

      {categories[categoryName]
        .filter((filterElem) => filterElem.text.includes(searchInputVal))
        .map((note, noteId) => {
          return (
            <React.Fragment key={`note-${noteId}`}>
              <NoteItem
                note={note}
                categoryName={categoryName}
                categories={categories}
              />
            </React.Fragment>
          );
        })}

      {showNoteOptions && (
        <>
          <NoteAddForm categoryName={categoryName} />

          <NoteSearchForm
            searchInputVal={searchInputVal}
            setSearchInputVal={changeSearchHandler}
          />
        </>
      )}
    </Col>
  );
}

export default NotesCategory;
