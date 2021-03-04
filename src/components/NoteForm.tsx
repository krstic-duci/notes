import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCategoryNote } from "../features/create-note/notesSlice";

interface NoteFormProps {
  categoryName: string;
}

function NoteForm({ categoryName }: NoteFormProps) {
  const dispatch = useDispatch();
  const [inputVal, setInputVal] = useState("");

  const addCategoryNewNote = (categoryName: string) => () => {
    dispatch(addCategoryNote(categoryName, inputVal));
    setInputVal("");
  };

  const inputValHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value);
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Add things to do..."
        value={inputVal}
        onChange={inputValHandler}
      />
      <button onClick={addCategoryNewNote(categoryName)}>+ Add</button>
    </div>
  );
}

export default NoteForm;
