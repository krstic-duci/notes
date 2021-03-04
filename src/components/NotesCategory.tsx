import React from "react";
import { useSelector } from "react-redux";
import Alert from "react-bootstrap/Alert";
import { Lightbulb } from "react-bootstrap-icons";
import { selectNotes } from "../features/create-note/notesSlice";
import NoteForm from "./NoteForm";
import NoteItem from "./NoteItem";
import NotesTagsItem from "./NotesTagsItem";

function NotesCategory() {
  const categories = useSelector(selectNotes);

  return (
    <section>
      <h2>Category notes</h2>
      {Object.keys(categories).length > 0 ? (
        <>
          <section className="d-flex align-items-center my-3">
            {/* FIXME: find if we can avoid two same for loops */}
            {Object.keys(categories).map((categoryNameTag, categoryTagId) => {
              return (
                <div key={`tags-${categoryTagId}`} className="mr-3">
                  <NotesTagsItem categoryName={categoryNameTag} />
                </div>
              );
            })}
          </section>
          <section>
            <Alert variant="info" className="d-flex align-items-center">
              <Lightbulb />
              <span className="mx-2">
                Pro tip: Click on a note text to edit it!
              </span>
            </Alert>
          </section>
        </>
      ) : null}

      <section className="d-flex justify-content-around flex-wrap">
        {Object.keys(categories).map((categoryName, categoryId) => {
          return (
            <div
              key={categoryId}
              className="my-5 border border-info p-5 rounded"
            >
              {categoryName}
              {categories[categoryName].map((note, noteId) => {
                return (
                  <div key={`note-${noteId}`}>
                    <NoteItem note={note} categoryName={categoryName} />
                  </div>
                );
              })}
              <NoteForm categoryName={categoryName} />
            </div>
          );
        })}
      </section>
    </section>
  );
}

export default NotesCategory;
