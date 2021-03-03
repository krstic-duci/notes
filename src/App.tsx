import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NotesCreateModal from "./components/NotesCreateModal";
import NotesSearch from "./components/NotesSearch";
import { ArrowRightSquareFill } from "react-bootstrap-icons";
import NotesCategory from "./components/NotesCategory";

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
          <NotesCreateModal />
        </Col>
      </Row>

      <Row>
        <Col>
          <NotesSearch />
        </Col>
      </Row>

      <Row>
        <Col>
          Here I should add Notes categories with todo or search results
        </Col>
      </Row>
    </Container>
  );
}

export default App;
