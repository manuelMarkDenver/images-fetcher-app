import { lazy } from "react";
import { Col, Row } from "react-bootstrap";
import PhotosContainer from "../features/photos/PhotosContainer";

const Hero = lazy(() => import("../components/Hero"));

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
