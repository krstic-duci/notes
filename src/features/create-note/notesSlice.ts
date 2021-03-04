import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { uniqueId } from "../../utils/helpers";

interface Notes {
  [notes: string]: Note[];
}

interface NotePayload {
  categoryName: string;
  noteTextVal: string;
}

interface deleteNotePayload {
  categoryName: string;
  itemId: number;
}

interface editNotePayload {
  categoryName: string;
  itemId: number;
  editedVal: string;
}

export interface Note {
  id: number;
  text: string;
  isChecked: boolean;
}

const initialState = {
  categories: {} as Notes,
};

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNewCategory: (state, action: PayloadAction<string>) => {
      state.categories[action.payload] = [];
    },
    addCategoryNote: {
      reducer: (state, action: PayloadAction<NotePayload>) => {
        state.categories[action.payload.categoryName].push({
          id: uniqueId(),
          text: action.payload.noteTextVal,
          isChecked: false,
        });
      },
      prepare: (categoryName: string, noteTextVal: string) => {
        return {
          payload: {
            categoryName,
            noteTextVal,
          },
        };
      },
    },
    deleteCategoryNote: {
      reducer: (state, action: PayloadAction<deleteNotePayload>) => {
        console.log(action.payload);

        state.categories[action.payload.categoryName] = state.categories[
          action.payload.categoryName
        ].filter((elem) => elem.id !== action.payload.itemId);
      },
      prepare: (categoryName: string, itemId: number) => {
        return {
          payload: {
            categoryName,
            itemId,
          },
        };
      },
    },
    editCategoryNote: {
      reducer: (state, action: PayloadAction<editNotePayload>) => {
        const editElem = state.categories[action.payload.categoryName].find(
          (elem) => elem.id === action.payload.itemId
        );
        if (editElem) {
          editElem.text = action.payload.editedVal;
        }
      },
      prepare: (categoryName: string, itemId: number, editedVal: string) => {
        return {
          payload: {
            categoryName,
            itemId,
            editedVal,
          },
        };
      },
    },
  },
});

// Actions
export const {
  addNewCategory,
  addCategoryNote,
  deleteCategoryNote,
  editCategoryNote,
} = notesSlice.actions;

// Selectors
export const selectNotes = (state: RootState) => state.categories;

export default notesSlice.reducer;
