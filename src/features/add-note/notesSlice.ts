import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface Notes {
  notes: Note[];
}

interface Note {
  id: string;
  text: string;
  isChecked: boolean;
}

const initialState = {
  // FIXME: check type
  notes: [] as any,
};

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    // FIXME: check type
    addNewCategory: (state, action: PayloadAction<any>) => {
      console.log(action);
      state.notes.push(action.payload);
    },
  },
});

// Actions
export const { addNewCategory } = notesSlice.actions;

// Selectors
export const selectNotes = (state: RootState) => state.notes;

export default notesSlice.reducer;
