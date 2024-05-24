import { Card } from "react-bootstrap";
import { Photo } from "../../types/Photo";
type PhotoProps = {
  photo: Photo;
};

const PhotoComponent = ({ photo }: PhotoProps) => {
  return (
    <Card className="rounded-lg">
      <Card.Img variant="top" src={photo.url} loading="lazy" />
      <Card.Body>
        <Card.Title>{photo.title}</Card.Title>
      </Card.Body>
    </Card>
  );
};

export default PhotoComponent;
