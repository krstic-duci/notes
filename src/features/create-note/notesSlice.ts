import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { uniqueId, findElemById } from "../../utils/helpers";
import {
  Notes,
  NotePayload,
  categoryAndCheckNotePayload,
  editNotePayload,
  Note,
  moveNoteFromToPayload,
} from "../../utils/types";

const initialState = {
  categories: {} as Notes,
};

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNewCategory: (state, { payload }: PayloadAction<string>) => {
      // TODO: make object categories keys unique and print error msg
      if (state.categories.hasOwnProperty(payload)) {
        return;
      }
      state.categories[payload] = [];
    },
    deleteCategory: (state, { payload }: PayloadAction<string>) => {
      if (state.categories.hasOwnProperty(payload)) {
        delete state.categories[payload];
      }
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
        {
          payload: { categoryName, itemId },
        }: PayloadAction<categoryAndCheckNotePayload>
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
        const editedElem = findElemById(itemId, state.categories[categoryName]);
        if (editedElem) {
          editedElem.text = editedVal;
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
    updateCheckedNote: {
      reducer: (
        state,
        {
          payload: { categoryName, itemId },
        }: PayloadAction<categoryAndCheckNotePayload>
      ) => {
        const elem = findElemById(itemId, state.categories[categoryName]);
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
    moveNoteFromTo: {
      reducer: (state, action: PayloadAction<moveNoteFromToPayload>) => {},
      prepare: (note: Note, moveFrom: string, moveTo: string) => {
        return {
          payload: {
            note,
            moveFrom,
            moveTo,
          },
        };
      },
    },
  },
});

// Actions
export const {
  addNewCategory,
  deleteCategory,
  addCategoryNote,
  deleteCategoryNote,
  editCategoryNote,
  updateCheckedNote,
  moveNoteFromTo,
} = notesSlice.actions;

// Selectors
export const selectNotes = (state: RootState) => state.categories;

export default notesSlice.reducer;
