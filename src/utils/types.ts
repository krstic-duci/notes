export interface StateStore {
  categories: Notes;
  error: string | null;
  filteredCategories: Note[];
}

export interface Notes {
  [notes: string]: Note[];
}

export interface Note {
  id: string;
  text: string;
  isChecked: boolean;
}

export interface CategoryName {
  categoryName: string;
}

export interface NotePayload extends CategoryName {
  noteTextVal: string;
}

export interface categoryAndCheckNotePayload extends CategoryName {
  itemId: string;
}

export interface editNotePayload extends CategoryName {
  itemId: string;
  editedVal: string;
}

export interface moveNoteFromToPayload {
  note: Note;
  moveFrom: string;
  moveTo: string;
}
