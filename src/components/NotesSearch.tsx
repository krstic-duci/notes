import React, { useState } from "react";
import { useDispatch } from "react-redux";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import { Search, XSquare } from "react-bootstrap-icons";
import { filterThroughCategories } from "../features/create-note/notesSlice";

function NotesSearch() {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");

  const addSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    dispatch(filterThroughCategories(e.target.value));
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
          placeholder="Enter search term..."
          aria-label="Username"
          aria-describedby="basic-addon1"
          value={searchQuery}
          onChange={addSearchQuery}
        />
        <InputGroup.Append id="basic-addon2" onClick={defaultSearchVal}>
          <InputGroup.Text>
            <XSquare />
          </InputGroup.Text>
        </InputGroup.Append>
        {/* TODO: button should be disabled if length of a search field is 0 */}
        <Button
          className="ml-2"
          disabled={searchQuery.length === 0}
          variant={searchQuery.length === 0 ? "secondary" : "primary"}
        >
          Search
        </Button>
      </InputGroup>
    </>
  );
}

export default NotesSearch;
