import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Alert from "react-bootstrap/Alert";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Lightbulb, Trash } from "react-bootstrap-icons";
import {
  deleteCategory,
  selectNotes,
} from "../features/create-note/notesSlice";
import NoteAddForm from "./NoteAddForm";
import NoteItem from "./NoteItem";

function NotesCategory() {
  const categories = useSelector(selectNotes);
  const dispatch = useDispatch();

  const deleteCategoryBtn = (categoryName: string) => () => {
    // FIXME:
    // Make two categories (Car, Food), in the first one make several items
    // and in the second one make one item, then remove Car category.
    // We have Food category with one item, add new item into Food category
    // then delete the first item added into the Food category
    // It will delete the whole items array in Food category
    dispatch(deleteCategory(categoryName));
  };

  return (
    <section>
      <h2>Category notes</h2>
      {Object.keys(categories).length > 0 ? (
        <>
          <p className="mt-5">Scroll into:</p>
          <section className="d-flex align-items-center mt-3 mb-5">
            {/* FIXME: find if we can avoid two same for loops */}
            {Object.keys(categories).map((categoryNameTag, categoryTagId) => {
              return (
                <div key={`tags-${categoryTagId}`} className="mr-3">
                  {/* FIXME: check useRef() and scrollIntoView */}
                  <a
                    href={`#${categoryNameTag}`}
                    role="button"
                    className="btn btn-outline-info"
                  >
                    {categoryNameTag}
                  </a>
                </div>
              );
            })}
          </section>
          <Alert variant="info" className="d-flex align-items-center">
            <Lightbulb />
            <span className="mx-2">
              Pro tip: Click on a note text to edit it!
            </span>
          </Alert>
        </>
      ) : null}

      <section className="d-flex justify-content-between flex-wrap">
        {Object.keys(categories).map((categoryName, categoryId) => {
          return (
            <Col
              id={`${categoryName}`}
              key={categoryId}
              className="col-sm-5 border border-info rounded mb-3 p-4"
            >
              <p className="d-flex lead mb-5">
                <span>{categoryName}</span>
                <Button
                  variant="outline"
                  className="ml-auto"
                  onClick={deleteCategoryBtn(categoryName)}
                >
                  <Trash />
                </Button>
              </p>

              {categories[categoryName].map((note, noteId) => {
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

              <NoteAddForm categoryName={categoryName} />
            </Col>
          );
        })}
      </section>
    </section>
  );
}

export default NotesCategory;
