import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectNotes } from "../features/add-note/notesSlice";
import { uniqueId } from "../utils/helpers";

interface Notes {
  name: string;
  notes: Note;
}

interface Note {
  id: string;
  text: string;
  isChecked: boolean;
}

function NotesCategory() {
  const { notes } = useSelector(selectNotes);
  // const [notesList, setNotesList] = useState<Notes[] | undefined>([]);
  // const [inputVal, setInputVal] = useState("");

  // const inputValHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setInputVal(e.target.value);
  // };
  // const changeCheckedState = (itemId: string) => {
  //   let checkedNotes = notesList?.map((elem) => {
  //     if (elem.notes.id === itemId) {
  //       elem.notes.isChecked = true;
  //     }
  //     return elem;
  //   });
  //   setNotesList(checkedNotes);
  //   console.log(checkedNotes);
  // };
  // const addNewNote = () => {
  //   const newNote = {
  //     id: `notes_${uniqueId()}`,
  //     content: inputVal,
  //     isChecked: false,
  //   };

  //   console.log(newNote);
  //   // setNotesList((prevState) => [...prevState, newNote]);
  //   setInputVal("");
  // };
  // const deleteNoteById = (itemId: string) => {
  //   console.log(`delete note with id: ${itemId} clicked`);
  //   setNotesList(notesList?.filter((elem) => elem.notes.id !== itemId));
  // };

  // const editNoteById = (
  //   e: React.ChangeEvent<HTMLInputElement>,
  //   itemId: string
  // ) => {
  //   console.log(`Editing note with ID: ${itemId} with text: ${e.target.value}`);
  //   let editedNotes = notesList?.map((elem) => {
  //     if (elem.notes.id === itemId) {
  //       elem.notes.text = e.target.value;
  //     }
  //     return elem;
  //   });
  //   setNotesList(editedNotes);
  //   console.log(editedNotes);
  // };
  return (
    <>
      <section
        style={{ marginTop: "40px", border: "1px solid", padding: "10px" }}
      >
        <h2>Category</h2>

        {/* FIXME: fix type */}
        {console.log(notes)}
        {notes.map((elem: any) => {
          return (
            <div key={elem.id}>
              <p>{elem.text}</p>
            </div>
          );
        })}
        {/* {notesList && notesList.length > 0 ? (
          <p>Tip: Click on a note text to edit it!</p>
        ) : null}

        {notesList &&
          notesList.map((elem) => {
            return (
              <div
                key={elem.notes.id}
                style={{
                  display: "flex",
                  alignItems: "baseline",
                }}
              >
                <input
                  type="checkbox"
                  checked={elem.notes.isChecked}
                  onChange={() => changeCheckedState(elem.notes.id)}
                />
                <p style={{ width: "300px", marginLeft: "10px" }}>
                  <input
                    type="text"
                    value={elem.notes.text}
                    onChange={(e) => editNoteById(e, elem.notes.id)}
                    style={{ border: 0, outline: 0 }}
                  />
                </p>
                <button
                  onClick={() => deleteNoteById(elem.notes.id)}
                  style={{ marginLeft: "10px" }}
                >
                  Delete
                </button>
              </div>
            );
          })}
        <div>
          <input
            type="text"
            placeholder="Add things to do..."
            value={inputVal}
            onChange={inputValHandler}
          />
          <button onClick={addNewNote}>+ Add</button>
        </div> */}
      </section>
    </>
  );
}

export default NotesCategory;
