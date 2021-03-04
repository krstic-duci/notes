import React from "react";
import Button from "react-bootstrap/Button";
import { randomIntFromInterval } from "../utils/helpers";

interface NotesTagsListProps {
  categoryName: string;
}

function NotesTagsList({ categoryName }: NotesTagsListProps) {
  return (
    <>
      <Button style={{ padding: `5px ${randomIntFromInterval(20, 45)}px` }}>
        {categoryName}
      </Button>
    </>
  );
}

export default NotesTagsList;
