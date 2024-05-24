import { Col, Row } from "react-bootstrap";
import Hero from "../components/Hero";
import PhotosContainer from "../features/photos/PhotosContainer";

const HomeScreen = () => {
  return (
    <>
      <Hero />

      <Row>
        <Col>
          <PhotosContainer />
        </Col>
      </Row>
    </>
  );
};

export default HomeScreen;
