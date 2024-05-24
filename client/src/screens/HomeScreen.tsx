import { Col, Container, Row } from "react-bootstrap";
import PhotosContainer from "../features/photos/PhotosContainer";

const HomeScreen = () => {
  return (
    <Container>
      <Row>
        <Col>
          <h1 className="text-slate-500 text-center my-5 text-3xl font-bold">
            Dashboard
          </h1>
        </Col>
      </Row>

      <Row>
        <Col>
          <PhotosContainer />
        </Col>
      </Row>
    </Container>
  );
};

export default HomeScreen;
