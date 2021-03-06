import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ArrowRightSquareFill } from "react-bootstrap-icons";
import CreateCategoryModal from "./create-category/CreateCategoryModal";
import NotesSearch from "./components/NotesSearch";
import NoteList from "./add-note/NoteList";

function App() {
  return (
    <Container>
      <Row>
        <Col className={"my-4"}>
          <h1>Notes - create your things</h1>
        </Col>
      </Row>

      <Row>
        <Col className="text-center">
          Start by creating your things{" "}
          <ArrowRightSquareFill className="mx-2" />
          <CreateCategoryModal />
        </Col>
      </Row>

      <Row>
        <Col>
          <NotesSearch />
        </Col>
      </Row>

      <Row>
        <Col>
          <NoteList />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
