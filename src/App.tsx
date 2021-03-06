import React from "react";
import { useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ArrowRightSquareFill } from "react-bootstrap-icons";

import CreateCategoryModal from "./create-category/CreateCategoryModal";
import NotesSearch from "./components/NotesSearch";
import NotesCategories from "./add-note/NotesCategories";
import NoteCategoryFiltered from "./filter-category/NoteCategoryFiltered";
import { selectFilteredCategories } from "./features/create-note/notesSlice";

function App() {
  const filteredCategories = useSelector(selectFilteredCategories);
  return (
    <Container>
      <Row>
        <Col className={"my-4"}>
          <h1>Notey - create your things</h1>
        </Col>
      </Row>

      <Row>
        <Col className="text-center">
          Start by
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
          {filteredCategories.length > 0 ? (
            <NoteCategoryFiltered />
          ) : (
            <NotesCategories />
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
