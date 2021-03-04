import React from "react";
import { useSelector } from "react-redux";
import { selectNotes } from "../features/create-note/notesSlice";
import NoteForm from "./NoteForm";
import NoteItem from "./NoteItem";

function NotesCategory() {
  const categories = useSelector(selectNotes);

  return (
    <>
      <section
        style={{ marginTop: "40px", border: "1px solid", padding: "10px" }}
      >
        <h2>Category</h2>
        {Object.keys(categories).map((categoryName, categoryId) => {
          return (
            <div key={categoryId}>
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
    </>
  );
}

export default NotesCategory;
