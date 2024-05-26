import { Card, Col, Placeholder, Row } from "react-bootstrap";
import placeholderImage from "../../../assets/images/placeholder.svg";

const PlaceholderPhotoCards = () => {
  // Array of placeholder data or empty array if loading
  const placeholderData = Array.from({ length: 6 }).map((_, index) => ({
    id: index + 1,
    title: `Placeholder ${index + 1}`,
    url: "http://holderjs.com/100px180",
  }));

  return (
    <Row xs={1} md={3} className="g-4">
      {placeholderData.map((photo) => (
        <Col key={photo.id}>
          <Card className="rounded-lg">
            <Card.Img as={Card.Img} variant="top" src={placeholderImage} />
            <Card.Body>
              <Placeholder as={Card.Title} animation="glow">
                <Placeholder xs={12} />
              </Placeholder>
              <Placeholder as={Card.Text} animation="glow">
                <Placeholder xs={7} /> <Placeholder xs={4} />{" "}
                <Placeholder xs={4} /> <Placeholder xs={6} />{" "}
                <Placeholder xs={8} />
              </Placeholder>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default PlaceholderPhotoCards;
