import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { Photo } from "../../types/Photo";

type PhotoProps = {
  photo: Photo;
};

const PhotoComponent = ({ photo }: PhotoProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const image = new Image();
    image.src = photo.url;
    image.onload = () => {
      setImageLoaded(true);
    };

    return () => {
      image.onload = null;
    };
  }, [photo.url]);

  return (
    <Card className="rounded-lg" role="photo" data-testid={`photo-${photo.id}`}>
      <div
        className={`relative w-full ${
          imageLoaded ? "hidden" : "block"
        } bg-gray-200`}
        style={{ paddingBottom: "56.25%" }}
      >
        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          Loading image...
        </span>{" "}
      </div>
      <Card.Img
        variant="top"
        src={photo.url}
        alt={photo.title}
        loading="lazy"
        style={{ display: imageLoaded ? "block" : "none" }}
      />
      <Card.Body>
        <Card.Title>{photo.title}</Card.Title>
      </Card.Body>
    </Card>
  );
};

export default PhotoComponent;
