import { Col, Container, Row } from "react-bootstrap";
import PhotosContainer from "../features/photos/PhotosContainer";
import FallBackPage from "../components/FallBackPage";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import PlaceholderPhotoCards from "../features/photos/components/PlaceholderPhotoCards";

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
          <ErrorBoundary FallbackComponent={FallBackPage}>
            <Suspense fallback={<PlaceholderPhotoCards />}>
              <PhotosContainer />
            </Suspense>
          </ErrorBoundary>
        </Col>
      </Row>
    </Container>
  );
};

export default HomeScreen;
