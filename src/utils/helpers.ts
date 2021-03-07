import { Note } from "./types";

/**
 * @description Find first element in array with given ID
 * @param elemId string
 * @param array array
 */
export function findElemById(elemId: string, array: Note[]) {
  return array.find((el) => el.id === elemId);
}
