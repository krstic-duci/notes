// Faking the ids for notes
function makeId() {
  let _id = 0;
  return function innerMakeId() {
    return _id++;
  };
}
export let uniqueId = makeId();

export function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// export function findElemById (elemId: number, object: []) {
//   return object.find(el => el.id === elemId)
// }
