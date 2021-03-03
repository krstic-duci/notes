import React, { useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import { Search } from "react-bootstrap-icons";

function NotesSearch() {
  const [searchQuery, setSearchQuery] = useState("");

  const addSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    // TODO: add redux action for a search query, then loop through the entire array of notes
    // and display the search results
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
