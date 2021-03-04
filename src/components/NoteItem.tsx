import React from "react";
import { useDispatch } from "react-redux";
import {
  Note,
  deleteCategoryNote,
  editCategoryNote,
} from "../features/create-note/notesSlice";

function NoteItem({
  note: { id, text, isChecked },
  categoryName,
}: {
  note: Note;
  categoryName: string;
}) {
  const dispatch = useDispatch();
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
  const deleteNoteById = (categoryName: string, itemId: number) => () => {
    console.log(`delete note with id: ${itemId} clicked`);
    dispatch(deleteCategoryNote(categoryName, itemId));
  };

  const editNoteById = (
    e: React.ChangeEvent<HTMLInputElement>,
    itemId: number
  ) => {
    console.log(`Editing note with ID: ${itemId} with text: ${e.target.value}`);
    dispatch(editCategoryNote(categoryName, itemId, e.target.value));
  };
  return (
    <div style={{ display: "flex", alignItems: "baseline" }}>
      {/* <input
        type="checkbox"
        checked={isChecked}
        onChange={() => changeCheckedState(id)}
      /> */}
      <p style={{ width: "300px", marginLeft: "10px" }}>
        <input
          type="text"
          value={text}
          onChange={(e) => editNoteById(e, id)}
          style={{ border: 0, outline: 0 }}
        />
      </p>
      <button
        onClick={deleteNoteById(categoryName, id)}
        style={{ marginLeft: "10px" }}
      >
        Delete
      </button>
    </div>
  );
}

export default NoteItem;
