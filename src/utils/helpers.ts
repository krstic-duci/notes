// Faking the ids for notes
function makeId() {
  let _id = 0;
  return function innerMakeId() {
    return _id++;
  };
}
export let uniqueId = makeId();
