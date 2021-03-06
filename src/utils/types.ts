export interface Notes {
  [notes: string]: Note[];
}

export interface Note {
  id: number;
  text: string;
  isChecked: boolean;
}

export interface NotePayload {
  categoryName: string;
  noteTextVal: string;
}

export interface categoryAndCheckNotePayload {
  categoryName: string;
  itemId: number;
}

export interface editNotePayload {
  categoryName: string;
  itemId: number;
  editedVal: string;
}

export interface moveNoteFromToPayload {
  note: Note;
  moveFrom: string;
  moveTo: string;
}
