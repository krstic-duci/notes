import { Note } from "./types";

// Faking the ids for notes
function makeId() {
  let _id = 0;
  return function innerMakeId() {
    return _id++;
  };
}
export let uniqueId = makeId();

export function findElemById(elemId: number, array: Note[]) {
  return array.find((el) => el.id === elemId);
}
