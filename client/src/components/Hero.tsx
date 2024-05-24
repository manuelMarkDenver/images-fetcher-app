import { Col, Container, Row } from "react-bootstrap";

const Hero = () => {
  return (
    <Container>
      <Row>
        <Col>
          <h1 className="text-slate-500 text-center my-5 text-3xl font-bold">
            Dashboard
          </h1>
        </Col>
      </Row>
    </Container>
  );
};

export default Hero;
