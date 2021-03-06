import React from "react";

interface NoteSearchFormProps {
  searchInputVal: string;
  setSearchInputVal: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function NoteSearchForm({
  searchInputVal,
  setSearchInputVal,
}: NoteSearchFormProps) {
  // TODO: add bootstrap
  return (
    <div>
      <span className="mr-2">Search by :</span>
      <input type="text" onChange={setSearchInputVal} value={searchInputVal} />
    </div>
  );
}

export default NoteSearchForm;
