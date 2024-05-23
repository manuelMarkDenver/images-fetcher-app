import "./App.css";
import { Col, Container, Row } from "react-bootstrap";
import PhotosContainer from "./features/Images/PhotosContainer";

function App() {
  return (
    <>
      <Container>
        <Row>
          <Col>
            <h1 className="text-slate-500 text-center my-2">
              Images Fetcher App
            </h1>
          </Col>
        </Row>

        <Row>
          <Col>
            <PhotosContainer />
          </Col>
        </Row>
      </Container>
      ;
    </>
  );
}

export default App;
