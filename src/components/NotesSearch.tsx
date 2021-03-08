import React, { useState } from "react";
import { useDispatch } from "react-redux";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import { Search, XSquare } from "react-bootstrap-icons";

// Redux slice
import { filterThroughCategories } from "../features/create-note/notesSlice";

function NotesSearch() {
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState("");

  const addSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetVal = e.target.value;

    setSearchQuery(targetVal);
    dispatch(filterThroughCategories(targetVal));
  };

  const defaultSearchVal = () => {
    setSearchQuery("");
    dispatch(filterThroughCategories(""));
  };

  return (
    <>
      <InputGroup className="my-5">
        <InputGroup.Prepend>
          <InputGroup.Text id="basic-addon1">
            <Search />
          </InputGroup.Text>
        </InputGroup.Prepend>

        <FormControl
          placeholder="Search all categories and notes..."
          aria-describedby="basic-addon1"
          value={searchQuery}
          onChange={addSearchQuery}
        />

        <InputGroup.Append id="basic-addon2" onClick={defaultSearchVal}>
          <Button
            disabled={searchQuery.length === 0}
            variant={searchQuery.length === 0 ? "secondary" : "primary"}
          >
            <XSquare />
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </>
  );
}

export default NotesSearch;
