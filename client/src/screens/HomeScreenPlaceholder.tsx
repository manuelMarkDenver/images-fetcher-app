import { Col, Container, Placeholder, Row } from "react-bootstrap";
import PlaceholderPhotoCards from "../features/photos/components/PlaceholderPhotoCards";

const HomeScreenPlaceholder = () => {
  return (
    <Container>
      <Row>
        <Col className="flex justify-center items-center">
          <Placeholder
            className="text-slate-500 text-center my-5 text-3xl font-bold"
            xs={6}
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Placeholder
            className="text-slate-500 text-center text-3xl font-bold"
            xs={12}
          />
        </Col>
      </Row>

      <Row>
        <Col>
          <PlaceholderPhotoCards />
        </Col>
      </Row>
    </Container>
  );
};

export default HomeScreenPlaceholder;
