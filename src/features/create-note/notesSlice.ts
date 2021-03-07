import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { v4 as uuidv4 } from "uuid";

// Utils/Types
import { findElemById } from "../../utils/helpers";
import {
  StateStore,
  NotePayload,
  categoryAndCheckNotePayload,
  editNotePayload,
  Note,
  moveNoteFromToPayload,
} from "../../utils/types";

const initialState: StateStore = {
  categories: {},
  filteredCategories: [],
};

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNewCategory: (state, { payload }: PayloadAction<string>) => {
      // Disclaimer:
      // In here I just stopped the addition of a new Category with the same key name.
      // Better solution would be to have an error so user can be notified, but I felt
      // that any user action should have the same behaviour which unfortunately I didn't
      // have time to implement
      if (state.categories.hasOwnProperty(payload)) {
        return;
      }
      state.categories[payload] = [];
    },
    deleteCategory: (state, { payload }: PayloadAction<string>) => {
      // Disclaimer:
      // Better solution would be to show a modal to the user confirming his action, but
      // for a sake of a demo I didn't implemented it
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
          id: uuidv4(),
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
      prepare: (categoryName: string, itemId: string) => {
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
      prepare: (categoryName: string, itemId: string, editedVal: string) => {
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
        const elemToUpdateCheckbox = findElemById(
          itemId,
          state.categories[categoryName]
        );
        if (elemToUpdateCheckbox) {
          elemToUpdateCheckbox.isChecked = !elemToUpdateCheckbox.isChecked;
        }
      },
      prepare: (categoryName: string, itemId: string) => {
        return {
          payload: {
            categoryName,
            itemId,
          },
        };
      },
    },
    moveNoteFromTo: {
      reducer: (
        state,
        {
          payload: { note, moveFrom, moveTo },
        }: PayloadAction<moveNoteFromToPayload>
      ) => {
        const elemMoveFromIdx = state.categories[moveFrom]
          .map((elem) => elem.id === note.id)
          .indexOf(true);

        state.categories[moveTo].push(note);
        state.categories[moveFrom].splice(elemMoveFromIdx, 1);
      },
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
    filterThroughCategories: (state, { payload }: PayloadAction<string>) => {
      if (!payload) {
        state.filteredCategories = [];
        return;
      }
      let newFilterCategories: Note[] = [];

      Object.values(state.categories).forEach((categoryArray) => {
        const filteredCategoryArray = categoryArray.filter((note) =>
          note.text.includes(payload)
        );
        newFilterCategories = [
          ...newFilterCategories,
          ...filteredCategoryArray,
        ];
      });

      state.filteredCategories = newFilterCategories;
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
  filterThroughCategories,
} = notesSlice.actions;

// Selectors
export const selectNotes = (state: RootState) => state.categories;
export const selectFilteredCategories = (state: RootState) =>
  state.filteredCategories;

export default notesSlice.reducer;
