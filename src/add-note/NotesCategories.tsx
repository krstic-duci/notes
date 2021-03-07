import React from "react";
import { useSelector } from "react-redux";
import Alert from "react-bootstrap/Alert";
import { Lightbulb } from "react-bootstrap-icons";

// Components
import NotesCategory from "./NotesCategory";

// Redux slice
import { selectNotes } from "../features/create-note/notesSlice";

// Style
import styles from "./NotesCategories.module.css";

function NoteCategories() {
  const categories = useSelector(selectNotes);

  return (
    <section>
      <h2>Category notes</h2>
      {Object.keys(categories).length > 0 ? (
        <>
          <p className="mt-5">Scroll into:</p>
          <section className="d-flex align-items-center mt-3 mb-5">
            {Object.keys(categories).map((categoryNameTag, categoryTagId) => {
              return (
                <div key={`tags-${categoryTagId}`} className="mr-3">
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
            <span className="mx-2">Tip: Click on a note text to edit it!</span>
          </Alert>
        </>
      ) : null}

      <section
        className={`${styles.category__container} d-flex justify-content-between flex-wrap`}
      >
        {Object.keys(categories).map((categoryName, categoryId) => {
          return (
            <NotesCategory
              categoryName={categoryName}
              categoryId={categoryId}
              key={`categories_${categoryId}`}
            />
          );
        })}
      </section>
    </section>
  );
}

export default NoteCategories;
