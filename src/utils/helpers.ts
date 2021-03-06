import { Note } from "./types";

export function findElemById(elemId: string, array: Note[]) {
  return array.find((el) => el.id === elemId);
}
