import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { uniqueId } from "../../utils/helpers";

// Types
import {
  Notes,
  NotePayload,
  deleteNotePayload,
  editNotePayload,
} from "../../utils/types";

const initialState = {
  categories: {} as Notes,
};

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNewCategory: (state, { payload }: PayloadAction<string>) => {
      state.categories[payload] = [];
    },
    addCategoryNote: {
      reducer: (
        state,
        { payload: { categoryName, noteTextVal } }: PayloadAction<NotePayload>
      ) => {
        state.categories[categoryName].push({
          id: uniqueId(),
          text: noteTextVal,
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
      reducer: (
        state,
        { payload: { categoryName, itemId } }: PayloadAction<deleteNotePayload>
      ) => {
        state.categories[categoryName] = state.categories[categoryName].filter(
          (elem) => elem.id !== itemId
        );
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
      reducer: (
        state,
        {
          payload: { categoryName, itemId, editedVal },
        }: PayloadAction<editNotePayload>
      ) => {
        // FIXME: make util function
        const editElem = state.categories[categoryName].find(
          (elem) => elem.id === itemId
        );
        if (editElem) {
          editElem.text = editedVal;
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
    // FIXME: change type PayloadAction
    updateCheckedNote: {
      reducer: (
        state,
        { payload: { categoryName, itemId } }: PayloadAction<deleteNotePayload>
      ) => {
        // FIXME: make util function
        const elem = state.categories[categoryName].find(
          (elem) => elem.id === itemId
        );
        if (elem) {
          elem.isChecked = !elem.isChecked;
        }
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
  },
});

// Actions
export const {
  addNewCategory,
  addCategoryNote,
  deleteCategoryNote,
  editCategoryNote,
  updateCheckedNote,
} = notesSlice.actions;

// Selectors
export const selectNotes = (state: RootState) => state.categories;

export default notesSlice.reducer;
